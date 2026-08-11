import obscureEvent from '@/assets/obscureEvent.jpg'
import HeroBg from '@/assets/HeroBg.png'
import EventCard from '@/assets/EventCard.jpg'
import MenuBg from '@/assets/MenuBg.jpg'
import bodyImg from '@/assets/body-img.jpg'

export interface EventItem {
  id: string
  image: string
  alt: string
  title: string
  date: string
  location?: string
  description?: string
  gallery?: string[]
}

export const events: EventItem[] = [
  {
    id: 'tile-2',
    image: bodyImg,
    alt: 'Placeholder image',
    title: 'Placeholder Event Title',
    date: 'Sat, Aug 8   |   11a - 2p',
    location: '123 Placeholder St, Brooklyn, NY',
    description:
      'A short description of this event goes here. Swap this placeholder copy for the real story once you have it, tasting notes, what to expect, who is pouring, and so on.',
    gallery: [bodyImg, EventCard],
  },
  {
    id: 'tile-3',
    image: EventCard,
    alt: 'Placeholder image',
    title: 'Placeholder Pop-Up',
    date: 'Sun, Aug 9   |   9a - 1p',
    description:
      'A short description of this event goes here. This one has no location yet, since some events are still being finalized.',
    gallery: [EventCard, MenuBg],
  },
  {
    id: 'tile-featured',
    image: obscureEvent,
    alt: 'Buenos Diaz x Obscure Coffee',
    title: 'Buenos Diaz x Obscure Coffee',
    date: 'Sat, Aug 15   |   10a - 3p',
    location: '259 Melrose St, Brooklyn, NY 11206',
    description:
      'A short description of this event goes here. Replace with the real collaboration details, what Buenos Diaz and Obscure Coffee are bringing to the day, the menu, the vibe, all of it.',
    gallery: [obscureEvent, bodyImg, HeroBg],
  },
  {
    id: 'tile-5',
    image: HeroBg,
    alt: 'Placeholder image',
    title: 'Placeholder Tasting',
    date: 'Fri, Aug 21   |   6p - 9p',
    location: '456 Placeholder Ave, Queens, NY',
    description: 'A short description of this event goes here.',
    gallery: [HeroBg, MenuBg],
  },
  {
    id: 'tile-7',
    image: MenuBg,
    alt: 'Placeholder image',
    title: 'Placeholder Market',
    date: 'Sat, Aug 29   |   10a - 4p',
    description: 'A short description of this event goes here.',
    gallery: [MenuBg, EventCard],
  },
]

export const getEventById = (id: string) => events.find((event) => event.id === id)
