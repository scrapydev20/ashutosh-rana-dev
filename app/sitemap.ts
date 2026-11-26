import { MetadataRoute } from 'next'
import { getAllPosts, getAllTopics } from '@/lib/posts'

// Live site on Vercel, served from the domain root.
const baseUrl = 'https://ashutosh-rana-dev.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const latest = posts[0] ? new Date(posts[0].date) : new Date()

  return [
    { url: baseUrl, lastModified: latest, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: latest, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: 'yearly', priority: 0.4 },
    ...getAllTopics().map((t) => ({
      url: `${baseUrl}/topics/${t}`,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ]
}
