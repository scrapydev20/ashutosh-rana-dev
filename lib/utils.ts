export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/** Timezone used to display post timestamps. */
export const SITE_TIME_ZONE = 'America/New_York'

/** Date-only strings ("2026-11-23") are calendar days; parse them as UTC so the day never shifts. */
function parse(iso: string) {
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(iso)
  return { d: new Date(dateOnly ? `${iso}T00:00:00Z` : iso), timeZone: dateOnly ? 'UTC' : SITE_TIME_ZONE }
}

/** "2026-11-23T21:44:00-05:00" -> "Nov 23, 2026" */
export function formatDate(iso: string) {
  const { d, timeZone } = parse(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone })
}

/** "2026-11-23T21:44:00-05:00" -> "November 23, 2026 · 9:44 PM EST" (date only if no time given). */
export function formatDateTime(iso: string) {
  const { d, timeZone } = parse(iso)
  if (Number.isNaN(d.getTime())) return iso
  const date = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone })
  if (timeZone === 'UTC') return date
  const time = d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone,
    timeZoneName: 'short',
  })
  return `${date} · ${time}`
}
