import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import EventsGallery from './EventsGallery'
import { EventsTransitionContext, type FlyingImageState } from '../EventsTransitionContext'

const TRANSITION_MS = 650
const TRANSITION_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const FlyingImage = styled.img<{ $animating: boolean }>`
  position: fixed;
  z-index: 200;
  object-fit: cover;
  pointer-events: none;
  margin: 0;
  transition: ${(props) =>
    props.$animating ? `all ${TRANSITION_MS}ms ${TRANSITION_EASING}` : 'none'};
`

export const EventsPage = () => {
  const [flying, setFlying] = useState<FlyingImageState | null>(null)
  const [animating, setAnimating] = useState(false)
  const [style, setStyle] = useState<CSSProperties>({})
  const heroRef = useRef<HTMLImageElement | null>(null)

  const registerHeroRef = useCallback((el: HTMLImageElement | null) => {
    heroRef.current = el
  }, [])

  const startTransition = useCallback((image: FlyingImageState) => {
    setFlying(image)
    setAnimating(false)
    setStyle({
      top: image.from.top,
      left: image.from.left,
      width: image.from.width,
      height: image.from.height,
    })
  }, [])

  useLayoutEffect(() => {
    if (!flying) return

    let cancelled = false

    // Give EventDetail (mounted by the navigate() call that triggered
    // this transition) a frame to lay out, so heroRef points at its real
    // hero image and we know exactly where the clone should land.
    const raf = requestAnimationFrame(() => {
      if (cancelled) return
      const target = heroRef.current?.getBoundingClientRect()
      if (!target) {
        setFlying(null)
        return
      }

      setStyle({
        top: target.top,
        left: target.left,
        width: target.width,
        height: target.height,
      })
      setAnimating(true)

      window.setTimeout(() => {
        if (!cancelled) setFlying(null)
      }, TRANSITION_MS + 50)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [flying])

  return (
    <EventsTransitionContext.Provider value={{ startTransition, registerHeroRef }}>
      <Wrapper data-testid='events-page'>
        <EventsGallery />
        <Outlet />
      </Wrapper>

      {flying && (
        <FlyingImage src={flying.src} alt={flying.alt} $animating={animating} style={style} />
      )}
    </EventsTransitionContext.Provider>
  )
}
