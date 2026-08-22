import { useEffect, useRef } from 'react'

interface ParallaxOptions {
  speed?: number
  pinned?: boolean
  smoothing?: number
}

export const useParallax = <
  F extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLImageElement,
>({
  speed = 0.22,
  pinned = false,
  smoothing = 0.12,
}: ParallaxOptions = {}) => {
  const frameRef = useRef<F>(null)
  const imageRef = useRef<I>(null)

  useEffect(() => {
    const frame = frameRef.current
    const image = imageRef.current
    if (!frame || !image) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let running = false
    let current = 0
    let target = 0

    const measure = () => {
      const rect = frame.getBoundingClientRect()
      const viewport = window.innerHeight

      if (pinned) {
        let documentTop = 0
        let node: HTMLElement | null = frame
        while (node) {
          documentTop += node.offsetTop
          node = node.offsetParent as HTMLElement | null
        }

        const travelled = window.scrollY - documentTop
        const progress = Math.min(Math.max(travelled / rect.height, 0), 1)
        target = -progress * rect.height * speed
        return
      }

      const raw = (viewport - rect.top) / (viewport + rect.height)
      const progress = Math.min(Math.max(raw, 0), 1)
      target = (progress - 0.5) * rect.height * speed
    }

    const paint = () => {
      image.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`
    }

    const tick = () => {
      const delta = target - current

      if (Math.abs(delta) < 0.05) {
        current = target
        paint()
        running = false
        raf = 0
        return
      }

      current += delta * smoothing
      paint()
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      measure()
      start()
    }

    measure()
    current = target
    paint()

    const observer = new ResizeObserver(() => {
      measure()
      current = target
      paint()
    })
    observer.observe(frame)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed, pinned, smoothing])

  return { frameRef, imageRef }
}

export default useParallax
