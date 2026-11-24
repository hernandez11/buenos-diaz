import type { MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getLenis } from '@/components/useLenis'

const SETTLE_MS = 120

const scrollToContact = () => {
  const target = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  const lenis = getLenis()

  if (lenis) lenis.scrollTo(target, { duration: 1.8 })
  else window.scrollTo({ top: target, behavior: 'smooth' })
}

export const useContactLink = (beforeNavigate?: () => void) => {
  const location = useLocation()
  const navigate = useNavigate()

  return (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    beforeNavigate?.()

    if (location.pathname === '/') {
      scrollToContact()
      return
    }

    navigate('/')
    window.setTimeout(scrollToContact, SETTLE_MS)
  }
}

export default useContactLink
