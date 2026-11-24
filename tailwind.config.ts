import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Inter is loaded via next/font in app/layout.tsx and exposed as a CSS var.
        sans: ['var(--font-sans)', 'system-ui', ...defaultTheme.fontFamily.sans],
        // Monospace is used only for inline code and <pre> blocks (see globals.css).
        mono: defaultTheme.fontFamily.mono,
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        garden: {
          css: {
            '--tw-prose-body': theme('colors.slate.300'),
            '--tw-prose-headings': theme('colors.slate.100'),
            '--tw-prose-lead': theme('colors.slate.400'),
            '--tw-prose-links': theme('colors.sky.300'),
            '--tw-prose-bold': theme('colors.slate.100'),
            '--tw-prose-counters': theme('colors.slate.500'),
            '--tw-prose-bullets': theme('colors.slate.600'),
            '--tw-prose-hr': theme('colors.slate.800'),
            '--tw-prose-quotes': theme('colors.slate.300'),
            '--tw-prose-quote-borders': theme('colors.slate.700'),
            '--tw-prose-captions': theme('colors.slate.500'),
            '--tw-prose-code': theme('colors.slate.200'),
            '--tw-prose-pre-code': theme('colors.slate.200'),
            '--tw-prose-pre-bg': theme('colors.slate.900'),
            '--tw-prose-th-borders': theme('colors.slate.700'),
            '--tw-prose-td-borders': theme('colors.slate.800'),
            maxWidth: 'none',
            lineHeight: '1.75',
            a: {
              textDecoration: 'underline',
              textDecorationColor: theme('colors.slate.600'),
              textUnderlineOffset: '3px',
              fontWeight: '400',
            },
            'a:hover': { textDecorationColor: theme('colors.sky.300') },
            // Inline code: soft pill, no backtick pseudo-content.
            ':not(pre) > code': {
              backgroundColor: theme('colors.slate.800'),
              borderRadius: '0.25rem',
              padding: '0.15em 0.35em',
              fontWeight: '400',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              border: `1px solid ${theme('colors.slate.800')}`,
              borderRadius: '0.5rem',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
