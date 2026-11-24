# Ashutosh Rana - Personal Site

A minimal digital garden built with Next.js, TypeScript, and Tailwind CSS, designed for
long-form reading.

## Design

- Soft dark mode: `slate-950` background, `slate-200` text, one muted sky accent for links.
- Inter for all headings and body copy. Monospace only for inline code and `<pre>` blocks.
- A single centered column (`max-w-2xl`, about 672px) holding a flat vertical feed.
- Post bodies use the custom `prose-garden` typography theme in `tailwind.config.ts`.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx            Root layout: font, header, reading column, footer
  page.tsx              Homepage: intro, writing feed, projects
  posts/[slug]/page.tsx Individual post page
  not-found.tsx         404
  globals.css           Base styles
content/posts/          Markdown posts
data/
  siteData.ts           Profile and social links
  projects.ts           Project list
lib/posts.ts            Markdown loading (gray-matter + marked)
```

## Writing a Post

Add a markdown file to `content/posts/`:

```markdown
---
title: My first note
date: 2026-11-21
excerpt: One sentence shown on the homepage.
tags: [rust]
---

Post body in markdown.
```

The slug comes from the filename, or from a `slug` field in the frontmatter if one is set.

## Build

```bash
npm run build   # static export to ./out
```

## License

MIT
