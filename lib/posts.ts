import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Marked } from 'marked'
import hljs from 'highlight.js'
import { TOPICS, topicSlug } from '@/data/topics'

export interface Post {
  slug: string
  title: string
  /** ISO 8601, with time and offset when given, e.g. "2026-11-23T21:44:00-05:00". */
  date: string
  series?: string
  /** Topic slugs, e.g. ["time"]. */
  topics: string[]
  /** Meta description; falls back to the excerpt. */
  description: string
  excerpt: string
  html: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts')
const basePath = process.env.BASE_PATH || ''

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const marked = new Marked({
  gfm: true,
  breaks: true,
  // Root-relative links and images in markdown ("/images/x.png") need the
  // base path when deployed under a subpath (GitHub Pages).
  walkTokens(token) {
    if ((token.type === 'link' || token.type === 'image') && token.href.startsWith('/')) {
      token.href = basePath + token.href
    }
  },
  renderer: {
    // Highlighted at build time; no JavaScript ships to the browser.
    code({ text, lang }) {
      const language = (lang || '').split(/\s/)[0]
      const body =
        language && hljs.getLanguage(language)
          ? hljs.highlight(text, { language }).value
          : escapeHtml(text)
      const cls = language ? ` class="hljs language-${escapeHtml(language)}"` : ' class="hljs"'
      return `<pre><code${cls}>${body}</code></pre>\n`
    },
    image({ href, title, text }) {
      const t = title ? ` title="${escapeHtml(title)}"` : ''
      return `<img src="${escapeHtml(href)}" alt="${escapeHtml(text)}"${t} loading="lazy" decoding="async">`
    },
  },
})

function readPost(fileName: string): Post {
  const { data, content } = matter(fs.readFileSync(path.join(postsDirectory, fileName), 'utf8'))
  const rawTopics: unknown = data.topics ?? data.tags ?? []
  const topics = (Array.isArray(rawTopics) ? rawTopics : [rawTopics])
    .map((t) => topicSlug(String(t)))
    .filter(Boolean)

  return {
    slug: data.slug || fileName.replace(/\.md$/, ''),
    title: data.title || '',
    // Quote dates in front matter to keep the original offset; unquoted
    // YAML timestamps arrive as Date objects and are normalized to UTC.
    date: data.date instanceof Date ? data.date.toISOString() : String(data.date || ''),
    series: data.series || undefined,
    topics: Array.from(new Set(topics)),
    description: data.description || data.excerpt || '',
    excerpt: data.excerpt || '',
    html: marked.parse(content) as string,
  }
}

let cache: Post[] | null = null

/** All posts, newest first. Cached per build (dev re-reads on each request). */
export function getAllPosts(): Post[] {
  if (cache && process.env.NODE_ENV === 'production') return cache
  const files = fs.existsSync(postsDirectory)
    ? fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'))
    : []
  cache = files.map(readPost).sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  return cache
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((post) => post.slug === slug) ?? null
}

export function getPostsByTopic(topic: string): Post[] {
  return getAllPosts().filter((post) => post.topics.includes(topic))
}

/** Configured topics first (in config order), then any extra tags used by posts. */
export function getAllTopics(): string[] {
  const used = getAllPosts().flatMap((p) => p.topics)
  return Array.from(new Set([...Object.keys(TOPICS), ...used]))
}
