import { projects } from './data/projects'
import ProjectCard from './components/ProjectCard'
import ToyCard from './components/ToyCard'
import styles from './App.module.css'

export default function App() {
  const tools = projects.filter(p => p.category === 'tool')
  const toys = projects.filter(p => p.category === 'toy')

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.name}>Ernie Dippold</h1>
        <p className={styles.tagline}>Check out what I've made.</p>
      </header>

      <main className={styles.main}>
        {tools.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Tools</h2>
            <div className={styles.grid}>
              {tools.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {toys.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Toys</h2>
            <div className={styles.grid}>
              {toys.map(project =>
                project.gifSrc ? (
                  <ToyCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    gifSrc={project.gifSrc}
                    thumbnail={project.thumbnail}
                  />
                ) : (
                  <ProjectCard key={project.id} project={project} />
                )
              )}
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <p className={styles.aboutText}>
            I'm Ernie. this is where I put things I've made. Some are shiny and polished, some are broken and half-baked. Please poke around.
          </p>
          <p className={styles.aboutText}>Find me at:</p>
          <ul className={styles.aboutList}>
            <li>Github <a href="https://github.com/erndip" target="_blank" rel="noopener noreferrer">@erndip</a></li>
            <li>LinkedIn <a href="https://linkedin.com/in/erniedippold" target="_blank" rel="noopener noreferrer">@erniedippold</a></li>
            <li>email: <a href="mailto:ernie.dippold@gmail.com">ernie.dippold@gmail.com</a></li>
          </ul>
        </section>


      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/erndip" target="_blank" rel="noopener noreferrer">
          github.com/erndip
        </a>
      </footer>
    </div>
  )
}
