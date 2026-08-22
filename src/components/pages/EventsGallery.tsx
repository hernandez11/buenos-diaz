import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { events, isUpcoming, type EventItem } from '../EventsData'
import { bodySm, color, titleMd } from '@/theme'
import { SlideReveal } from '@/components/SlideReveal'
import { useMediaQuery } from '@/components/useMediaQuery'

const FLIP_DURATION_MS = 600
const FLIP_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'
const FADE_OUT_MS = 350
const ENTER_DURATION_MS = 1400
const ENTER_DELAY_MS = 600
const ENTER_STAGGER_MS = 30
const ENTER_EASING = 'cubic-bezier(0.19, 1, 0.22, 1)'

const BUFFER_COPIES = 7
const N = events.length
const TOTAL_V = N * BUFFER_COPIES
const START_CENTER = Math.floor(BUFFER_COPIES / 2) * N + Math.floor(N / 2)

const centerForId = (id: string | null) => {
  if (!id) return START_CENTER
  const index = events.findIndex((event) => event.id === id)
  return index >= 0 ? Math.floor(BUFFER_COPIES / 2) * N + index : START_CENTER
}
const SAFE_MIN = N * 2
const SAFE_MAX = TOTAL_V - N * 2
const THIN_WIDTH = 6.5

const CAROUSEL_H =
  'min(clamp(400px, 63.4cqw, 570px), 66dvh)'

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

const MobileSection = styled.section`
  width: 100%;
  flex: 1 0 auto;
  container-type: inline-size;
  padding: 8rem 1.5rem 7rem;
  box-sizing: border-box;
`

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1rem;
  row-gap: 2.25rem;
`

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  min-width: 0;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
`

const CardIndex = styled.span`
  ${bodySm};
  font-weight: 300;
  color: ${color.ink};
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding-bottom: 0.5rem;
`

const IndexDot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${color.accent};
`

const CardFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
`

const CardImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const CardMeta = styled.div`
  ${bodySm};
  font-weight: 300;
  color: ${color.ink};
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 0.6rem;
`

const CardSoon = styled.span`
  color: ${color.accent};
  text-transform: uppercase;
  white-space: nowrap;
`

const CardTitle = styled.h3`
  ${bodySm};
  font-weight: 500;
  text-transform: uppercase;
  color: ${color.ink};
  padding-top: 0.15rem;
`

const Section = styled.section<{ $pinned: boolean }>`
  width: 100%;
  container-type: inline-size;
  position: relative;
  flex: 1 0 auto;
  min-height: calc(${CAROUSEL_H} + clamp(220px, 14cqw, 280px));

  ${(props) =>
    props.$pinned
      ? `
    position: fixed;
    top: var(--header-h, 88px);
    left: 0;
    right: 0;
    width: 100%;
    height: calc(100vh - var(--header-h, 88px));
    height: calc(100dvh - var(--header-h, 88px));
    min-height: 0;
    z-index: 1;
  `
      : ''}

  @media (max-width: 767px) {
    min-height: calc(clamp(320px, 95cqw, 480px) + 6rem);
  }
`

const PinSpacer = styled.div`
  width: 100%;
  flex: 0 0 auto;
  height: calc(100vh - var(--header-h, 88px));
  height: calc(100dvh - var(--header-h, 88px));
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
  top: calc(50% + ${CAROUSEL_H} / 2);
  left: 0;
  width: 100%;

  @media (max-width: 767px) {
    top: calc(50% + clamp(320px, 95cqw, 480px) / 2);
  }
`

const AboveBlock = styled.div<{ $hidden: boolean }>`
  position: absolute;
  bottom: calc(50% + ${CAROUSEL_H} / 2);
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 0 25cqw 0.8cqw;
  box-sizing: border-box;
  text-align: left;
  opacity: ${(props) => (props.$hidden ? 0 : 1)};
  transition: opacity ${FADE_OUT_MS}ms ease;

  @media (max-width: 767px) {
    bottom: calc(50% + clamp(320px, 95cqw, 480px) / 2);
    padding: 0 1.5rem 0.75rem;
  }
`

const ComingSoon = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 0.65em;
  line-height: 1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: ${color.accent};
  white-space: nowrap;
`

const Viewport = styled.div`
  position: relative;
  width: 100%;
  height: ${CAROUSEL_H};
  overflow: hidden;
  contain: layout paint;

  @media (max-width: 767px) {
    height: clamp(320px, 95cqw, 480px);
  }
`

const Track = styled.div<{ $offset: number; $duration: number }>`
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  width: max-content;
  will-change: transform;
  transform: translateX(${(props) => props.$offset}cqw);
  transition: transform ${(props) => props.$duration}ms ${FLIP_EASING};
`

const Tile = styled.div<{
  $width: number
  $hidden: boolean
  $duration: number
  $interactive: boolean
}>`
  position: relative;
  box-sizing: border-box;
  flex: 0 0 ${(props) => props.$width}cqw;
  height: 100%;
  min-width: 0;
  overflow: hidden;
  border: 0.5px solid #ffffff;
  cursor: ${(props) => (props.$interactive ? 'pointer' : 'default')};
  opacity: ${(props) => (props.$hidden ? 0 : 1)};
  pointer-events: ${(props) => (props.$hidden || !props.$interactive ? 'none' : 'auto')};
  contain: paint;
  transition:
    flex-basis ${(props) => props.$duration}ms ${FLIP_EASING},
    opacity ${FADE_OUT_MS}ms ease;
`

const TileReveal = styled.div`
  position: absolute;
  inset: 0;
  transform: translate3d(0, 120%, 0);
  will-change: transform;
  animation: tile-enter ${ENTER_DURATION_MS}ms ${ENTER_EASING} var(--enter-delay, 0ms) both;

  @keyframes tile-enter {
    from {
      transform: translate3d(0, 120%, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    animation: none;
  }
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
  gap: 0.3cqw;
  padding: 0.8cqw 25cqw 0;
  text-align: left;
  opacity: ${(props) => (props.$hidden ? 0 : 1)};
  transition: opacity ${FADE_OUT_MS}ms ease;

  @media (max-width: 767px) {
    gap: 0.75rem;
    padding: 1.5rem;
  }
`

const EventTitle = styled.h3`
  ${titleMd};
  color: ${color.ink};
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
  ${bodySm};
  color: ${color.ink};
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
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isShortViewport = useMediaQuery('(max-height: 720px)')
  const [centerVirtual, setCenterVirtual] = useState(() =>
    centerForId(
      /^\/events\/.+/.test(window.location.pathname)
        ? window.location.pathname.split('/')[2]
        : null,
    ),
  )
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
    const section = sectionRef.current
    const centerBlock = centerBlockRef.current

    if (!isDetailOpen) {
      setIsLeaving(false)
      section?.style.removeProperty('height')
      section?.style.removeProperty('min-height')
      section?.style.removeProperty('flex')
      centerBlock?.style.removeProperty('top')
      centerBlock?.style.removeProperty('transform')
      return
    }

    if (!section || !centerBlock || section.style.height) return

    const sRect = section.getBoundingClientRect()
    const cRect = centerBlock.getBoundingClientRect()
    const top = cRect.top - sRect.top

    centerBlock.style.top = `${top}px`
    centerBlock.style.transform = 'none'
    section.style.minHeight = '0px'
    section.style.height = `${top + cRect.height}px`
    section.style.flex = '0 0 auto'
  }, [isDetailOpen, isMobile])

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
      if (isUpcoming(activeEvent.date)) return

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

  const pinned = !isDetailOpen && !isLeaving && !isShortViewport

  return (
    isMobile ? (
      isDetailOpen ? null : (
        <MobileSection data-testid='events-gallery'>
          <Cards>
            {events.map((event, index) => {
              const soon = isUpcoming(event.date)

              return (
                <Card
                  key={event.id}
                  to={soon ? '#' : `/events/${event.id}`}
                  onClick={soon ? (e) => e.preventDefault() : undefined}
                  aria-disabled={soon}>
                  <SlideReveal index={index % 2} duration={0.9}>
                    <CardIndex>
                      00
                      <IndexDot />
                      {String(index + 1).padStart(2, '0')}
                    </CardIndex>

                    <CardFrame>
                      <CardImage src={event.image} alt={event.alt} decoding='async' />
                    </CardFrame>

                    <CardMeta>
                      <span>{event.date}</span>
                      {soon && <CardSoon>Coming Soon</CardSoon>}
                    </CardMeta>

                    <CardTitle>{event.title}</CardTitle>
                  </SlideReveal>
                </Card>
              )
            })}
          </Cards>
        </MobileSection>
      )
    ) : (
    <>
    {pinned && <PinSpacer />}
    <Section ref={sectionRef} $pinned={pinned} data-testid='events-gallery'>
      <CenterBlock ref={centerBlockRef}>
        {isUpcoming(activeEvent.date) && (
          <AboveBlock $hidden={fadeOthers}>
            <SlideReveal key={`soon-${activeEvent.id}`} delay={0} duration={0.9}>
              <ComingSoon>Coming Soon</ComingSoon>
            </SlideReveal>
          </AboveBlock>
        )}

        <Viewport>
          <Track ref={trackRef} $offset={trackOffsetCqw} $duration={FLIP_DURATION_MS}>
            {virtualSlots.map(({ key, event, v }) => {
              const distance = Math.abs(v - centerVirtual)
              const width = widthForDistance(distance)
              const overlay = overlayForDistance(distance)
              const isCenter = v === centerVirtual
              const tileInteractive = !isDetailOpen && !(isCenter && isUpcoming(event.date))

              return (
                <Tile
                  key={key}
                  ref={getTileRef(v)}
                  $width={width}
                  $duration={FLIP_DURATION_MS}
                  $hidden={fadeOthers && !isCenter}
                  $interactive={tileInteractive}
                  role={tileInteractive ? 'button' : undefined}
                  tabIndex={tileInteractive ? 0 : undefined}
                  onClick={tileInteractive ? () => handleTileClick(v) : undefined}
                >
                  <TileReveal
                    style={
                      {
                        '--enter-delay': `${ENTER_DELAY_MS + distance * ENTER_STAGGER_MS}ms`,
                      } as React.CSSProperties
                    }
                  >
                    <TileImage
                      src={event.image}
                      alt={event.alt}
                      decoding='async'
                      draggable={false}
                    />
                    <TileOverlay ref={getOverlayRef(v)} $opacity={overlay} />
                  </TileReveal>
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
          <SlideReveal key={`date-${activeEvent.id}`} delay={0} duration={0.9}>
            <EventDate className='primaryTextSmall'>{activeEvent.date}</EventDate>
          </SlideReveal>
          <SlideReveal key={`title-${activeEvent.id}`} delay={0.08} duration={0.9}>
            <EventTitle>{activeEvent.title}</EventTitle>
          </SlideReveal>
        </EventInfo>
      </BelowBlock>
    </Section>
    </>
    )
  )
}

export default EventsGallery
