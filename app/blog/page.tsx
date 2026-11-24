import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog',
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <div>
      <h1 className="mb-10 text-3xl font-bold tracking-tight text-slate-50">Blog</h1>

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
                <h2 className="mt-1 text-xl font-semibold text-slate-100">
                  <Link href={`/blog/${post.slug}`} className="hover:text-sky-300">
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt && (
                  <p className="mt-2 leading-relaxed text-slate-400">{post.excerpt}</p>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
