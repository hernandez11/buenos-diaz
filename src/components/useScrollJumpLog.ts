import { useEffect } from 'react'

export const useScrollJumpLog = () => {
  useEffect(() => {
    if (!import.meta.env.DEV) return

    let last = window.scrollY
    let lastDoc = document.documentElement.scrollHeight
    let lastW = window.innerWidth
    let resizing = false
    let timer = 0

    const onScroll = () => {
      const y = window.scrollY
      const doc = document.documentElement.scrollHeight
      const maxScroll = doc - window.innerHeight

      if (Math.abs(y - last) > 120) {
        console.log(
          '[jump]',
          `${Math.round(last)} -> ${Math.round(y)}`,
          '| docH', lastDoc, '->', doc,
          '| maxScroll', Math.round(maxScroll),
          '| atBottom', Math.abs(y - maxScroll) < 4,
          '| width', lastW, '->', window.innerWidth,
          '| duringResize', resizing,
        )
      }

      last = y
      lastDoc = doc
      lastW = window.innerWidth
    }

    const onResize = () => {
      resizing = true
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        resizing = false
      }, 300)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    console.log('[jump] scroll diagnostic active')

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.clearTimeout(timer)
    }
  }, [])
}

export default useScrollJumpLog
