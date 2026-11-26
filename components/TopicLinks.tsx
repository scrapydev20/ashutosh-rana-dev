import Link from 'next/link'
import { topicLabel } from '@/data/topics'

/** Row of topic links. `current` marks the topic page being viewed. */
export default function TopicLinks({
  topics,
  current,
  className = '',
}: {
  topics: string[]
  current?: string
  className?: string
}) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {topics.map((t) => (
        <li key={t}>
          <Link
            href={`/topics/${t}`}
            aria-current={t === current ? 'page' : undefined}
            className="text-link underline-offset-4 hover:underline aria-[current=page]:font-semibold aria-[current=page]:underline"
          >
            {topicLabel(t)}
          </Link>
        </li>
      ))}
    </ul>
  )
}
