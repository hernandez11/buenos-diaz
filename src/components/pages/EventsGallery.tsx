import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { events, type EventItem } from '../EventsData'

const FLIP_DURATION_MS = 600
const FLIP_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'
const FADE_OUT_MS = 350

const BUFFER_COPIES = 7
const N = events.length
const TOTAL_V = N * BUFFER_COPIES
const START_CENTER = Math.floor(BUFFER_COPIES / 2) * N + Math.floor(N / 2)
const SAFE_MIN = N * 2
const SAFE_MAX = TOTAL_V - N * 2
const THIN_WIDTH = 6.5

const widthForDistance = (distance: number) => {
  if (distance === 0) return 50
  if (distance === 1) return 10
  if (distance === 2) return 9
  if (distance === 3) return 5
  return THIN_WIDTH
}

const overlayForDistance = (distance: number) => {
  if (distance === 0) return 0
  if (distance === 1) return 0.5
  if (distance === 2) return 0.6
  if (distance === 3) return 0.7
  return 0.75
}

const Section = styled.section`
  width: 100%;
  container-type: inline-size;
  position: relative;
  flex: 1 0 auto;
  min-height: calc(clamp(260px, 33cqw, 640px) + 12cqw);

  @media (max-width: 767px) {
    min-height: calc(clamp(320px, 95cqw, 480px) + 6rem);
  }
`

const CenterBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
`

const BelowBlock = styled.div`
  position: absolute;
  top: calc(50% + clamp(260px, 33cqw, 640px) / 2);
  left: 0;
  width: 100%;

  @media (max-width: 767px) {
    top: calc(50% + clamp(320px, 95cqw, 480px) / 2);
  }
`

const Viewport = styled.div`
  position: relative;
  width: 100%;
  height: clamp(260px, 33cqw, 640px);
  overflow: hidden;
  contain: layout paint;

  @media (max-width: 767px) {
    height: clamp(320px, 95cqw, 480px);
  }
`

const Track = styled.div<{ $offset: number }>`
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  width: max-content;
  will-change: transform;
  transform: translateX(${(props) => props.$offset}cqw);
  transition: transform ${FLIP_DURATION_MS}ms ${FLIP_EASING};
`

const Tile = styled.div<{ $width: number; $hidden: boolean }>`
  position: relative;
  box-sizing: border-box;
  flex: 0 0 ${(props) => props.$width}cqw;
  height: 100%;
  min-width: 0;
  overflow: hidden;
  border: 0.5px solid #ffffff;
  cursor: pointer;
  opacity: ${(props) => (props.$hidden ? 0 : 1)};
  pointer-events: ${(props) => (props.$hidden ? 'none' : 'auto')};
  transition:
    flex-basis ${FLIP_DURATION_MS}ms ${FLIP_EASING},
    opacity ${FADE_OUT_MS}ms ease;
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
  transition: opacity ${FLIP_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1);

  ${Tile}:hover & {
    opacity: 0;
  }

  @media (max-width: 767px) {
    opacity: ${(props) => Math.min(props.$opacity, 0.35)};
  }
`

const ScrollHint = styled.div<{ $hidden: boolean }>`
  display: none;

  @media (max-width: 767px) {
    display: flex;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 0.75rem;
    opacity: ${(props) => (props.$hidden ? 0 : 1)};
    transition: opacity ${FADE_OUT_MS}ms ease;
  }
`

const ScrollDot = styled.span<{ $active?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #1e1e1e;
  opacity: ${(props) => (props.$active ? 1 : 0.25)};
`

const EventInfo = styled.div<{ $hidden: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2cqw;
  padding: 1.8cqw 25cqw 0;
  text-align: left;
  opacity: ${(props) => (props.$hidden ? 0 : 1)};
  transition: opacity ${FADE_OUT_MS}ms ease;

  @media (max-width: 767px) {
    gap: 0.75rem;
    padding: 1.5rem;
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
  justify-content: ${(props) => (props.$hasLocation ? 'space-between' : 'flex-start')};
  width: 100%;
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
  const [isLeaving, setIsLeaving] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const isDetailOpen = /^\/events\/.+/.test(location.pathname)
  const detailId = isDetailOpen ? location.pathname.split('/')[2] : null
  const fadeOthers = isLeaving || isDetailOpen

  const sectionRef = useRef<HTMLElement>(null)
  const centerBlockRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const tileRefs = useRef(new Map<number, HTMLDivElement>())
  const overlayRefs = useRef(new Map<number, HTMLDivElement>())
  const tileRefCallbacks = useRef(new Map<number, (node: HTMLDivElement | null) => void>())
  const overlayRefCallbacks = useRef(new Map<number, (node: HTMLDivElement | null) => void>())
  const pendingUnfreeze = useRef(false)
  const leaveTimer = useRef<number | undefined>(undefined)

  const getTileRef = (v: number) => {
    let cb = tileRefCallbacks.current.get(v)
    if (!cb) {
      cb = (el) => {
        if (el) tileRefs.current.set(v, el)
        else tileRefs.current.delete(v)
      }
      tileRefCallbacks.current.set(v, cb)
    }
    return cb
  }

  const getOverlayRef = (v: number) => {
    let cb = overlayRefCallbacks.current.get(v)
    if (!cb) {
      cb = (el) => {
        if (el) overlayRefs.current.set(v, el)
        else overlayRefs.current.delete(v)
      }
      overlayRefCallbacks.current.set(v, cb)
    }
    return cb
  }

  const virtualSlots = useMemo(() => {
    const slots: { key: string; event: EventItem; v: number }[] = []
    for (let copy = 0; copy < BUFFER_COPIES; copy++) {
      for (let i = 0; i < N; i++) {
        slots.push({
          key: `${copy}-${events[i].id}`,
          event: events[i],
          v: copy * N + i,
        })
      }
    }
    return slots
  }, [])

  const activeEvent: EventItem = events[((centerVirtual % N) + N) % N]

  useEffect(() => {
    if (!isDetailOpen) {
      setIsLeaving(false)
      sectionRef.current?.style.removeProperty('height')
      sectionRef.current?.style.removeProperty('min-height')
      sectionRef.current?.style.removeProperty('flex')
      centerBlockRef.current?.style.removeProperty('top')
      centerBlockRef.current?.style.removeProperty('transform')
    }
  }, [isDetailOpen])

  useEffect(() => {
    if (!detailId) return
    const idx = events.findIndex((item) => item.id === detailId)
    if (idx < 0) return
    const current = ((centerVirtual % N) + N) % N
    if (current === idx) return

    const track = trackRef.current
    if (track) {
      track.style.transition = 'none'
      tileRefs.current.forEach((el) => {
        el.style.transition = 'none'
      })
      overlayRefs.current.forEach((el) => {
        el.style.transition = 'none'
      })
      pendingUnfreeze.current = true
    }

    setCenterVirtual((v) => {
      let target = v + (idx - current)
      if (target < SAFE_MIN) target += N
      if (target > SAFE_MAX) target -= N
      return target
    })
  }, [detailId])

  useEffect(() => {
    return () => window.clearTimeout(leaveTimer.current)
  }, [])

  const freezeAndShift = (shift: number) => {
    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section) return

    const pxPerCqw = section.getBoundingClientRect().width / 100
    const thinPx = THIN_WIDTH * pxPerCqw

    const widths = new Map<number, number>()
    tileRefs.current.forEach((el, v) => {
      widths.set(v, el.getBoundingClientRect().width)
    })

    const opacities = new Map<number, string>()
    overlayRefs.current.forEach((el, v) => {
      opacities.set(v, getComputedStyle(el).opacity)
    })

    const tx = new DOMMatrixReadOnly(getComputedStyle(track).transform).m41

    track.style.transition = 'none'
    track.style.transform = `translateX(${tx - shift * THIN_WIDTH * pxPerCqw}px)`

    tileRefs.current.forEach((el, v) => {
      el.style.transition = 'none'
      const source = widths.get(v - shift)
      el.style.flexBasis = `${source ?? thinPx}px`
    })

    overlayRefs.current.forEach((el, v) => {
      el.style.transition = 'none'
      const source = opacities.get(v - shift)
      el.style.opacity = source ?? '0.75'
    })

    pendingUnfreeze.current = true
  }

  useLayoutEffect(() => {
    if (!pendingUnfreeze.current) return
    pendingUnfreeze.current = false

    const track = trackRef.current
    if (!track) return

    track.getBoundingClientRect()

    const raf = requestAnimationFrame(() => {
      track.style.transition = ''
      track.style.transform = ''
      tileRefs.current.forEach((el) => {
        el.style.transition = ''
        el.style.flexBasis = ''
      })
      overlayRefs.current.forEach((el) => {
        el.style.transition = ''
        el.style.opacity = ''
      })
    })

    return () => cancelAnimationFrame(raf)
  }, [centerVirtual])

  const trackOffsetCqw = useMemo(() => {
    let before = 0
    for (let v = 0; v < centerVirtual; v++) {
      before += widthForDistance(Math.abs(v - centerVirtual))
    }
    return 50 - before - widthForDistance(0) / 2
  }, [centerVirtual])

  const handleTileClick = (v: number) => {
    if (isLeaving || isDetailOpen) return

    if (v === centerVirtual) {
      if (isCenterArmed) {
        setIsLeaving(true)

        const section = sectionRef.current
        const centerBlock = centerBlockRef.current
        if (section && centerBlock) {
          const sRect = section.getBoundingClientRect()
          const cRect = centerBlock.getBoundingClientRect()
          const top = cRect.top - sRect.top

          centerBlock.style.top = `${top}px`
          centerBlock.style.transform = 'none'
          section.style.minHeight = '0px'
          section.style.height = `${top + cRect.height}px`
          section.style.flex = '0 0 auto'
        }

        const targetEvent = activeEvent
        leaveTimer.current = window.setTimeout(() => {
          navigate(`/events/${targetEvent.id}`)
        }, FADE_OUT_MS)
      } else {
        setIsCenterArmed(true)
      }
      return
    }

    let shift = 0
    if (v < SAFE_MIN) shift = N
    else if (v > SAFE_MAX) shift = -N

    if (shift !== 0) freezeAndShift(shift)

    setCenterVirtual(v + shift)
    setIsCenterArmed(true)
  }

  return (
    <Section ref={sectionRef} data-testid='events-gallery'>
      <CenterBlock ref={centerBlockRef}>
        <Viewport>
          <Track ref={trackRef} $offset={trackOffsetCqw}>
            {virtualSlots.map(({ key, event, v }) => {
              const distance = Math.abs(v - centerVirtual)
              const width = widthForDistance(distance)
              const overlay = overlayForDistance(distance)
              const isCenter = v === centerVirtual

              return (
                <Tile
                  key={key}
                  ref={getTileRef(v)}
                  $width={width}
                  $hidden={fadeOthers && !isCenter}
                  role='button'
                  tabIndex={0}
                  onClick={() => handleTileClick(v)}
                >
                  <TileImage src={event.image} alt={event.alt} />
                  <TileOverlay ref={getOverlayRef(v)} $opacity={overlay} />
                </Tile>
              )
            })}
          </Track>
        </Viewport>
      </CenterBlock>

      <BelowBlock>
        <ScrollHint $hidden={fadeOthers}>
          {events.map((event, i) => (
            <ScrollDot key={event.id} $active={i === ((centerVirtual % N) + N) % N} />
          ))}
        </ScrollHint>

        <EventInfo $hidden={fadeOthers}>
          <EventTitle className='secondaryTitle'>{activeEvent.title}</EventTitle>
          <EventMeta $hasLocation={Boolean(activeEvent.location)}>
            <EventDate className='primaryTextSmall'>{activeEvent.date}</EventDate>
            {activeEvent.location && (
              <EventLocation className='primaryTextSmall'>{activeEvent.location}</EventLocation>
            )}
          </EventMeta>
        </EventInfo>
      </BelowBlock>
    </Section>
  )
}

export default EventsGallery
