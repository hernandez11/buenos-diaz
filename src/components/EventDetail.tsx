import { useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import { events } from './EventsData'

const InfoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  container-type: inline-size;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4cqw;
  padding: 2.2cqw 28.4cqw 0 9.9cqw;
  pointer-events: none;
  opacity: 0;
  animation: detail-fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.15s forwards;

  @keyframes detail-fade-in {
    to {
      opacity: 1;
    }
  }

  @media (max-width: 767px) {
    position: static;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem 1.5rem 0;
    pointer-events: auto;
  }
`

const MetaBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6cqw;
  flex: 0 0 auto;

  @media (max-width: 767px) {
    gap: 0.4rem;
  }
`

const MetaDate = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(11px, 0.868cqw, 15px);
  letter-spacing: -0.04em;
  color: #1e1e1e;
  white-space: nowrap;
`

const MetaTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: clamp(14px, 1.157cqw, 20px);
  letter-spacing: -0.04em;
  color: #1e1e1e;
  margin: 0;
  text-transform: uppercase;
  white-space: nowrap;
`

const Description = styled.p`
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(11px, 0.868cqw, 15px);
  line-height: 1.4;
  letter-spacing: -0.04em;
  color: #1e1e1e;
  text-align: right;
  max-width: 29.7cqw;
  margin: 0;

  @media (max-width: 767px) {
    text-align: left;
    max-width: none;
  }
`

const Page = styled.div`
  width: 100%;
  background-color: #fffdfa;
  container-type: inline-size;
  opacity: 0;
  animation: detail-fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.15s forwards;

  @keyframes detail-fade-in {
    to {
      opacity: 1;
    }
  }
`

const ImageStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.6cqw;
  padding-top: 2cqw;

  @media (max-width: 767px) {
    gap: 1.5rem;
    padding-top: 1.5rem;
  }
`

const ImageColumn = styled.div`
  position: relative;
  width: 43.17cqw;

  @media (max-width: 767px) {
    width: 88%;
  }
`

const PairRow = styled.div`
  display: flex;
  gap: 2.5cqw;
  width: 100%;
`

const PhotoFrame = styled.div<{ $aspect: string }>`
  width: 100%;
  aspect-ratio: ${(props) => props.$aspect};
  overflow: hidden;
  flex: 1 1 auto;
  min-width: 0;
`

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0.8;
`

const NavRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 7.6cqw 9.9cqw 7cqw;

  @media (max-width: 767px) {
    padding: 3rem 1.5rem 2.5rem;
  }
`

const NavGroup = styled.button<{ $align: 'left' | 'right' }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$align === 'right' ? 'flex-end' : 'flex-start')};
  gap: 0.4cqw;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: ${(props) => props.$align};
`

const NavLabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1cqw;
`

const NavLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: clamp(13px, 1.157cqw, 20px);
  letter-spacing: -0.04em;
  color: #1e1e1e;
  white-space: nowrap;
`

const Dots = styled.span`
  display: flex;
  gap: 0.35cqw;
`

const Dot = styled.span`
  width: clamp(6px, 0.58cqw, 10px);
  height: clamp(6px, 0.58cqw, 10px);
  border-radius: 50%;
  background-color: #1e1e1e;
`

const NavSub = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(10px, 0.868cqw, 15px);
  letter-spacing: -0.04em;
  color: #1e1e1e;
  white-space: nowrap;
`

const NavLink = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(10px, 0.694cqw, 12px);
  letter-spacing: -0.04em;
  color: #1e1e1e;
  text-decoration: underline;
  text-transform: uppercase;
  margin-top: 1cqw;
`

const EventDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const index = events.findIndex((item) => item.id === id)
  const event = index >= 0 ? events[index] : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [id])

  if (!event) {
    return <Navigate to='/events' replace />
  }

  const prevEvent = events[(index - 1 + events.length) % events.length]
  const nextEvent = events[(index + 1) % events.length]

  const pool = event.gallery && event.gallery.length > 0 ? event.gallery : [event.image]
  const photoAt = (i: number) => pool[i % pool.length]

  return (
    <>
      <InfoOverlay key={`info-${event.id}`}>
        <MetaBlock>
          <MetaDate>{event.date}</MetaDate>
          <MetaTitle>{event.title}</MetaTitle>
        </MetaBlock>
        {event.description && <Description>{event.description}</Description>}
      </InfoOverlay>

      <Page key={`page-${event.id}`} data-testid='event-detail'>
        <ImageStack>
          <ImageColumn>
            <PhotoFrame $aspect='746 / 494'>
              <Photo src={photoAt(1)} alt='' />
            </PhotoFrame>
          </ImageColumn>

          <ImageColumn>
            <PairRow>
              <PhotoFrame $aspect='351 / 278'>
                <Photo src={photoAt(2)} alt='' />
              </PhotoFrame>
              <PhotoFrame $aspect='351 / 278'>
                <Photo src={photoAt(3)} alt='' />
              </PhotoFrame>
            </PairRow>
          </ImageColumn>

          <ImageColumn>
            <PhotoFrame $aspect='746 / 334'>
              <Photo src={photoAt(4)} alt='' />
            </PhotoFrame>
          </ImageColumn>
        </ImageStack>

        <NavRow>
          <NavGroup $align='right' onClick={() => navigate(`/events/${prevEvent.id}`)}>
            <NavLabelRow>
              <NavLabel>PREVIOUS EVENT</NavLabel>
              <Dots>
                <Dot />
                <Dot />
              </Dots>
            </NavLabelRow>
            <NavSub>(EVENTO ANTERIOR)</NavSub>
            <NavLink>{prevEvent.title}</NavLink>
          </NavGroup>

          <NavGroup $align='left' onClick={() => navigate(`/events/${nextEvent.id}`)}>
            <NavLabelRow>
              <Dots>
                <Dot />
                <Dot />
              </Dots>
              <NavLabel>NEXT EVENT</NavLabel>
            </NavLabelRow>
            <NavSub>(PROXIMO EVENTO)</NavSub>
            <NavLink>{nextEvent.title}</NavLink>
          </NavGroup>
        </NavRow>
      </Page>
    </>
  )
}

export default EventDetail
