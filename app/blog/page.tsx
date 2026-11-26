import type { Metadata } from 'next'
import PostList from '@/components/PostList'
import TopicLinks from '@/components/TopicLinks'
import { getAllPosts, getAllTopics } from '@/lib/posts'

export const metadata: Metadata = { title: 'All posts' }

export default function BlogIndex() {
  return (
    <>
      <h1 className="pb-6 pt-6 text-3xl font-bold tracking-tight">All posts</h1>
      <nav aria-label="Topics" className="border-y border-trail py-4">
        <TopicLinks topics={getAllTopics()} />
      </nav>
      <section className="pt-10">
        <PostList posts={getAllPosts()} />
      </section>
    </>
  )
}
