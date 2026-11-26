'use client'

import { useEffect, useState } from 'react'

/** Runs in <head> before paint so the page never flashes the wrong theme. */
export const themeInitScript = `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`

export default function ThemeToggle() {
  // null until mounted: the server can't know the reader's theme.
  const [dark, setDark] = useState<boolean | null>(null)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
    setDark(next)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark ?? false}
      aria-label="Dark mode"
      onClick={toggle}
      className="group inline-flex items-center gap-2 rounded-full p-1 text-muted hover:text-fg"
    >
      {/* Sun */}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* Track: knob position comes from html.dark, so it is right before hydration too. */}
      <span className="relative h-5 w-9 rounded-full border border-border bg-surface">
        <span className="absolute left-0.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-link transition-transform dark:translate-x-4 motion-reduce:transition-none" />
      </span>
      {/* Moon */}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  )
}
