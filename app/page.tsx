import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { profile } from '@/data/siteData'
import { projects } from '@/data/projects'
import { formatDate } from '@/lib/utils'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="space-y-20">
      <section className="space-y-4 text-lg leading-relaxed text-slate-300">
        {profile.intro.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </section>

      <section>
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wide text-slate-500">
          Writing
        </h2>

        {posts.length === 0 ? (
          <p className="text-slate-500">Nothing here yet. The first notes are on their way.</p>
        ) : (
          <ul className="space-y-10">
            {posts.map((post) => (
              <li key={post.slug}>
                <article>
                  <time dateTime={post.date} className="text-sm text-slate-500">
                    {formatDate(post.date)}
                  </time>
                  <h3 className="mt-1 text-xl font-semibold text-slate-100">
                    <Link href={`/blog/${post.slug}`} className="hover:text-sky-300">
                      {post.title}
                    </Link>
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 leading-relaxed text-slate-400">{post.excerpt}</p>
                  )}
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wide text-slate-500">
          Projects
        </h2>
        <ul className="space-y-8">
          {projects.map((project) => (
            <li key={project.id}>
              <h3 className="font-semibold text-slate-100">
                {project.href ? (
                  <a href={project.href} className="hover:text-sky-300">
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
                {project.status && (
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    {project.status}
                  </span>
                )}
              </h3>
              <p className="mt-1 leading-relaxed text-slate-400">{project.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
