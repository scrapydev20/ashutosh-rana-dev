import PostList from '@/components/PostList'
import TopicLinks from '@/components/TopicLinks'
import { getAllPosts, getAllTopics } from '@/lib/posts'
import { profile } from '@/data/siteData'

export default function Home() {
  return (
    <>
      <div className="relative">
        <div aria-hidden="true" className="nebula" />
        <h1 className="relative pb-8 pt-6 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {profile.fullName}
        </h1>
      </div>

      <nav aria-label="Topics" className="relative border-y border-trail py-4">
        <TopicLinks topics={getAllTopics()} className="justify-center" />
      </nav>

      <section aria-label="All posts" className="pt-10">
        <PostList posts={getAllPosts()} />
      </section>
    </>
  )
}
