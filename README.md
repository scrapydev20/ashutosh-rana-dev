# Ashutosh Rana - Personal Site

A minimal digital garden built with Next.js, TypeScript, and Tailwind CSS, designed for
long-form reading.

## Design

- Light and dark themes (toggle in the header, follows the system setting by default).
  Colors are CSS variables in `app/globals.css`, all WCAG AA.
- Inter for all headings and body copy. Monospace only for inline code and `<pre>` blocks.
- A single centered column (700px) holding a flat list of posts.
- Post bodies use the `prose-site` typography theme in `tailwind.config.ts`.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx              Root layout: theme script, header + toggle, column, footer
  page.tsx                Homepage: title, topic row, all posts
  blog/page.tsx           All posts
  blog/[slug]/page.tsx    Post page
  topics/[topic]/page.tsx Topic page
  about/page.tsx          Intro and projects
  not-found.tsx           404
  globals.css             Palette (light/dark), base styles, syntax colors
components/               ThemeToggle, PostList, TopicLinks, HomeLink
content/posts/            Markdown posts
data/
  topics.ts               Topic list
  siteData.ts             Profile and social links
  projects.ts             Project list
lib/posts.ts              Markdown loading, highlighting (highlight.js), topics
vercel.json               Redirects old /log URLs to the homepage
```

## Writing a Post

Add a markdown file to `content/posts/`:

```markdown
---
title: My first note
date: "2026-11-21T09:30:00-05:00"
excerpt: One sentence shown in lists and as the meta description.
topics: [rust, time]
---

Post body in markdown. Fenced code blocks with a language
(three backticks followed by rust) are syntax-highlighted at build time.
```

The URL is `/blog/<filename>`, or `/blog/<slug>` if a `slug` field is set.
Quote the date so its timezone offset is kept.

## Topics

Topics are listed in `data/topics.ts` (one line each) and shown on the homepage
in that order. Each topic has a page at `/topics/<topic>`. A post can use a tag
that isn't in the config; it still gets a topic page, labelled from the tag.

## Build

```bash
npm run build   # static export to ./out
```

## License

MIT
