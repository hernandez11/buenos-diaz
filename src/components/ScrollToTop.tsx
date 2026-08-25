import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { getLenis } from '@/components/useLenis'

export const ScrollToTop = () => {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return

    const lenis = getLenis()

    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }, [pathname, navigationType])

  return null
}

export default ScrollToTop
