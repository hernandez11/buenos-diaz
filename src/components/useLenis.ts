import { useEffect } from 'react'
import Lenis from 'lenis'
import { ZOOM_THRESHOLD } from '@/components/useVisualZoom'

let instance: Lenis | null = null

export const getLenis = () => instance

export const useLenis = () => {
  useEffect(() => {
    let lenis: Lenis | null = null
    let frameId = 0

    const observer = new ResizeObserver(() => {
      lenis?.resize()
    })

    const start = () => {
      if (lenis) return
      lenis = new Lenis({
        duration: 1.8,
        wheelMultiplier: 0.9,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      observer.observe(document.body)
      instance = lenis
    }

    const stop = () => {
      if (!lenis) return
      observer.disconnect()
      lenis.destroy()
      lenis = null
      instance = null
    }

    const viewport = window.visualViewport

    const sync = () => {
      if (viewport && viewport.scale > ZOOM_THRESHOLD) stop()
      else start()
    }

    const raf = (time: number) => {
      lenis?.raf(time)
      frameId = requestAnimationFrame(raf)
    }

    sync()
    viewport?.addEventListener('resize', sync)
    frameId = requestAnimationFrame(raf)

    return () => {
      viewport?.removeEventListener('resize', sync)
      cancelAnimationFrame(frameId)
      stop()
    }
  }, [])
}
