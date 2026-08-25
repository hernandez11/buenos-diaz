import { useEffect, useState, type MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { color, font, media, titleMd, tracking } from '@/theme'
import { getLenis } from '@/components/useLenis'

const LOGO_RATIO = 3956 / 1218

const StyledHeader = styled.header<{ $hidden: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transform: ${(props) => (props.$hidden ? 'translateY(-100%)' : 'translateY(0)')};
  transition: transform 1.5s cubic-bezier(0.22, 1, 0.36, 1);
  width: 100%;
  box-sizing: border-box;
  container-type: inline-size;
  background-color: transparent;
  height: var(--header-h, 88px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4.7cqw;

  ${media.mobile} {
    padding: 0 1.5rem;
  }
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 0 0 auto;
  text-decoration: none;
`

const LogoSlot = styled.span`
  display: block;
  width: clamp(120px, 11cqw, 190px);
  aspect-ratio: ${LOGO_RATIO};
`

const MenuButton = styled.button`
  display: block;
  flex: 0 0 auto;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2;
  font-family: ${font.sans};
  font-weight: 500;
  font-size: clamp(11px, 0.868cqw, 15px);
  line-height: 1.3;
  letter-spacing: ${tracking.tight};
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--nav-color, ${color.ink});
  transition: color 0.3s ease;

  ${media.mobile} {
    font-size: 0.8em;
  }
`

const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 80;
  display: block;
  background: transparent;
  pointer-events: ${(props) => (props.$open ? 'auto' : 'none')};
`

const Dropdown = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 90;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-sizing: border-box;
  padding: calc(var(--header-h, 88px) + 1.5rem) 4.7vw 1.75rem;
  background-color: rgba(255, 253, 250, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 0.8px solid rgba(30, 30, 30, 0.2);
  opacity: ${(props) => (props.$open ? 1 : 0)};
  pointer-events: ${(props) => (props.$open ? 'auto' : 'none')};
  transition: opacity 0.5s ease-in-out;

  ${media.mobile} {
    padding: calc(var(--header-h, 64px) + 1.5rem) 1.5rem 1.75rem;
  }
`

const OverlayLink = styled(Link)`
  ${titleMd};
  color: var(--nav-color, ${color.ink});
  text-decoration: none;
  text-transform: uppercase;
  padding-bottom: 0.9rem;
  transition: color 0.3s ease;
  -webkit-tap-highlight-color: transparent;

  &:last-child {
    padding-bottom: 0;
  }
`

const SCROLL_TOLERANCE = 6

export const Header = () => {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToContact = () => {
    const target = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    const lenis = getLenis()

    if (lenis) lenis.scrollTo(target, { duration: 1.8 })
    else window.scrollTo({ top: target, behavior: 'smooth' })
  }

  const handleContact = (event: MouseEvent) => {
    event.preventDefault()
    setOpen(false)

    if (location.pathname === '/') {
      scrollToContact()
      return
    }

    navigate('/')
    window.setTimeout(scrollToContact, 120)
  }

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY

      if (Math.abs(delta) < SCROLL_TOLERANCE) return
      lastY = y

      if (y <= 0) {
        setHidden(false)
        return
      }

      setHidden(delta > 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) setHidden(false)
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <StyledHeader $hidden={hidden && !open} data-testid='header'>
        <LogoLink to='/' aria-label='Buenos Díaz'>
          <LogoSlot data-logo-slot='header' />
        </LogoLink>

        <MenuButton
          type='button'
          aria-expanded={open}
          aria-controls='primary-navigation'
          onClick={(event) => {
            event.preventDefault()
            setOpen((value) => !value)
          }}
        >
          {open ? 'Close' : 'Menu'}
        </MenuButton>
      </StyledHeader>

      <Backdrop $open={open} onClick={() => setOpen(false)} />

      <Dropdown $open={open} id='primary-navigation'>
        <OverlayLink to='/'>Home</OverlayLink>
        <OverlayLink to='/events'>Events</OverlayLink>
        <OverlayLink to='/faq'>FAQ</OverlayLink>
        <OverlayLink to='/' onClick={handleContact}>
          Contact
        </OverlayLink>
      </Dropdown>
    </>
  )
}

export default Header
