import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="py-16">
      <h1 className="text-3xl font-semibold text-slate-100">Page not found</h1>
      <p className="mt-4 leading-relaxed text-slate-400">
        This page doesn&apos;t exist, or it has been moved.
      </p>
      <Link href="/" className="mt-8 inline-block text-sky-300 underline underline-offset-4">
        Back to the homepage
      </Link>
    </div>
  )
}
