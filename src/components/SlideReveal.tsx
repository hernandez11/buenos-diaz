import { useEffect, useRef, useState, type ReactNode } from 'react'
import styled from 'styled-components'

interface SlideRevealProps {
  children: ReactNode
  index?: number
  delay?: number
  duration?: number
  className?: string
}

const Mask = styled.div`
  display: block;
  overflow: hidden;
  padding: 1px;
  margin: -1px;
`

const Inner = styled.div<{ $active: boolean; $delay: number; $duration: number }>`
  display: block;
  transform: translate3d(0, ${(props) => (props.$active ? '0' : '120%')}, 0);
  transition: transform ${(props) => props.$duration}s cubic-bezier(0.19, 1, 0.22, 1);
  transition-delay: ${(props) => props.$delay}s;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    transition: none;
  }
`

export const SlideReveal = ({
  children,
  index = 0,
  delay,
  duration = 1.4,
  className,
}: SlideRevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Mask ref={ref} className={className}>
      <Inner $active={active} $delay={delay ?? index * 0.12} $duration={duration}>
        {children}
      </Inner>
    </Mask>
  )
}

export default SlideReveal
