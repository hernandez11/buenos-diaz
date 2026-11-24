import { faqs } from '../content/faq'
import {
  BUSINESS_DESCRIPTION,
  SHARE_IMAGE,
  SITE_EMAIL,
  SITE_INSTAGRAM,
  SITE_NAME,
  SITE_URL,
} from './site'

export const businessGraph = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: 'Buenos Diaz Coffee',
      url: `${SITE_URL}/`,
      publisher: { '@id': `${SITE_URL}/#business` },
    },
    {
      '@type': 'CafeOrCoffeeShop',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      alternateName: ['Buenos Diaz Coffee', 'Buenos Diaz Coffee NYC', 'Buenos Díaz NYC'],
      url: `${SITE_URL}/`,
      email: SITE_EMAIL,
      logo: `${SITE_URL}/favicon.svg`,
      image: SHARE_IMAGE,
      description: BUSINESS_DESCRIPTION,
      priceRange: '$$',
      servesCuisine: 'Mexican',
      currenciesAccepted: 'USD',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'New York',
        addressRegion: 'NY',
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'City', name: 'New York' },
        { '@type': 'AdministrativeArea', name: 'Manhattan' },
        { '@type': 'AdministrativeArea', name: 'Brooklyn' },
        { '@type': 'AdministrativeArea', name: 'Queens' },
        { '@type': 'AdministrativeArea', name: 'The Bronx' },
        { '@type': 'AdministrativeArea', name: 'Staten Island' },
      ],
      sameAs: [SITE_INSTAGRAM],
      makesOffer: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Wedding coffee cart',
            serviceType: 'Mobile espresso bar for weddings',
            areaServed: 'New York City',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Corporate coffee catering',
            serviceType: 'Mobile espresso bar for offices and conferences',
            areaServed: 'New York City',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Brand activation espresso bar',
            serviceType: 'Mobile espresso bar for launches and activations',
            areaServed: 'New York City',
          },
        },
      ],
    },
  ],
})

export const faqGraph = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
})

export const isoDate = (date: string) => {
  const match = date.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
  if (!match) return null
  const [, month, day, year] = match
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

export const eventGraph = (event: {
  id: string
  title: string
  date: string
  description?: string
}) => {
  const start = isoDate(event.date)

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${SITE_URL}/events/${event.id}#event`,
    name: event.title,
    url: `${SITE_URL}/events/${event.id}`,
    ...(start ? { startDate: start, endDate: start } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: SHARE_IMAGE,
    ...(event.description ? { description: event.description } : {}),
    location: {
      '@type': 'Place',
      name: 'New York City',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'New York',
        addressRegion: 'NY',
        addressCountry: 'US',
      },
    },
    organizer: { '@id': `${SITE_URL}/#business` },
    performer: { '@id': `${SITE_URL}/#business` },
  }
}
