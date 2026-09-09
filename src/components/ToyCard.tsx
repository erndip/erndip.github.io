import { useCallback, useEffect, useRef, useState } from 'react'
import { decompressFrames, parseGIF } from 'gifuct-js'
import styles from './ToyCard.module.css'

// gifuct-js doesn't narrow the patch field when buildImagePatch=true
interface GifFrame {
  dims: { width: number; height: number; top: number; left: number }
  delay: number
  disposalType: number
  patch: Uint8ClampedArray
}

type Phase = 'idle' | 'flipping-to-back' | 'playing' | 'frozen' | 'flipping-to-front'

interface Props {
  title: string
  description: string
  gifSrc: string
  thumbnail?: string
}

const FLIP_MS = 600
const FREEZE_MS = 700

export default function ToyCard({ title, description, gifSrc, thumbnail }: Props) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [gifLoaded, setGifLoaded] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const offscreenRef = useRef<HTMLCanvasElement | null>(null)
  const tmpCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const framesRef = useRef<GifFrame[]>([])
  const gifDimsRef = useRef({ width: 0, height: 0 })

  // Preload and parse GIF once on mount
  useEffect(() => {
    fetch(gifSrc)
      .then(r => r.arrayBuffer())
      .then(buf => {
        const gif = parseGIF(buf)
        const frames = decompressFrames(gif, true)
        framesRef.current = frames as unknown as GifFrame[]
        gifDimsRef.current = { width: gif.lsd.width, height: gif.lsd.height }

        const offscreen = document.createElement('canvas')
        offscreen.width = gif.lsd.width
        offscreen.height = gif.lsd.height
        offscreenRef.current = offscreen

        const tmp = document.createElement('canvas')
        tmp.width = gif.lsd.width
        tmp.height = gif.lsd.height
        tmpCanvasRef.current = tmp

        setGifLoaded(true)
      })
  }, [gifSrc])

  // Draw a single frame index onto the visible canvas
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    const offscreen = offscreenRef.current
    const frames = framesRef.current
    if (!canvas || !offscreen || !frames[index]) return

    const { width, height } = gifDimsRef.current
    if (canvas.width !== width) canvas.width = width
    if (canvas.height !== height) canvas.height = height

    const ctx = canvas.getContext('2d')!
    const offCtx = offscreen.getContext('2d')!

    // Handle previous frame disposal before drawing
    if (index > 0 && frames[index - 1].disposalType === 2) {
      offCtx.clearRect(0, 0, width, height)
    }

    const frame = frames[index]
    // Composite via a pre-allocated temp canvas so source-over preserves content under
    // transparent patch pixels (putImageData directly would erase previous-frame content).
    const tmp = tmpCanvasRef.current!
    const tmpCtx = tmp.getContext('2d')!
    tmpCtx.clearRect(0, 0, tmp.width, tmp.height)
    tmpCtx.putImageData(
      new ImageData(new Uint8ClampedArray(frame.patch), frame.dims.width, frame.dims.height),
      frame.dims.left,
      frame.dims.top,
    )
    offCtx.drawImage(tmp, 0, 0)

    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(offscreen, 0, 0)
  }, [])

  useEffect(() => {
    if (phase === 'flipping-to-back') {
      // Show first frame immediately so it's visible as the card finishes flipping
      renderFrame(0)
      const t = setTimeout(() => setPhase('playing'), FLIP_MS)
      return () => clearTimeout(t)
    }

    if (phase === 'playing') {
      const frames = framesRef.current
      let frameIndex = 0
      let timeoutId: ReturnType<typeof setTimeout>
      let cancelled = false

      function advance() {
        if (cancelled) return
        renderFrame(frameIndex)
        const delay = frames[frameIndex].delay || 20  // gifuct-js delay is already in ms; floor bare 0 frames
        frameIndex++

        if (frameIndex >= frames.length) {
          setPhase('frozen')
          return
        }
        timeoutId = setTimeout(advance, delay)
      }

      advance()
      return () => {
        cancelled = true
        clearTimeout(timeoutId)
      }
    }

    if (phase === 'frozen') {
      const t = setTimeout(() => setPhase('flipping-to-front'), FREEZE_MS)
      return () => clearTimeout(t)
    }

    if (phase === 'flipping-to-front') {
      const t = setTimeout(() => {
        // Clear offscreen so next play starts clean
        offscreenRef.current
          ?.getContext('2d')
          ?.clearRect(0, 0, offscreenRef.current.width, offscreenRef.current.height)
        setPhase('idle')
      }, FLIP_MS)
      return () => clearTimeout(t)
    }
  }, [phase, renderFrame])

  const handleMouseDown = useCallback(() => {
    if (phase !== 'idle' || !gifLoaded) return
    setPhase('flipping-to-back')
  }, [phase, gifLoaded])

  const flipped = phase === 'flipping-to-back' || phase === 'playing' || phase === 'frozen'
  const interactive = phase === 'idle'

  return (
    <div
      className={`${styles.wrapper} ${interactive ? styles.interactive : ''}`}
      onMouseDown={handleMouseDown}
    >
      <div className={`${styles.inner} ${flipped ? styles.flipped : ''}`}>

        <div className={styles.front}>
          <div className={styles.thumbnailWrapper}>
            {thumbnail ? (
              <img src={thumbnail} alt={title} className={styles.thumbnail} />
            ) : (
              <div className={styles.placeholder} />
            )}
            <div className={styles.overlay}>
              <p className={styles.description}>{description}</p>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <span className={styles.title}>{title}</span>
          </div>
        </div>

        <div className={styles.back}>
          <canvas ref={canvasRef} className={styles.gifCanvas} />
        </div>

      </div>
    </div>
  )
}
