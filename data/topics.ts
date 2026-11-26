// Topics shown in the homepage topic row, in this order.
// Add a topic with one line here. A post can also use a tag that isn't
// listed: it still gets a /topics/<tag> page, labelled from the tag.
export const TOPICS: Record<string, string> = {
  rust: 'Rust',
  blockchain: 'Blockchain',
  ai: 'AI',
  time: 'Time',
}

/** "Machine Learning" -> "machine-learning" */
export function topicSlug(tag: string) {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Label from config, else "machine-learning" -> "Machine Learning". */
export function topicLabel(slug: string) {
  return TOPICS[slug] ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
