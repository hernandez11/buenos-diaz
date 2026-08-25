import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useVisualZoom } from '@/components/useVisualZoom'

const BLANK_CURSOR =
  'url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7") 0 0, none'

const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [tabindex]'
const BASE_COLOR = '#8fa9a0'
const HOVER_COLOR = '#5f7a71'
const BASE_SIZE = 10
const HOVER_SIZE = 20
const GROW_MS = 2000
const LERP = 1

const Dot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${BASE_SIZE}px;
  height: ${BASE_SIZE}px;
  margin-left: ${-BASE_SIZE / 2}px;
  margin-top: ${-BASE_SIZE / 2}px;
  border-radius: 50%;
  background-color: #8fa9a0;
  opacity: 0;
  pointer-events: none;
  z-index: 9999;
  will-change: transform, width, height;
  transition:
    background-color ${GROW_MS}ms cubic-bezier(0.22, 1, 0.36, 1),
    width ${GROW_MS}ms cubic-bezier(0.22, 1, 0.36, 1),
    height ${GROW_MS}ms cubic-bezier(0.22, 1, 0.36, 1),
    margin ${GROW_MS}ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.2s ease;

  @media (hover: none), (pointer: coarse) {
    display: none;
  }
`

export const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })
  const location = useLocation()
  const zoomed = useVisualZoom()

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('cursor', BLANK_CURSOR, 'important')

    const raf = requestAnimationFrame(() => {
      root.style.removeProperty('cursor')
    })

    return () => cancelAnimationFrame(raf)
  }, [location.pathname])

  useEffect(() => {
    const el = dotRef.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      el.style.opacity = '1'
    }

    const handleOver = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement)?.closest?.(HOVER_SELECTOR)
      const size = hit ? HOVER_SIZE : BASE_SIZE
      el.style.width = `${size}px`
      el.style.height = `${size}px`
      el.style.marginLeft = `${-size / 2}px`
      el.style.marginTop = `${-size / 2}px`
      el.style.backgroundColor = hit ? HOVER_COLOR : BASE_COLOR
    }

    const handleLeave = () => {
      el.style.opacity = '0'
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseleave', handleLeave)

    let frame: number
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * LERP
      current.current.y += (target.current.y - current.current.y) * LERP
      el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseleave', handleLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <Dot ref={dotRef} style={zoomed ? { display: 'none' } : undefined} />
}

export default Cursor
