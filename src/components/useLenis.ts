import { useEffect } from 'react'
import Lenis from 'lenis'

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    const observer = new ResizeObserver(() => {
      lenis.resize()
    })
    observer.observe(document.body)

    let frameId: number

    const raf = (time: number) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])
}
