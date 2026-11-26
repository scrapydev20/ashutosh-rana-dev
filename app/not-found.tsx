import Link from 'next/link'

// A static night-road scene in the site palette: light trails converging on a
// teal horizon, crimson and teal stars, pine silhouettes. Inline SVG, no
// animation, no image files.

const W = 640
const H = 320
const VX = 320 // vanishing point
const VY = 168

// Deterministic "random" so server and client render identical markup.
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
}

const rand = rng(7)
const stars = Array.from({ length: 90 }, () => ({
  x: rand() * W,
  y: rand() * (VY - 20),
  r: rand() < 0.12 ? 1.6 + rand() * 1.2 : 0.4 + rand() * 0.8,
  c: rand() < 0.2 ? '#f0566e' : rand() < 0.35 ? '#4fc1c6' : '#e6e8ef',
  o: 0.35 + rand() * 0.6,
}))

// Light trails: curves from the vanishing point out to the bottom edge.
const trails = Array.from({ length: 26 }, (_, i) => {
  const side = i % 2 === 0 ? -1 : 1
  const spread = 20 + rand() * 300
  const endX = VX + side * spread
  const bend = side * (20 + rand() * 60)
  const crimson = rand() < 0.72
  return {
    d: `M${VX} ${VY} Q ${VX + bend} ${VY + 70} ${endX} ${H + 4}`,
    color: crimson ? (rand() < 0.5 ? '#f0566e' : '#c21a42') : '#4fc1c6',
    width: 0.6 + rand() * 2.4,
    opacity: 0.45 + rand() * 0.5,
  }
})

function trees(fromX: number, toX: number, dir: 1 | -1, seed: number) {
  const r = rng(seed)
  const out: string[] = []
  for (let x = fromX; dir > 0 ? x < toX : x > toX; x += dir * (10 + r() * 14)) {
    // Trees get smaller toward the vanishing point.
    const near = Math.abs(x - VX) / VX
    const h = 18 + near * 95 + r() * 18
    const w = h * (0.32 + r() * 0.08)
    out.push(`M${x - w / 2} ${VY + 6} L${x} ${VY + 6 - h} L${x + w / 2} ${VY + 6} Z`)
  }
  return out.join(' ')
}

export default function NotFound() {
  return (
    <div className="pt-6 text-center">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="A night road with red and teal light trails disappearing toward the horizon"
        className="w-full rounded-md border border-border"
      >
        <defs>
          <linearGradient id="nf-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b0b1d" />
            <stop offset="0.45" stopColor="#0f1b2f" />
            <stop offset="0.53" stopColor="#152f45" />
            <stop offset="1" stopColor="#0b0f1d" />
          </linearGradient>
          <radialGradient id="nf-glow" cx={VX} cy={VY} r="190" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#4fc1c6" stopOpacity="0.55" />
            <stop offset="0.35" stopColor="#152f45" stopOpacity="0.4" />
            <stop offset="1" stopColor="#0b0b1d" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nf-nebula" cx="430" cy="60" r="200" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#881031" stopOpacity="0.55" />
            <stop offset="0.6" stopColor="#341029" stopOpacity="0.25" />
            <stop offset="1" stopColor="#341029" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="nf-road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b0b1d" />
            <stop offset="1" stopColor="#121a2c" />
          </linearGradient>
          <clipPath id="nf-clip">
            <rect width={W} height={H} rx="6" />
          </clipPath>
        </defs>

        <g clipPath="url(#nf-clip)">
          <rect width={W} height={H} fill="url(#nf-sky)" />
          <rect width={W} height={H} fill="url(#nf-nebula)" />
          {stars.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.c} opacity={s.o} />
          ))}
          <rect width={W} height={H} fill="url(#nf-glow)" />

          <path d={trees(-10, VX - 18, 1, 3)} fill="#070a14" />
          <path d={trees(W + 10, VX + 18, -1, 11)} fill="#070a14" />
          <rect y={VY + 5} width={W} height={H - VY} fill="#070a14" />

          <path d={`M${VX - 4} ${VY} L${VX + 4} ${VY} L${W + 60} ${H} L-60 ${H} Z`} fill="url(#nf-road)" />
          {trails.map((t, i) => (
            <path
              key={i}
              d={t.d}
              stroke={t.color}
              strokeWidth={t.width}
              strokeOpacity={t.opacity}
              strokeLinecap="round"
              fill="none"
            />
          ))}
          <path
            d={`M${VX} ${VY} L${VX} ${H}`}
            stroke="#e6e8ef"
            strokeWidth="2"
            strokeDasharray="10 12"
            opacity="0.7"
          />
          <circle cx={VX} cy={VY} r="3" fill="#e6e8ef" />
        </g>
      </svg>

      <p
        aria-hidden="true"
        className="mt-10 text-7xl font-black tracking-tight sm:text-8xl"
      >
        {/* Separate colors: a crimson-to-teal gradient turns grey in the middle. */}
        <span className="text-accent">4</span>
        <span className="text-fg">0</span>
        <span className="text-link">4</span>
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
        <span className="sr-only">Page not found: </span>Lost somewhere in time
      </h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        This page doesn&apos;t exist, or the road that led here has moved.
      </p>

      <ul className="mt-8 flex justify-center gap-6">
        <li>
          <Link href="/" className="text-link underline underline-offset-4">
            Back to the homepage
          </Link>
        </li>
        <li>
          <Link href="/blog" className="text-link underline underline-offset-4">
            All posts
          </Link>
        </li>
      </ul>
    </div>
  )
}
