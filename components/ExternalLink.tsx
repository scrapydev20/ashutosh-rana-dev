/** Link to another site that opens in a new tab. */
export default function ExternalLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    // noopener: the new tab can't control this page. noreferrer: don't leak the URL.
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      {/* Drawn arrow: the ↗ character renders as a colour emoji on some systems. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        className="ml-1 inline-block h-[0.6em] w-[0.6em] align-baseline"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 8.5l5-5M4.5 3.5h4v4" />
      </svg>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
