import { useEffect, useState } from 'react'

export const ZOOM_THRESHOLD = 1.02

export const useVisualZoom = () => {
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    const viewport = window.visualViewport
    if (!viewport) return

    const update = () => {
      const next = viewport.scale > ZOOM_THRESHOLD
      setZoomed((prev) => (prev === next ? prev : next))
      document.documentElement.classList.toggle('is-zoomed', next)
    }

    update()
    viewport.addEventListener('resize', update)

    return () => {
      viewport.removeEventListener('resize', update)
      document.documentElement.classList.remove('is-zoomed')
    }
  }, [])

  return zoomed
}

export default useVisualZoom
