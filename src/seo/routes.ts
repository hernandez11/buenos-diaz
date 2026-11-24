import { eventContent } from '../content/events'
import { businessGraph, eventGraph, faqGraph } from './schema'
import { SHARE_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from './site'

export interface RouteSeo {
  path: string
  title: string
  description: string
  image: string
  noindex?: boolean
  jsonLd?: unknown[]
  sitemap?: boolean
  canonical?: string
}

const titleCase = (value: string) =>
  value
    .replace(/\s*\|\s*/g, ' ')
    .toLocaleLowerCase('en-US')
    .split(' ')
    .map((word) => (word ? word[0].toLocaleUpperCase('en-US') + word.slice(1) : word))
    .join(' ')

const base = (path: string, title: string, description: string): RouteSeo => ({
  path,
  title,
  description,
  image: SHARE_IMAGE,
  sitemap: true,
})

export const staticRoutes: RouteSeo[] = [
  base('/', `${SITE_NAME} | ${SITE_TAGLINE}`, SITE_DESCRIPTION),
  {
    ...base(
      '/menu',
      `Menu | ${SITE_NAME}`,
      'Our seasonal espresso, classics and non coffee menu, built on syrups we make in house from the flavors we grew up with.',
    ),
    canonical: `${SITE_URL}/`,
    sitemap: false,
  },
  base(
    '/events',
    'Events & Popups | Buenos Díaz Mexican Coffee Cart NYC',
    "Where the Buenos Díaz espresso cart has poured across New York, from Remedy Place Flatiron to Shopify's SoHo flagship and Obscure Coffee in Bushwick.",
  ),
  {
    ...base(
      '/faq',
      'FAQ | Booking the Buenos Díaz Coffee Cart in NYC',
      'Answers on booking the Buenos Díaz mobile espresso bar for New York events: what is included, custom menus, non coffee options, and how to request a quote.',
    ),
    jsonLd: [faqGraph()],
  },
]

export const eventRoutes: RouteSeo[] = eventContent.map((event) => ({
  path: `/events/${event.id}`,
  title: `${titleCase(event.title)} | ${SITE_NAME}`,
  description:
    event.description ??
    `${titleCase(event.title)}, a Buenos Díaz mobile espresso bar popup in New York City.`,
  image: SHARE_IMAGE,
  jsonLd: [eventGraph(event)],
  sitemap: true,
}))

export const notFoundRoute: RouteSeo = {
  path: '*',
  title: `Page not found | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  image: SHARE_IMAGE,
  noindex: true,
  sitemap: false,
}

export const seoRoutes: RouteSeo[] = [...staticRoutes, ...eventRoutes]

export const jsonLdFor = (route: RouteSeo): unknown[] => [businessGraph(), ...(route.jsonLd ?? [])]

export const canonicalFor = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`)

export const canonicalOf = (route: RouteSeo) => route.canonical ?? canonicalFor(route.path)

export const seoForPath = (pathname: string): RouteSeo => {
  const trimmed =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.replace(/\/+$/, '') : pathname
  return seoRoutes.find((route) => route.path === trimmed) ?? notFoundRoute
}
