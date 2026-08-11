import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { events, type EventItem } from '../EventsData'
import { useEventsTransition } from '../EventsTransitionContext'

type GalleryTile = EventItem

interface EventsGalleryProps {
  tiles?: GalleryTile[]
}

const getTileStyle = (distance: number) => {
  if (distance === 0) return { grow: 746, overlay: 0 }
  if (distance === 1) return { grow: 177, overlay: 0.5 }
  if (distance === 2) return { grow: 177, overlay: 0.6 }
  return { grow: 137, overlay: 0.75 }
}

const Section = styled.section`
  width: 100%;
  container-type: inline-size;
`

// Grid 0fr/1fr collapse trick. This wrapper must have exactly one direct
// child (CollapseInner below) for grid-template-rows to size the whole
// group together, so GalleryRow, ScrollHint, and EventInfo shrink and
// fade as one unit instead of only the first child collapsing.
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

const GalleryRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: clamp(220px, 28.588cqw, 560px);

  @media (max-width: 767px) {
    height: clamp(280px, 90cqw, 420px);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const Tile = styled.div<{ $grow: number; $featured?: boolean }>`
  position: relative;
  flex: ${(props) => props.$grow} 1 0;
  min-width: 0;
  overflow: hidden;
  border: 0.5px solid #ffffff;
  cursor: pointer;
  transition: flex 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 767px) {
    flex: none;
    width: ${(props) => (props.$featured ? '85%' : '38%')};
    scroll-snap-align: center;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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

const defaultTiles: GalleryTile[] = events

const FLIP_DURATION_MS = 600
const FLIP_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'

const EventsGallery = ({ tiles: initialTiles = defaultTiles }: EventsGalleryProps) => {
  const [tiles, setTiles] = useState<GalleryTile[]>(initialTiles)
  const [isCenterArmed, setIsCenterArmed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const transition = useEventsTransition()
  const centerIndex = Math.floor(tiles.length / 2)
  const activeTile = tiles[centerIndex]

  // A detail page is open whenever the URL is /events/:id rather than
  // bare /events. Deriving this from location (instead of local state)
  // keeps the gallery correctly expanded/collapsed in both directions,
  // opening a detail and closing it back to the plain gallery, without
  // needing a separate reset callback.
  const isDetailOpen = /^\/events\/.+/.test(location.pathname)

  const tileRefs = useRef(new Map<string, HTMLDivElement>())
  const firstRects = useRef<Record<string, DOMRect>>({})
  const rowRef = useRef<HTMLDivElement>(null)

  const setTileRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) tileRefs.current.set(id, el)
    else tileRefs.current.delete(id)
  }

  const captureFirstRects = () => {
    const rects: Record<string, DOMRect> = {}
    tileRefs.current.forEach((el, id) => {
      rects[id] = el.getBoundingClientRect()
    })
    firstRects.current = rects
  }

  useLayoutEffect(() => {
    const rowWidth = rowRef.current?.getBoundingClientRect().width ?? 0
    const wrapThreshold = rowWidth * 0.6
    const wrapEntryDistance = 160

    tileRefs.current.forEach((el, id) => {
      const first = firstRects.current[id]
      if (!first) return

      const last = el.getBoundingClientRect()
      const rawDeltaX = first.left - last.left

      if (Math.abs(rawDeltaX) < 1) return

      // A tile crossing the array boundary (e.g. jumping from the last
      // slot to the first) measures a huge literal distance since it's
      // "teleporting" across the whole strip. Cap it to a short hop off
      // the edge, in the same direction, so it reads as entering from
      // that side rather than flying across the screen.
      const isWrap = Math.abs(rawDeltaX) > wrapThreshold
      const deltaX = isWrap ? Math.sign(rawDeltaX) * wrapEntryDistance : rawDeltaX

      el.style.transition = 'none'
      el.style.transform = `translateX(${deltaX}px)`

      // Force layout so the browser registers the starting position
      // before the transition below is allowed to run.
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.getBoundingClientRect()

      requestAnimationFrame(() => {
        el.style.transition = `transform ${FLIP_DURATION_MS}ms ${FLIP_EASING}, flex ${FLIP_DURATION_MS}ms ${FLIP_EASING}`
        el.style.transform = 'translateX(0)'
      })

      window.setTimeout(() => {
        el.style.transition = ''
        el.style.transform = ''
      }, FLIP_DURATION_MS + 50)
    })

    firstRects.current = {}
  }, [tiles])

  const handleTileClick = (index: number) => {
    if (index === centerIndex) {
      if (isCenterArmed) {
        const tile = tiles[index]
        const el = tileRefs.current.get(tile.id)

        if (transition && el) {
          transition.startTransition({
            src: tile.image,
            alt: tile.alt,
            from: el.getBoundingClientRect(),
          })
        }

        navigate(`/events/${tile.id}`)
      } else {
        setIsCenterArmed(true)
      }
      return
    }

    captureFirstRects()

    const len = tiles.length
    const offset = (((index - centerIndex) % len) + len) % len

    setTiles((prev) => prev.map((_, i) => prev[(i + offset) % len]))
    setIsCenterArmed(true)
  }

  return (
    <Section data-testid='events-gallery'>
      <CollapsibleContent $collapsed={isDetailOpen}>
        <CollapseInner>
          <GalleryRow ref={rowRef}>
            {tiles.map((tile, index) => {
              const distance = Math.abs(index - centerIndex)
              const { grow, overlay } = getTileStyle(distance)
              const featured = index === centerIndex

              return (
                <Tile
                  key={tile.id}
                  ref={setTileRef(tile.id)}
                  $grow={grow}
                  $featured={featured}
                  onClick={() => handleTileClick(index)}
                >
                  <TileImage src={tile.image} alt={tile.alt} />
                  {overlay > 0 && <TileOverlay $opacity={overlay} />}
                </Tile>
              )
            })}
          </GalleryRow>

          <ScrollHint>
            {tiles.map((tile, index) => (
              <ScrollDot key={tile.id} $active={index === centerIndex} />
            ))}
          </ScrollHint>

          <EventInfo>
            <EventTitle className='secondaryTitle'>{activeTile.title}</EventTitle>
            <EventMeta $hasLocation={Boolean(activeTile.location)}>
              <EventDate className='primaryTextSmall'>{activeTile.date}</EventDate>
              {activeTile.location && (
                <EventLocation className='primaryTextSmall'>{activeTile.location}</EventLocation>
              )}
            </EventMeta>
          </EventInfo>
        </CollapseInner>
      </CollapsibleContent>
    </Section>
  )
}

export default EventsGallery
