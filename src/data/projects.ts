export interface Project {
  id: string
  title: string
  description: string
  thumbnail?: string
  repoUrl: string
  category: 'tool' | 'toy'
}

export const projects: Project[] = [
  {
    id: 'example-tool',
    title: 'Example Tool',
    description: 'Replace this with your real tool. Swap in a thumbnail from /images and point repoUrl at the right repo.',
    repoUrl: 'https://github.com/erndip',
    category: 'tool',
  },
  {
    id: 'example-toy',
    title: 'Example Toy',
    description: 'Replace this with your real toy. Each card is just one object in this array.',
    repoUrl: 'https://github.com/erndip',
    category: 'toy',
  },
]
