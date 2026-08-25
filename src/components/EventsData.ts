import ObscureImg_1 from '@/assets/Events/Obscure/Obscure_gallery_1.webp'
import ObscureImg_2 from '@/assets/Events/Obscure/Obscure_gallery_2.webp'
import ObscureImg_3 from '@/assets/Events/Obscure/Obscure_gallery_3.webp'
import ObscureVid_1 from '@/assets/Events/Obscure/Obscure_clip_1.mp4'
import ObscureVid_2 from '@/assets/Events/Obscure/Obscure_clip_2.mp4'
import ObscureVid_3 from '@/assets/Events/Obscure/Obscure_clip_3.mp4'
import ObscureVid_4 from '@/assets/Events/Obscure/Obscure_clip_4.mp4'
import ObscureRecap from '@/assets/Events/Obscure/Obscure_recap.mp4'
import ShopifyImg_1 from '@/assets/Events/Shopify/Shopify_gallery_1.webp'
import ShopifyImg_2 from '@/assets/Events/Shopify/Shopify_gallery_2.webp'
import ShopifyImg_3 from '@/assets/Events/Shopify/Shopify_gallery_3.webp'
import ShopifyImg_4 from '@/assets/Events/Shopify/Shopify_gallery_4.webp'
import ShopifyVid_2 from '@/assets/Events/Shopify/Shopify_clip_2.mp4'
import ShopifyVid_3 from '@/assets/Events/Shopify/Shopify_clip_3.mp4'
import ShopifyRecap from '@/assets/Events/Shopify/Shopify_recap.mp4'
import RemedyImg_1 from '@/assets/Events/Remedy/Remedy_gallery_1.webp'

export type GalleryBlock = 'full' | 'wide' | 'tall' | 'pair'

export interface EventItem {
  id: string
  image: string
  alt: string
  title: string
  date: string
  description?: string
  gallery?: string[]
  layout?: GalleryBlock[]
}

export const events: EventItem[] = [
  {
    id: 'obscure-popup',
    image: ObscureImg_1,
    alt: 'Obscure popup poster',
    title: 'OBSCURE COFFEE ROASTERS',
    date: '08.15.2026',
    description:
      'Buenos Díaz joined Obscure Coffee Roasters in Bushwick for a one-day popup, bringing our specialty espresso menu into their space alongside a limited run of collaborative drinks merging the coffee culture of Chiapas, Mexico with the bold flavors of Puerto Rico.',
    gallery: [
      ObscureRecap,
      ObscureVid_3,
      ObscureVid_2,
      ObscureVid_4,
      ObscureVid_1,
      ObscureImg_3,
      ObscureImg_2,
    ],
    layout: ['full', 'wide', 'pair', 'wide', 'pair'],
  },
  {
    id: 'shopify-popup',
    image: ShopifyImg_3,
    alt: 'Shopify popup poster',
    title: 'SHOPIFY | SUMMER BIZ CONNECT',
    date: '07.21.2026',
    description:
      'Buenos Díaz served at Shopify NYs Summer Biz Connect, a networking mixer bringing together founders, merchants, and creators at their SoHo flagship on Greene Street. We poured our summer aguas frescas for a room full of builders and entrepreneurs, adding a taste of Mexican ingredients to an evening built on connection and collaboration.',
    gallery: [
      ShopifyRecap,
      ShopifyImg_1,
      ShopifyImg_2,
      ShopifyImg_3,
      ShopifyVid_3,
      ShopifyImg_4,
      ShopifyVid_2,
    ],
    layout: ['full', 'wide', 'wide', 'tall', 'pair'],
  },
  {
    id: 'remedy-popup',
    image: RemedyImg_1,
    alt: 'Remedy popup poster',
    title: 'REMEDY PLACE',
    date: '09.06.2026',
    // layout: ['full'],
  },
]

export const getEventById = (id: string) => events.find((event) => event.id === id)

const DATED = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/
const UNDATED = /^(\d{1,2})\.(\d{1,2})$/

export const displayDate = (date: string) => {
  const match = date.match(DATED)
  return match ? `${match[1]}.${match[2]}` : date
}

const resolveDate = (date: string, now: Date) => {
  const dated = date.match(DATED)
  if (dated) {
    return new Date(Number(dated[3]), Number(dated[1]) - 1, Number(dated[2]))
  }

  const undated = date.match(UNDATED)
  if (!undated) return null

  const month = Number(undated[1]) - 1
  const day = Number(undated[2])

  let candidate = new Date(now.getFullYear(), month, day)
  const halfYear = 182 * 24 * 60 * 60 * 1000

  if (candidate.getTime() - now.getTime() < -halfYear) {
    candidate = new Date(now.getFullYear() + 1, month, day)
  }

  return candidate
}

const startOfToday = (now: Date) =>
  new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()

export const isUpcoming = (date: string, now = new Date()) => {
  const candidate = resolveDate(date, now)
  if (!candidate) return false
  return candidate.getTime() > startOfToday(now)
}

export const hasDetailPage = (event: EventItem) => !isUpcoming(event.date)

export const defaultEventIndex = (now = new Date()) => {
  const today = startOfToday(now)
  let best = -1
  let bestTime = -Infinity
  let fallback = -1
  let fallbackTime = Infinity

  events.forEach((event, index) => {
    const candidate = resolveDate(event.date, now)
    if (!candidate) return

    const time = candidate.getTime()

    if (time > today) {
      if (time < fallbackTime) {
        fallbackTime = time
        fallback = index
      }
      return
    }

    if (time > bestTime) {
      bestTime = time
      best = index
    }
  })

  if (best >= 0) return best
  return fallback >= 0 ? fallback : 0
}
