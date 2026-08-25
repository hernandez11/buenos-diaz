import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import styled, { css, keyframes } from 'styled-components'
import { displayDate, events, hasDetailPage, type GalleryBlock } from './EventsData'
import { SlideReveal } from '@/components/SlideReveal'
import { color, font, media, tracking } from '@/theme'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const detailFade = css`
  opacity: 1;
  animation: ${fadeIn} 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.15s backwards;
`

const InfoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  container-type: inline-size;
  height: calc(clamp(220px, 14cqw, 280px) / 2);
  display: flex;
  align-items: flex-start;
  padding: 2vw 9.9cqw 0 25cqw;
  box-sizing: border-box;
  pointer-events: none;
  ${detailFade};

  ${media.mobile} {
    position: static;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem 6% 0;
    pointer-events: auto;
  }
`

const MetaBlock = styled.div`
  position: fixed;
  left: 9.9vw;
  top: calc(var(--header-h, 88px) + 2vw);
  width: 13vw;
  z-index: 6;
  display: flex;
  flex-direction: column;
  gap: 0.3vw;
  pointer-events: none;
  ${detailFade};

  ${media.mobile} {
    position: static;
    transform: none;
    width: auto;
    gap: 0.4rem;
    padding: 8rem 6% 0;
    pointer-events: auto;
  }
`

const MetaDate = styled.span`
  font-family: ${font.sans};
  font-weight: 300;
  font-size: clamp(11px, 0.868cqw, 15px);
  letter-spacing: ${tracking.tight};
  color: ${color.ink};
  white-space: nowrap;
`

const MetaTitle = styled.h1`
  font-family: ${font.sans};
  font-weight: 500;
  font-size: 0.8em;
  line-height: 1.3;
  letter-spacing: ${tracking.tight};
  color: ${color.ink};
  margin: 0;
  text-transform: uppercase;
`

const Description = styled.p`
  font-family: ${font.sans};
  font-weight: 300;
  font-size: clamp(11px, 0.868cqw, 15px);
  line-height: 1.4;
  letter-spacing: ${tracking.tight};
  color: ${color.ink};
  text-align: left;
  max-width: 33.33vw;
  margin: 0;

  ${media.mobile} {
    max-width: none;
  }
`

const Page = styled.div`
  width: 100%;
  background-color: ${color.cream};
  container-type: inline-size;
  ${detailFade};
`

const ImageStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3cqw;
  padding-top: 3cqw;

  ${media.mobile} {
    gap: 1.5rem;
    padding-top: 1.5rem;
  }
`

const ImageColumn = styled.div`
  position: relative;
  width: 50cqw;

  ${media.mobile} {
    width: 88%;
  }
`

const PairRow = styled.div`
  display: flex;
  gap: 2.5cqw;
  width: 100%;
`

const PhotoFrame = styled.div<{ $aspect: string; $visible?: boolean }>`
  width: 100%;
  aspect-ratio: ${(props) => props.$aspect};
  overflow: hidden;
  flex: 1 1 auto;
  min-width: 0;
  clip-path: ${(props) => (props.$visible === false ? 'inset(100% 0 0)' : 'inset(0)')};
  will-change: clip-path;
  transition: clip-path 1.2s cubic-bezier(0.23, 1, 0.32, 1);
`

const RevealFrame = ({ aspect, children }: { aspect: string; children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)

    const failsafe = window.setTimeout(() => {
      setVisible(true)
      observer.disconnect()
    }, 3000)

    return () => {
      window.clearTimeout(failsafe)
      observer.disconnect()
    }
  }, [])

  return (
    <PhotoFrame ref={ref} $aspect={aspect} $visible={visible}>
      {children}
    </PhotoFrame>
  )
}

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const Clip = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
`

const isVideo = (src: string) => /\.(mp4|webm|ogg)(\?|$)/i.test(src)

const AutoClip = ({ src }: { src: string }) => {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const resume = () => {
      if (document.visibilityState !== 'visible') return
      const attempt = el.play()
      if (attempt) attempt.catch(() => {})
    }

    resume()
    el.addEventListener('pause', resume)
    el.addEventListener('canplay', resume)
    document.addEventListener('visibilitychange', resume)

    return () => {
      el.removeEventListener('pause', resume)
      el.removeEventListener('canplay', resume)
      document.removeEventListener('visibilitychange', resume)
    }
  }, [src])

  return (
    <Clip
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      autoPlay
      tabIndex={-1}
      disablePictureInPicture
      controlsList='nodownload noplaybackrate noremoteplayback'
      preload='auto'
      aria-hidden='true'
    />
  )
}

const Media = ({ src }: { src: string }) =>
  isVideo(src) ? <AutoClip src={src} /> : <Photo src={src} alt='' loading='lazy' decoding='async' />

const NavRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  visibility: hidden;
  pointer-events: none;
  padding: 7.6cqw 9.9cqw 7cqw;

  ${media.mobile} {
    padding: 3rem 6% 7rem;
  }
`

const StickyNav = styled.nav`
  position: fixed;
  right: 9.9vw;
  bottom: calc(var(--footer-h, 56px) + 2vw);
  z-index: 6;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5vw;
  ${detailFade};

  ${media.mobile} {
    display: none;
  }
`

const BackLink = styled(Link)`
  display: inline-block;
  font-family: ${font.sans};
  font-weight: 500;
  font-size: 0.8em;
  line-height: 1.3;
  letter-spacing: ${tracking.tight};
  color: ${color.ink};
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.6;
  }
`

const BackSlot = styled(SlideReveal)`
  display: none;

  ${media.mobile} {
    display: block;
    align-self: flex-end;
    margin-left: auto;
    flex: 0 0 auto;
    min-width: max-content;
  }
`

const MobileBackLink = styled(BackLink)`
  visibility: visible;
  pointer-events: auto;
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

  ${media.mobile} {
    display: none;
  }
`

const NavLabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1cqw;
`

const NavLabel = styled.span`
  font-family: ${font.sans};
  font-weight: 600;
  font-size: clamp(13px, 1.157cqw, 20px);
  letter-spacing: ${tracking.tight};
  color: ${color.ink};
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
  background-color: ${color.ink};
`

const NavSub = styled.span`
  font-family: ${font.sans};
  font-weight: 300;
  font-size: clamp(10px, 0.868cqw, 15px);
  letter-spacing: ${tracking.tight};
  color: ${color.ink};
  white-space: nowrap;
`

const NavLink = styled.span`
  font-family: ${font.sans};
  font-weight: 300;
  font-size: clamp(10px, 0.694cqw, 12px);
  letter-spacing: ${tracking.tight};
  color: ${color.ink};
  text-decoration: underline;
  text-transform: uppercase;
  margin-top: 1cqw;
`

const BLOCK_ASPECT: Record<GalleryBlock, string> = {
  full: '746 / 494',
  wide: '746 / 334',
  tall: '746 / 560',
  pair: '351 / 278',
}

const BLOCK_SIZE: Record<GalleryBlock, number> = {
  full: 1,
  wide: 1,
  tall: 1,
  pair: 2,
}

const DEFAULT_LAYOUT: GalleryBlock[] = ['full', 'pair', 'wide', 'tall']

const EventDetail = () => {
  const { id } = useParams<{ id: string }>()

  const index = events.findIndex((item) => item.id === id)
  const event = index >= 0 ? events[index] : undefined

  const blocks = useMemo(() => {
    if (!event) return []

    const base = event.gallery && event.gallery.length > 0 ? event.gallery : [event.image]
    const rest = base.filter((src) => src !== event.image)
    const images = rest.length > 0 ? rest : base

    const pattern = event.layout && event.layout.length > 0 ? event.layout : DEFAULT_LAYOUT
    const plan: { kind: GalleryBlock; aspect: string; images: string[] }[] = []

    let i = 0
    let step = 0

    while (i < images.length) {
      const remaining = images.length - i
      let kind = pattern[step % pattern.length]

      if (BLOCK_SIZE[kind] > remaining) kind = 'full'

      plan.push({
        kind,
        aspect: BLOCK_ASPECT[kind],
        images: images.slice(i, i + BLOCK_SIZE[kind]),
      })

      i += BLOCK_SIZE[kind]
      step += 1
    }

    return plan
  }, [event])

  if (!event || !hasDetailPage(event)) {
    return <Navigate to='/events' replace />
  }

  const prevEvent = events[(index - 1 + events.length) % events.length]
  const nextEvent = events[(index + 1) % events.length]

  return (
    <>
      <MetaBlock key={`meta-${event.id}`}>
        <SlideReveal delay={0} duration={0.9}>
          <MetaDate>{displayDate(event.date)}</MetaDate>
        </SlideReveal>
        <SlideReveal delay={0.08} duration={0.9}>
          <MetaTitle>{event.title}</MetaTitle>
        </SlideReveal>
      </MetaBlock>

      {event.description && (
        <InfoOverlay key={`info-${event.id}`}>
          <SlideReveal delay={0.16} duration={0.9}>
            <Description>{event.description}</Description>
          </SlideReveal>
        </InfoOverlay>
      )}

      <Page key={`page-${event.id}`} data-testid='event-detail'>
        <ImageStack>
          {blocks.map((block, index) => (
            <ImageColumn key={`${event.id}-${index}`}>
              {block.kind === 'pair' ? (
                <PairRow>
                  {block.images.map((src) => (
                    <RevealFrame key={src} aspect={block.aspect}>
                      <Media src={src} />
                    </RevealFrame>
                  ))}
                </PairRow>
              ) : (
                <RevealFrame aspect={block.aspect}>
                  <Media src={block.images[0]} />
                </RevealFrame>
              )}
            </ImageColumn>
          ))}
        </ImageStack>

        <NavRow aria-hidden='true'>
          <NavGroup $align='right' tabIndex={-1}>
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

          <NavGroup $align='left' tabIndex={-1}>
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
          <BackSlot duration={0.9}>
            <MobileBackLink to='/events'>Back To Events</MobileBackLink>
          </BackSlot>
        </NavRow>
      </Page>

      <StickyNav key={`nav-${event.id}`}>
        <BackLink to='/events'>Back To Events</BackLink>
      </StickyNav>
    </>
  )
}

export default EventDetail
