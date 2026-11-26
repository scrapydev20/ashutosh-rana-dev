import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import ExternalLink from '@/components/ExternalLink'
import HomeLink from '@/components/HomeLink'
import ThemeToggle, { themeInitScript } from '@/components/ThemeToggle'
import { profile, socials } from '@/data/siteData'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' })

export const metadata: Metadata = {
  title: { default: profile.fullName, template: `%s · ${profile.fullName}` },
  description: profile.description,
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f9fb' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0f1d' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The init script adds `dark` before hydration, so React must not complain.
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="column mx-auto flex min-h-screen max-w-column flex-col px-5 sm:px-6">
          <header className="flex items-center justify-between pb-6 pt-6">
            <HomeLink name={profile.fullName} />
            <ThemeToggle />
          </header>

          <main id="main" tabIndex={-1} className="flex-1 pb-20 focus:outline-none">
            {children}
          </main>

          <footer className="border-t border-trail py-8 text-sm text-muted">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                <li><Link href="/blog" className="hover:text-fg hover:underline">All posts</Link></li>
                <li><Link href="/about" className="hover:text-fg hover:underline">About</Link></li>
                <li><ExternalLink href={socials.github.href} className="hover:text-fg hover:underline">GitHub</ExternalLink></li>
                <li><ExternalLink href={socials.x.href} className="hover:text-fg hover:underline">X</ExternalLink></li>
              </ul>
            </nav>
            <p className="mt-4">© {new Date().getFullYear()} {profile.fullName}</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
