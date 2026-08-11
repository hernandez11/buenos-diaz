import { useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import { getEventById } from './EventsData'
import { useEventsTransition } from './EventsTransitionContext'

const Page = styled.div`
  position: relative;
  width: 100%;
  background-color: #fffdfa;
  container-type: inline-size;
  opacity: 0;
  transform: translateY(24px);
  animation: fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  @keyframes fade-in {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  z-index: 2;
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 1cqw, 15px);
  letter-spacing: -0.04em;
  text-transform: uppercase;
  color: #1e1e1e;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
`

const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 4cqw;
  padding: 5.8cqw 7.9cqw 2cqw;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 1rem;
    padding: 6rem 1.5rem 1.5rem;
  }
`

const MetaBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4cqw;
  flex: 0 0 auto;

  @media (max-width: 767px) {
    gap: 0.4rem;
  }
`

const MetaText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(11px, 0.868cqw, 15px);
  letter-spacing: -0.04em;
  color: #1e1e1e;
  white-space: nowrap;
`

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: clamp(13px, 1.157cqw, 20px);
  letter-spacing: -0.04em;
  color: #1e1e1e;
  margin: 0;
  text-transform: uppercase;
  white-space: nowrap;
`

const Description = styled.p`
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(10px, 0.694cqw, 12px);
  line-height: 1.5;
  letter-spacing: -0.04em;
  color: #1e1e1e;
  max-width: 25.9cqw;
  margin: 0;

  @media (max-width: 767px) {
    max-width: none;
  }
`

const ImageStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.3cqw;
  padding: 0 0 4cqw;

  @media (max-width: 767px) {
    gap: 1.5rem;
    padding: 0 0 2.5rem;
  }
`

const ImageColumn = styled.div`
  width: 43.17cqw;

  @media (max-width: 767px) {
    width: 88%;
  }
`

const ImageRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2cqw;
  width: 100%;
`

const ImageWithTag = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4cqw;
  width: 100%;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const PhotoFrame = styled.div<{ $aspect: string }>`
  width: 100%;
  aspect-ratio: ${(props) => props.$aspect};
  overflow: hidden;
  flex: 1 1 auto;
  min-width: 0;
`

const LocationTag = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(11px, 0.868cqw, 15px);
  letter-spacing: -0.04em;
  color: #1e1e1e;
  white-space: nowrap;
  flex: 0 0 auto;
  padding-top: 0.3cqw;

  @media (max-width: 767px) {
    padding-top: 0;
  }
`

const EventDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const event = id ? getEventById(id) : undefined
  const transition = useEventsTransition()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [id])

  if (!event) {
    return <Navigate to='/events' replace />
  }

  const handleClose = () => {
    navigate('/events')
  }

  const pool = event.gallery && event.gallery.length > 0 ? event.gallery : [event.image]
  const photoAt = (index: number) => pool[index % pool.length]

  return (
    <Page data-testid='event-detail'>
      <CloseButton onClick={handleClose} aria-label='Close event details'>
        Close
      </CloseButton>

      <InfoRow>
        <MetaBlock>
          <MetaText>{event.date}</MetaText>
          <Title>{event.title}</Title>
        </MetaBlock>
        {event.description && <Description>{event.description}</Description>}
      </InfoRow>

      <ImageStack>
        <ImageColumn>
          <PhotoFrame $aspect='746 / 494'>
            <Photo src={photoAt(0)} alt={event.alt} ref={transition?.registerHeroRef} />
          </PhotoFrame>
        </ImageColumn>

        <ImageColumn>
          <ImageWithTag>
            <PhotoFrame $aspect='746 / 494'>
              <Photo src={photoAt(1)} alt='' />
            </PhotoFrame>
            {event.location && <LocationTag>{event.location}</LocationTag>}
          </ImageWithTag>
        </ImageColumn>

        <ImageColumn>
          <ImageRow>
            <PhotoFrame $aspect='351 / 278'>
              <Photo src={photoAt(2)} alt='' />
            </PhotoFrame>
            <PhotoFrame $aspect='351 / 278'>
              <Photo src={photoAt(3)} alt='' />
            </PhotoFrame>
          </ImageRow>
        </ImageColumn>

        <ImageColumn>
          <PhotoFrame $aspect='746 / 334'>
            <Photo src={photoAt(4)} alt='' />
          </PhotoFrame>
        </ImageColumn>
      </ImageStack>
    </Page>
  )
}

export default EventDetail
