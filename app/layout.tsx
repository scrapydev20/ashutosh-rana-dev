import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { profile, socials } from '@/data/siteData'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: profile.fullName,
    template: `%s · ${profile.fullName}`,
  },
  description: profile.description,
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#020617', // slate-950
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear()

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6">
          <header className="flex items-baseline justify-between py-10">
            <Link href="/" className="font-semibold text-slate-100 hover:text-white">
              {profile.fullName}
            </Link>
            <nav className="flex gap-6 text-sm text-slate-400">
              <Link href="/blog" className="hover:text-slate-100">
                Blog
              </Link>
              <a href={socials.github.href} className="hover:text-slate-100">
                GitHub
              </a>
              <a href={socials.x.href} className="hover:text-slate-100">
                X
              </a>
            </nav>
          </header>

          <main className="flex-1 pb-24">{children}</main>

          <footer className="border-t border-slate-800 py-8 text-sm text-slate-500">
            © {year} {profile.fullName}
          </footer>
        </div>
      </body>
    </html>
  )
}
