'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/** Small site-name link in the header; hidden on the homepage, which shows the full title. */
export default function HomeLink({ name }: { name: string }) {
  if (usePathname() === '/') return <span />
  return (
    <Link href="/" className="font-semibold text-fg underline-offset-4 hover:underline">
      {name}
    </Link>
  )
}
