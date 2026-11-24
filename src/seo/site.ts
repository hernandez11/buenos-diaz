export const SITE_URL = 'https://buenosdiaznyc.com'
export const SITE_NAME = 'Buenos Díaz Coffee'
export const SITE_EMAIL = 'hello@buenosdiaznyc.com'
export const SITE_INSTAGRAM = 'https://www.instagram.com/buenosdiaznyc/'
export const SHARE_IMAGE = `${SITE_URL}/og-image.jpg`

export const SITE_TAGLINE = 'NYC Mobile Espresso Bar'

export const SITE_DESCRIPTION = 'Mobile espresso bar bringing a taste of Mexican heritage to NYC.'

export const BUSINESS_DESCRIPTION =
  'Mobile specialty espresso bar serving New York City, pouring coffee from a family of Chiapas coffee farmers at weddings, corporate events, brand activations and popups.'

export const absolute = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
