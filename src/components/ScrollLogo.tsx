import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import PrimaryLogo from '@/assets/PrimaryLogo.png'

const LOGO_RATIO = 3956 / 1218

const Floating = styled.div`
  position: fixed;
  z-index: 101;
  pointer-events: none;
  will-change: transform, width;
  opacity: 0;
`

const Layer = styled.img<{ $light?: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  ${(props) => (props.$light ? 'filter: brightness(0) invert(1);' : '')}
`

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const NAV_FADE_BAND = 70
const NAV_LIGHT = 255
const NAV_DARK = 30

const setNavTone = (t: number) => {
  const channel = Math.round(lerp(NAV_LIGHT, NAV_DARK, t))
  document.documentElement.style.setProperty(
    '--nav-color',
    `rgb(${channel}, ${channel}, ${channel})`,
  )
}

export const ScrollLogo = () => {
  const boxRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLImageElement>(null)
  const darkRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const box = boxRef.current
    const light = lightRef.current
    const dark = darkRef.current
    if (!box || !light || !dark) return

    let frame: number

    const tick = () => {
      const headerSlot = document.querySelector<HTMLElement>('[data-logo-slot="header"]')

      if (!headerSlot) {
        box.style.opacity = '0'
        setNavTone(1)
        frame = requestAnimationFrame(tick)
        return
      }

      const headerRect = headerSlot.getBoundingClientRect()
      const heroSlot = document.querySelector<HTMLElement>('[data-logo-slot="hero"]')
      const heroSection = document.querySelector<HTMLElement>('[data-testid="hero"]')
      const heroRect = heroSlot?.getBoundingClientRect()

      let left = headerRect.left
      let top = headerRect.top
      let width = headerRect.width
      let progress = 1

      let tone = 1

      if (heroSection) {
        const bottom = heroSection.getBoundingClientRect().bottom
        const overlap = (headerRect.bottom + NAV_FADE_BAND - bottom) / NAV_FADE_BAND
        tone = Math.min(Math.max(overlap, 0), 1)
      }

      setNavTone(tone)

      if (heroSlot && heroRect && heroRect.width > 0 && heroSection) {
        const sectionRect = heroSection.getBoundingClientRect()
        const travel = Math.max(sectionRect.height - headerRect.bottom, 1)
        const scrolled = Math.max(-sectionRect.top, 0)
        progress = Math.min(Math.max(scrolled / travel, 0), 1)

        const heroRestTop = heroRect.top + scrolled
        const heroRestLeft = heroRect.left

        left = lerp(heroRestLeft, headerRect.left, progress)
        top = lerp(heroRestTop, headerRect.top, progress)
        width = lerp(heroRect.width, headerRect.width, progress)
      }

      box.style.opacity = '1'
      box.style.width = `${width}px`
      box.style.height = `${width / LOGO_RATIO}px`
      box.style.transform = `translate3d(${left}px, ${top}px, 0)`

      light.style.opacity = `${1 - tone}`
      dark.style.opacity = `${tone}`

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <Floating ref={boxRef} aria-hidden='true'>
      <Layer ref={lightRef} src={PrimaryLogo} alt='' $light />
      <Layer ref={darkRef} src={PrimaryLogo} alt='' style={{ opacity: 0 }} />
    </Floating>
  )
}

export default ScrollLogo
