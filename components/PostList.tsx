import Link from 'next/link'
import type { Post } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

export default function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="text-muted">No posts here yet.</p>
  }

  return (
    <ul className="space-y-8">
      {posts.map((post) => (
        <li key={post.slug}>
          <time dateTime={post.date} className="block text-sm text-muted">
            {formatDate(post.date)}
          </time>
          <h2 className="mt-1 text-xl font-semibold leading-snug sm:text-2xl">
            <Link
              href={`/blog/${post.slug}`}
              className="text-link underline-offset-4 hover:underline"
            >
              {post.title}
            </Link>
          </h2>
        </li>
      ))}
    </ul>
  )
}
