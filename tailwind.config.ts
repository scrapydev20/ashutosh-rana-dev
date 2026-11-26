import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

// Colors are CSS variables (RGB channels) defined in app/globals.css, with a
// light set on :root and a dark set on html.dark. Classes like `bg-bg` or
// `text-muted` therefore switch automatically with the theme.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        border: token('border'),
        fg: token('fg'),
        muted: token('muted'),
        accent: token('accent'),
        link: token('link'),
        'code-bg': token('code-bg'),
        'code-fg': token('code-fg'),
      },
      maxWidth: {
        column: '700px',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', ...defaultTheme.fontFamily.sans],
        mono: defaultTheme.fontFamily.mono,
      },
      typography: {
        site: {
          css: {
            '--tw-prose-body': 'rgb(var(--fg))',
            '--tw-prose-headings': 'rgb(var(--fg))',
            '--tw-prose-lead': 'rgb(var(--muted))',
            '--tw-prose-links': 'rgb(var(--link))',
            '--tw-prose-bold': 'rgb(var(--fg))',
            '--tw-prose-counters': 'rgb(var(--muted))',
            '--tw-prose-bullets': 'rgb(var(--muted))',
            '--tw-prose-hr': 'rgb(var(--border))',
            '--tw-prose-quotes': 'rgb(var(--fg))',
            '--tw-prose-quote-borders': 'rgb(var(--accent))',
            '--tw-prose-captions': 'rgb(var(--muted))',
            '--tw-prose-code': 'rgb(var(--code-fg))',
            '--tw-prose-pre-code': 'rgb(var(--code-fg))',
            '--tw-prose-pre-bg': 'rgb(var(--code-bg))',
            '--tw-prose-th-borders': 'rgb(var(--border))',
            '--tw-prose-td-borders': 'rgb(var(--border))',
            maxWidth: 'none',
            lineHeight: '1.8',
            // Link color alone is under 3:1 against body text, so in-text
            // links stay underlined (WCAG 1.4.1).
            a: {
              fontWeight: '400',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationThickness: '1px',
            },
            'a:hover': { textDecorationThickness: '2px' },
            ':not(pre) > code': {
              backgroundColor: 'rgb(var(--code-bg))',
              borderRadius: '0.25rem',
              padding: '0.15em 0.35em',
              fontWeight: '400',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              border: '1px solid rgb(var(--border))',
              borderRadius: '0.375rem',
              lineHeight: '1.65',
            },
            img: { borderRadius: '0.375rem', height: 'auto' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
