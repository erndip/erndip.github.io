import { useEffect, useState } from 'react'
import styles from './LatestRambling.module.css'

type Post = { title: string; url: string; date: string; html: string }

export const RAMBLINGS_URL = 'https://erndip.github.io/ramblings/'
const FEED = `${RAMBLINGS_URL}feed.xml`

const text = (el: Element | null) => el?.textContent?.trim() ?? ''
const parseHtml = (html: string) => new DOMParser().parseFromString(html, 'text/html')

// Post HTML may use relative links/images; resolve them against the post's own URL.
function resolveContent(html: string, base: string) {
  const doc = parseHtml(html)
  doc.querySelectorAll('img[src]').forEach(img => img.setAttribute('src', new URL(img.getAttribute('src')!, base).href))
  doc.querySelectorAll('a[href]').forEach(a => a.setAttribute('href', new URL(a.getAttribute('href')!, base).href))
  return doc.body.innerHTML
}

export default function LatestRambling() {
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    fetch(FEED)
      .then(r => r.text())
      .then(xml => {
        const entry = new DOMParser().parseFromString(xml, 'application/xml').querySelector('entry')
        if (!entry) return
        const url = entry.querySelector('link')?.getAttribute('href') ?? RAMBLINGS_URL
        const content = entry.querySelector('content')
        setPost({
          title: parseHtml(text(entry.querySelector('title'))).body.textContent ?? '',
          url,
          date: new Date(text(entry.querySelector('published'))).toLocaleDateString(undefined, { dateStyle: 'long', timeZone: 'UTC' }),
          html: resolveContent(text(content), content?.getAttribute('xml:base') ?? url),
        })
      })
      .catch(() => {})
  }, [])

  return (
    <div className={styles.card}>
      {post && (
        <div className={styles.preview}>
          <a href={post.url} className={styles.title}>{post.title}</a>
          <time className={styles.date}>{post.date}</time>
          <div className={styles.body} dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      )}
      <a href={RAMBLINGS_URL} className={styles.readMore}>Read more →</a>
    </div>
  )
}
