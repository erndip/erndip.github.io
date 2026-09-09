export interface Project {
  id: string
  title: string
  description: string
  thumbnail?: string
  repoUrl?: string
  liveUrl?: string
  gifSrc?: string
  category: 'tool' | 'toy'
}

export const projects: Project[] = [
  {
    id: 'sunwise-tracker',
    title: 'Sunwise Tracker',
    description: 'UV index tracker with location search and Fitzpatrick skin-type–aware sun exposure guidance.',
    thumbnail: '/images/sunwise_tracker_thumbnail.png',
    repoUrl: 'https://github.com/erndip/sunwise-tracker',
    liveUrl: 'https://erndip.github.io/sunwise-tracker',
    category: 'tool',
  },
  {
    id: 'battery-monitor',
    title: 'Battery Monitor',
    description: 'A simple battery monitor for tracking charge rate and capacity levels. Windows only.',
    thumbnail: '/images/battery_monitor_thumbnail.png',
    repoUrl: 'https://github.com/erndip/battery-monitor',
    category: 'tool',
  },
  {
    id: 'sneaky-cat',
    title: 'Sample Toy',
    description: 'Cat GIF',
    thumbnail: '/images/sample_toy_thumbnail.jpg',
    gifSrc: '/images/sneakycat.gif',
    category: 'toy',
  },
]
