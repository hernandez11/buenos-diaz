import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { Plugin } from 'vite'
import { canonicalFor, jsonLdFor, notFoundRoute, seoRoutes, type RouteSeo } from '../src/seo/routes'
import { SITE_NAME, SITE_URL } from '../src/seo/site'

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const escapeText = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const headFor = (route: RouteSeo, canonical: string) => {
  const lines = [
    `<title>${escapeText(route.title)}</title>`,
    `<meta name="description" content="${escapeAttr(route.description)}">`,
    `<link rel="canonical" href="${escapeAttr(canonical)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${escapeAttr(SITE_NAME)}">`,
    `<meta property="og:url" content="${escapeAttr(canonical)}">`,
    `<meta property="og:title" content="${escapeAttr(route.title)}">`,
    `<meta property="og:description" content="${escapeAttr(route.description)}">`,
    `<meta property="og:image" content="${escapeAttr(route.image)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}">`,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}">`,
    `<meta name="twitter:image" content="${escapeAttr(route.image)}">`,
  ]

  if (route.noindex) lines.push(`<meta name="robots" content="noindex,follow">`)

  for (const block of jsonLdFor(route)) {
    const json = JSON.stringify(block).replace(/</g, '\\u003c')
    lines.push(`<script type="application/ld+json" data-seo-jsonld="true">${json}</script>`)
  }

  return lines.join('\n    ')
}

const SEO_BLOCK = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/

const render = (template: string, route: RouteSeo, canonical: string) => {
  const replacement = `<!-- seo:start -->\n    ${headFor(route, canonical)}\n    <!-- seo:end -->`

  if (!SEO_BLOCK.test(template)) {
    throw new Error('index.html is missing the seo:start / seo:end markers')
  }

  return template.replace(SEO_BLOCK, replacement)
}

const outputPath = (outDir: string, path: string) =>
  path === '/' ? join(outDir, 'index.html') : join(outDir, path.slice(1), 'index.html')

const sitemap = (routes: RouteSeo[]) => {
  const entries = routes
    .filter((route) => route.sitemap !== false)
    .map((route) => `  <url>\n    <loc>${canonicalFor(route.path)}</loc>\n  </url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
}

export const prerender = (): Plugin => {
  let outDir = 'dist'

  return {
    name: 'buenos-diaz-prerender',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    async closeBundle() {
      const root = join(process.cwd(), outDir)
      const template = await readFile(join(root, 'index.html'), 'utf8')

      for (const route of seoRoutes) {
        const file = outputPath(root, route.path)
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, render(template, route, canonicalFor(route.path)), 'utf8')
      }

      await writeFile(
        join(root, '404.html'),
        render(template, notFoundRoute, `${SITE_URL}/404`),
        'utf8',
      )

      await writeFile(join(root, 'sitemap.xml'), sitemap(seoRoutes), 'utf8')

      console.log(`[prerender] wrote ${seoRoutes.length} routes, 404.html and sitemap.xml`)
    },
  }
}

export default prerender
