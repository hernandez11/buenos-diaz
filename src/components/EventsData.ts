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
import ShopifyImg_4 from '@/assets/Events/Shopify/Shopify_gallery_4.jpeg'
import ShopifyVid_2 from '@/assets/Events/Shopify/Shopify_clip_2.mp4'
import ShopifyVid_3 from '@/assets/Events/Shopify/Shopify_clip_3.mp4'
import ShopifyRecap from '@/assets/Events/Shopify/Shopify_recap.mp4'

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
    alt: 'Placeholder image',
    title: 'OBSCURE COFFEE ROASTERS',
    date: '08.15',
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
    alt: 'Placeholder image',
    title: 'SHOPIFY | SUMMER BIZ CONNECT',
    date: '07.21',
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
  // {
  //   id: 'remedy-popup',
  //   image: RemedyImg_3,
  //   alt: 'Placeholder image',
  //   title: 'REMEDY PLACE TAKEOVER',
  //   date: '09.06',
  //   layout: ['full'],
  // },
]

export const getEventById = (id: string) => events.find((event) => event.id === id)

export const isUpcoming = (date: string, now = new Date()) => {
  const match = date.match(/^(\d{1,2})\.(\d{1,2})$/)
  if (!match) return false

  const month = Number(match[1]) - 1
  const day = Number(match[2])

  let candidate = new Date(now.getFullYear(), month, day)
  const halfYear = 182 * 24 * 60 * 60 * 1000

  if (candidate.getTime() - now.getTime() < -halfYear) {
    candidate = new Date(now.getFullYear() + 1, month, day)
  }

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return candidate.getTime() > today.getTime()
}
