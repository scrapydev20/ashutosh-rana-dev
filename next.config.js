/** @type {import('next').NextConfig} */

// Vercel (https://ashutosh-rana-dev.vercel.app) serves from the domain root, so
// BASE_PATH is unset there. GitHub Pages serves a project site from a subpath
// (https://scrapychain.github.io/ashutosh-rana-dev), so its build sets
// BASE_PATH=/ashutosh-rana-dev. next/link hrefs and /_next assets are
// prefixed automatically; internal links must use next/link, not raw <a>.
const basePath = process.env.BASE_PATH || ''

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
