import { useEffect } from 'react'
import { getLenis } from '@/components/useLenis'

const ANCHOR_SELECTOR = '[data-scroll-anchor]'
const GUARD_MS = 700
const INTENT_MS = 150

const disabled = () =>
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('noanchor')

export const useScrollAnchor = () => {
  useEffect(() => {
    if (disabled()) return

    let anchor: HTMLElement | null = null
    let anchorTop = 0
    let guardUntil = 0
    let intentAt = 0
    let correcting = false
    let queued = false

    const capture = () => {
      queued = false
      const nodes = document.querySelectorAll<HTMLElement>(ANCHOR_SELECTOR)
      for (const node of nodes) {
        const rect = node.getBoundingClientRect()
        if (rect.bottom > 0) {
          anchor = node
          anchorTop = rect.top
          return
        }
      }
      anchor = null
    }

    const correct = () => {
      if (!anchor || !anchor.isConnected) return
      const delta = anchor.getBoundingClientRect().top - anchorTop
      if (Math.abs(delta) < 1) return

      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const target = Math.min(Math.max(window.scrollY + delta, 0), max)

      correcting = true
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(target, { immediate: true, force: true })
      else window.scrollTo(0, target)
      requestAnimationFrame(() => {
        correcting = false
      })
    }

    const onScroll = () => {
      if (correcting) return

      const now = performance.now()
      if (now < guardUntil && now - intentAt > INTENT_MS) {
        correct()
        return
      }

      if (queued) return
      queued = true
      requestAnimationFrame(capture)
    }

    const onResize = () => {
      guardUntil = performance.now() + GUARD_MS
      requestAnimationFrame(correct)
    }

    const onIntent = () => {
      intentAt = performance.now()
    }

    capture()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('wheel', onIntent, { passive: true })
    window.addEventListener('touchmove', onIntent, { passive: true })
    window.addEventListener('keydown', onIntent)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('wheel', onIntent)
      window.removeEventListener('touchmove', onIntent)
      window.removeEventListener('keydown', onIntent)
    }
  }, [])
}

export default useScrollAnchor
