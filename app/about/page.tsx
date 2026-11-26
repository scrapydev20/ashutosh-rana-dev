import type { Metadata } from 'next'
import ExternalLink from '@/components/ExternalLink'
import { profile } from '@/data/siteData'
import { projects } from '@/data/projects'

export const metadata: Metadata = { title: 'About' }

export default function About() {
  return (
    <>
      <h1 className="pb-6 pt-6 text-3xl font-bold tracking-tight">About</h1>

      <section className="space-y-4 border-t border-trail pt-8 text-lg leading-relaxed">
        {profile.intro.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </section>

      <section aria-labelledby="projects" className="mt-12 border-t border-trail pt-8">
        <h2 id="projects" className="mb-6 text-xl font-semibold">
          Projects
        </h2>
        <ul className="space-y-8">
          {projects.map((project) => (
            <li key={project.id}>
              <h3 className="font-semibold">
                {project.href ? (
                  <ExternalLink href={project.href} className="text-link underline-offset-4 hover:underline">
                    {project.name}
                  </ExternalLink>
                ) : (
                  project.name
                )}
                {project.status && (
                  <span className="ml-2 text-sm font-normal text-muted">{project.status}</span>
                )}
              </h3>
              <p className="mt-1 leading-relaxed text-muted">{project.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
