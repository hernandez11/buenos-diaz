import { createContext, useContext } from 'react'

export interface FlyingImageState {
  src: string
  alt: string
  from: DOMRect
}

export interface EventsTransitionContextValue {
  startTransition: (image: FlyingImageState) => void

  registerHeroRef: (el: HTMLImageElement | null) => void
}

export const EventsTransitionContext = createContext<EventsTransitionContextValue | null>(null)

export const useEventsTransition = () => useContext(EventsTransitionContext)
