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
  base(
    '/menu',
    `Menu | ${SITE_NAME}`,
    'Our seasonal espresso, classics and non coffee menu, built on syrups we make in house from the flavors we grew up with.',
  ),
  base(
    '/events',
    `Events | ${SITE_NAME}`,
    'Popups, weddings, brand activations and private events we have poured across New York City.',
  ),
  {
    ...base(
      '/faq',
      `FAQ | ${SITE_NAME}`,
      'How booking works, what is included, how we build a menu for your event, and where to find us around New York City.',
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

export const seoForPath = (pathname: string): RouteSeo => {
  const trimmed =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.replace(/\/+$/, '') : pathname
  return seoRoutes.find((route) => route.path === trimmed) ?? notFoundRoute
}
