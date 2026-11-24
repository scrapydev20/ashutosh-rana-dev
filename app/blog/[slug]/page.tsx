import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
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
    },
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <article>
      <header className="mb-10">
        {post.series && <p className="text-sm font-medium text-sky-300/80">{post.series}</p>}
        <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-slate-50 sm:text-4xl">
          {post.title}
        </h1>
        <time dateTime={post.date} className="mt-3 block text-sm text-slate-500">
          {formatDateTime(post.date)}
        </time>
      </header>
      <div
        className="prose prose-garden prose-lg"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  )
}
