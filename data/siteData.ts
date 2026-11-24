export const profile = {
  fullName: 'Ashutosh Rana',
  role: 'Software Engineer',
  description: 'Notes on Rust, software engineering, and building things, by Ashutosh Rana.',
  /** Homepage intro, one paragraph per entry. */
  intro: [
    "I'm Ashutosh, a software engineer with four years of building and maintaining production software.",
    'This is my digital garden: notes on Rust, the realities of shipping software, and the things I am building. Some are polished, most are growing.',
  ],
} as const

export const socials = {
  github: { label: 'GitHub', href: 'https://github.com/scrapychain' },
  x: { label: 'X', href: 'https://x.com/ashutoshrana_20' },
} as const
