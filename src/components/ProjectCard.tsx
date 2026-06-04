import type { Project } from '../data/projects'
import styles from './ProjectCard.module.css'

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  return (
    <a
      href={project.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={project.title}
    >
      <div className={styles.thumbnailWrapper}>
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className={styles.thumbnail}
          />
        ) : (
          <div className={styles.placeholder} />
        )}
        <div className={styles.overlay}>
          <p className={styles.description}>{project.description}</p>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <span className={styles.title}>{project.title}</span>
      </div>
    </a>
  )
}
