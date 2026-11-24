export interface Project {
  id: string
  name: string
  description: string
  /** Short status, e.g. "Live" or "In progress". */
  status?: string
  /** Omit for private/unreleased work. */
  href?: string
}

export const projects: Project[] = [
  {
    id: 'scrapybytes',
    name: 'ScrapyBytes',
    description:
      'A visual CS education platform that breaks down NLP, RAG, hashing, and distributed systems into digestible explainers.',
    status: 'Live',
    href: 'https://scrapybytes.vercel.app',
  },
  {
    id: 'tee',
    name: 'Term Extraction Engine',
    description:
      'A Rust-native document intelligence tool: extract key terms and build a knowledge graph with no third-party APIs. Built for Web3 security auditors.',
    status: 'In progress',
  },
]
