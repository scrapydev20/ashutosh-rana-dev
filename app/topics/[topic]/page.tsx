import type { Metadata } from 'next'
import PostList from '@/components/PostList'
import TopicLinks from '@/components/TopicLinks'
import { topicLabel } from '@/data/topics'
import { getAllTopics, getPostsByTopic } from '@/lib/posts'

// Note: don't add `dynamicParams = false`; Next 14.2's dev server rejects it
// under `output: 'export'` (see app/blog/[slug]/page.tsx).
export function generateStaticParams() {
  return getAllTopics().map((topic) => ({ topic }))
}

export function generateMetadata({ params }: { params: { topic: string } }): Metadata {
  const label = topicLabel(params.topic)
  const description = `Posts about ${label}.`
  return { title: label, description, openGraph: { title: label, description } }
}

export default function TopicPage({ params }: { params: { topic: string } }) {
  return (
    <>
      <h1 className="pb-6 pt-6 text-3xl font-bold tracking-tight">{topicLabel(params.topic)}</h1>
      <nav aria-label="Topics" className="border-y border-trail py-4">
        <TopicLinks topics={getAllTopics()} current={params.topic} />
      </nav>
      <section className="pt-10">
        <PostList posts={getPostsByTopic(params.topic)} />
      </section>
    </>
  )
}
