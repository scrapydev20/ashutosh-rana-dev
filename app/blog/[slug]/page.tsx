import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TopicLinks from '@/components/TopicLinks'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { formatDateTime } from '@/lib/utils'

// Don't add `export const dynamicParams = false` here: in Next 14.2 the dev
// server rejects it under `output: 'export'` with a misleading "missing
// generateStaticParams()" error. Static export only emits the slugs below
// anyway, and unknown slugs hit notFound() in dev.
export function generateStaticParams() {
  const params = getAllPosts().map((post) => ({ slug: post.slug }))
  // Next 14's static export fails on an empty list, so while content/posts is
  // empty we emit one placeholder that resolves to the 404 page.
  return params.length > 0 ? params : [{ slug: '_empty' }]
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.topics,
    },
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <article>
      <header className="border-b border-trail pb-6 pt-6">
        {post.series && (
          <p className="text-sm font-medium uppercase tracking-wide text-accent">{post.series}</p>
        )}
        <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <time dateTime={post.date} className="mt-3 block text-sm text-muted">
          {formatDateTime(post.date)}
        </time>
        {post.topics.length > 0 && (
          <nav aria-label="Topics for this post" className="mt-3 text-sm">
            <TopicLinks topics={post.topics} className="gap-x-4" />
          </nav>
        )}
      </header>

      <div
        className="prose prose-site prose-lg pt-8"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  )
}
