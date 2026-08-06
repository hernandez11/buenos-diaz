import { useState } from 'react'
import styled from 'styled-components'

interface GalleryTile {
  id: string
  image: string
  alt: string
  overlayOpacity: number
  featured?: boolean
}

interface EventDetails {
  title: string
  date: string
  location: string
}

interface EventsGalleryProps {
  tiles?: GalleryTile[]
  event?: EventDetails
  onImageClick?: (tile: GalleryTile) => void
}

const Section = styled.section`
  width: 100%;
  container-type: inline-size;
`

const GalleryRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: clamp(220px, 28.588cqw, 560px);

  @media (max-width: 767px) {
    flex-direction: column;
    height: auto;
    gap: 0.5rem;
  }
`

const Tile = styled.div<{ $grow: number; $clickable?: boolean; $featured?: boolean }>`
  position: relative;
  flex: ${(props) => props.$grow} 1 0;
  min-width: 0;
  overflow: hidden;
  border: 0.5px solid #ffffff;
  cursor: ${(props) => (props.$clickable ? 'pointer' : 'default')};

  @media (max-width: 767px) {
    flex: none;
    width: 100%;
    aspect-ratio: ${(props) => (props.$featured ? '4 / 3' : '16 / 9')};
    order: ${(props) => (props.$featured ? -1 : 0)};
  }
`

const TileImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const TileOverlay = styled.div<{ $opacity: number }>`
  position: absolute;
  inset: 0;
  background-color: rgba(30, 30, 30, ${(props) => props.$opacity});
  pointer-events: none;
`

const EventInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 2cqw 4cqw;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
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

const EventMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2cqw;

  @media (max-width: 767px) {
    gap: 0.5rem;
    flex-direction: column;
    align-items: flex-start;
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

/* Placeholder click interaction — swap this out once the redot.fr
   reference behavior is confirmed. Currently a simple full-screen
   fade-in lightbox. */
const LightboxOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: ${(props) => (props.$open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
`

const LightboxImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
`

const LightboxClose = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  cursor: pointer;
`

const defaultTiles: GalleryTile[] = [
  { id: 'tile-1', image: '', alt: '', overlayOpacity: 0.75 },
  { id: 'tile-2', image: '', alt: '', overlayOpacity: 0.6 },
  { id: 'tile-3', image: '', alt: '', overlayOpacity: 0.5 },
  {
    id: 'tile-featured',
    image: '',
    alt: 'Buenos Diaz x Obscure Coffee',
    overlayOpacity: 0,
    featured: true,
  },
  { id: 'tile-5', image: '', alt: '', overlayOpacity: 0.5 },
  { id: 'tile-6', image: '', alt: '', overlayOpacity: 0.6 },
  { id: 'tile-7', image: '', alt: '', overlayOpacity: 0.75 },
]

const tileGrow: Record<number, number> = {
  0: 137,
  1: 177,
  2: 177,
  3: 746,
  4: 177,
  5: 177,
  6: 137,
}

const defaultEvent: EventDetails = {
  title: 'Buenos Diaz x Obscure Coffee',
  date: 'Sat, Aug 15   |   10a - 3p',
  location: '259 Melrose St, Brooklyn, NY 11206',
}

const EventsGallery = ({
  tiles = defaultTiles,
  event = defaultEvent,
  onImageClick,
}: EventsGalleryProps) => {
  const [lightboxTile, setLightboxTile] = useState<GalleryTile | null>(null)

  const handleTileClick = (tile: GalleryTile) => {
    if (!tile.featured) return
    if (onImageClick) {
      onImageClick(tile)
      return
    }
    setLightboxTile(tile)
  }

  return (
    <Section data-testid='events-gallery'>
      <GalleryRow>
        {tiles.map((tile, index) => (
          <Tile
            key={tile.id}
            $grow={tileGrow[index] ?? 1}
            $clickable={tile.featured}
            $featured={tile.featured}
            onClick={() => handleTileClick(tile)}
          >
            <TileImage src={tile.image} alt={tile.alt} />
            {tile.overlayOpacity > 0 && <TileOverlay $opacity={tile.overlayOpacity} />}
          </Tile>
        ))}
      </GalleryRow>

      <EventInfo>
        <EventTitle>{event.title}</EventTitle>
        <EventMeta>
          <EventDate>{event.date}</EventDate>
          <EventLocation>{event.location}</EventLocation>
        </EventMeta>
      </EventInfo>

      <LightboxOverlay $open={lightboxTile !== null} onClick={() => setLightboxTile(null)}>
        {lightboxTile && (
          <>
            <LightboxImage src={lightboxTile.image} alt={lightboxTile.alt} />
            <LightboxClose onClick={() => setLightboxTile(null)}>Close</LightboxClose>
          </>
        )}
      </LightboxOverlay>
    </Section>
  )
}

export default EventsGallery
