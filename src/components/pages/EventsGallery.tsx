import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { events, type EventItem } from '../EventsData'
import { useEventsTransition } from '../EventsTransitionContext'

const FLIP_DURATION_MS = 600
const FLIP_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'

const BUFFER_COPIES = 7
const N = events.length
const TOTAL_V = N * BUFFER_COPIES
const START_CENTER = Math.floor(BUFFER_COPIES / 2) * N + Math.floor(N / 2)

const RESET_MARGIN = N * 2

const widthForDistance = (distance: number) => {
  if (distance === 0) return 54
  if (distance === 1) return 14
  if (distance === 2) return 10
  return 6.5
}

const overlayForDistance = (distance: number) => {
  if (distance === 0) return 0
  if (distance === 1) return 0.5
  if (distance === 2) return 0.6
  return 0.75
}

const Section = styled.section`
  width: 100%;
  container-type: inline-size;
`

const CollapsibleContent = styled.div<{ $collapsed: boolean }>`
  display: grid;
  grid-template-rows: ${(props) => (props.$collapsed ? '0fr' : '1fr')};
  opacity: ${(props) => (props.$collapsed ? 0 : 1)};
  transition:
    grid-template-rows 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.4s ease;
`

const CollapseInner = styled.div`
  overflow: hidden;
  min-height: 0;
  display: flex;
  flex-direction: column;
`

const Viewport = styled.div`
  position: relative;
  width: 100%;
  height: clamp(220px, 28.588cqw, 560px);
  overflow: hidden;
  contain: layout paint;

  @media (max-width: 767px) {
    height: clamp(280px, 90cqw, 420px);
  }
`

const Track = styled.div<{ $offset: number; $suppress: boolean }>`
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  width: max-content;
  will-change: transform;
  transform: translateX(${(props) => props.$offset}cqw);
  transition: ${(props) =>
    props.$suppress ? 'none' : `transform ${FLIP_DURATION_MS}ms ${FLIP_EASING}`};

  ${(props) =>
    props.$suppress &&
    `
    & > * {
      transition: none !important;
    }
  `}
`

const Tile = styled.div<{ $width: number }>`
  position: relative;
  flex: 0 0 ${(props) => props.$width}cqw;
  height: 100%;
  min-width: 0;
  overflow: hidden;
  border: 0.5px solid #ffffff;
  cursor: pointer;
  transition: flex-basis ${FLIP_DURATION_MS}ms ${FLIP_EASING};
`

const TileImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.5s ease;

  ${Tile}:hover & {
    transform: scale(1.06);
  }
`

const TileOverlay = styled.div<{ $opacity: number }>`
  position: absolute;
  inset: 0;
  background-color: rgb(30, 30, 30);
  opacity: ${(props) => props.$opacity};
  pointer-events: none;
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  ${Tile}:hover & {
    opacity: 0;
  }

  @media (max-width: 767px) {
    opacity: ${(props) => Math.min(props.$opacity, 0.35)};
  }
`

const ScrollHint = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: flex;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 0.75rem;
  }
`

const ScrollDot = styled.span<{ $active?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #1e1e1e;
  opacity: ${(props) => (props.$active ? 1 : 0.25)};
`

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2cqw;
  padding: 2.8cqw 4cqw;
  text-align: center;

  @media (max-width: 767px) {
    gap: 0.75rem;
    padding: 2rem 1.5rem;
  }
`

const EventTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: clamp(14px, 1.443cqw, 20px);
  letter-spacing: -0.04em;
  color: #1e1e1e;
  margin: 0;
  text-transform: uppercase;
`

const EventMeta = styled.div<{ $hasLocation: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${(props) => (props.$hasLocation ? 'space-between' : 'center')};
  width: 43.17cqw;
  min-width: 280px;
  gap: 1rem 2cqw;

  @media (max-width: 767px) {
    width: 100%;
    min-width: 0;
    justify-content: center;
    gap: 0.5rem;
  }
`

const EventDate = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(12px, 1.082cqw, 15px);
  letter-spacing: -0.04em;
  color: #1e1e1e;
  white-space: nowrap;
`

const EventLocation = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(12px, 1.082cqw, 15px);
  letter-spacing: -0.04em;
  color: #1e1e1e;
  white-space: nowrap;
`

const EventsGallery = () => {
  const [centerVirtual, setCenterVirtual] = useState(START_CENTER)
  const [isCenterArmed, setIsCenterArmed] = useState(false)
  const [suppressTransition, setSuppressTransition] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const transition = useEventsTransition()

  const isDetailOpen = /^\/events\/.+/.test(location.pathname)

  const tileRefs = useRef(new Map<number, HTMLDivElement>())
  const refCallbacks = useRef(new Map<number, (el: HTMLDivElement | null) => void>())
  const getTileRef = (v: number) => {
    let cb = refCallbacks.current.get(v)
    if (!cb) {
      cb = (el) => {
        if (el) tileRefs.current.set(v, el)
        else tileRefs.current.delete(v)
      }
      refCallbacks.current.set(v, cb)
    }
    return cb
  }

  const virtualSlots = useMemo(() => {
    const slots: { key: string; event: EventItem; v: number }[] = []
    for (let copy = 0; copy < BUFFER_COPIES; copy++) {
      for (let i = 0; i < N; i++) {
        slots.push({ key: `${copy}-${events[i].id}`, event: events[i], v: copy * N + i })
      }
    }
    return slots
  }, [])

  const activeEvent: EventItem = events[((centerVirtual % N) + N) % N]

  const centerRef = useRef(centerVirtual)
  const lastMoveTs = useRef(0)
  useEffect(() => {
    centerRef.current = centerVirtual
  }, [centerVirtual])

  useEffect(() => {
    if (!suppressTransition) return
    let raf2: number
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setSuppressTransition(false))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [suppressTransition])

  useEffect(() => {
    let cancelled = false
    let timer: number

    const check = () => {
      const idleFor = Date.now() - lastMoveTs.current
      if (idleFor >= FLIP_DURATION_MS + 50) {
        const v = centerRef.current
        if (v < RESET_MARGIN) {
          setSuppressTransition(true)
          setCenterVirtual(v + N)
        } else if (v > TOTAL_V - RESET_MARGIN) {
          setSuppressTransition(true)
          setCenterVirtual(v - N)
        }
      }
      if (!cancelled) timer = window.setTimeout(check, 100)
    }

    timer = window.setTimeout(check, FLIP_DURATION_MS + 50)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  const trackOffsetCqw = useMemo(() => {
    let before = 0
    for (let v = 0; v < centerVirtual; v++) {
      before += widthForDistance(Math.abs(v - centerVirtual))
    }
    return 50 - before - widthForDistance(0) / 2
  }, [centerVirtual])

  const handleTileClick = (v: number) => {
    if (v === centerVirtual) {
      if (isCenterArmed) {
        const el = tileRefs.current.get(v)

        if (transition && el) {
          transition.startTransition({
            src: activeEvent.image,
            alt: activeEvent.alt,
            from: el.getBoundingClientRect(),
          })
        }

        navigate(`/events/${activeEvent.id}`)
      } else {
        setIsCenterArmed(true)
      }
      return
    }

    lastMoveTs.current = Date.now()
    setCenterVirtual(v)
    setIsCenterArmed(true)
  }

  return (
    <Section data-testid='events-gallery'>
      <CollapsibleContent $collapsed={isDetailOpen}>
        <CollapseInner>
          <Viewport>
            <Track $offset={trackOffsetCqw} $suppress={suppressTransition}>
              {virtualSlots.map(({ key, event, v }) => {
                const distance = Math.abs(v - centerVirtual)
                const width = widthForDistance(distance)
                const overlay = overlayForDistance(distance)

                return (
                  <Tile
                    key={key}
                    ref={getTileRef(v)}
                    $width={width}
                    role='button'
                    tabIndex={0}
                    onClick={() => handleTileClick(v)}
                  >
                    <TileImage src={event.image} alt={event.alt} />
                    {overlay > 0 && <TileOverlay $opacity={overlay} />}
                  </Tile>
                )
              })}
            </Track>
          </Viewport>

          <ScrollHint>
            {events.map((event, i) => (
              <ScrollDot key={event.id} $active={i === ((centerVirtual % N) + N) % N} />
            ))}
          </ScrollHint>

          <EventInfo>
            <EventTitle className='secondaryTitle'>{activeEvent.title}</EventTitle>
            <EventMeta $hasLocation={Boolean(activeEvent.location)}>
              <EventDate className='primaryTextSmall'>{activeEvent.date}</EventDate>
              {activeEvent.location && (
                <EventLocation className='primaryTextSmall'>{activeEvent.location}</EventLocation>
              )}
            </EventMeta>
          </EventInfo>
        </CollapseInner>
      </CollapsibleContent>
    </Section>
  )
}

export default EventsGallery
