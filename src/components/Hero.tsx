import { type MutableRefObject } from 'react'
import styled from 'styled-components'
import heroImage from '@/assets/HeroBg.webp'
import { SlideReveal } from '@/components/SlideReveal'
import { useParallax } from '@/components/useParallax'
import { color, font, media, tracking } from '@/theme'

const HeroContainer = styled.section`
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100vh;
  height: 100svh;
  margin-top: calc(-1 * var(--header-h, 0px));
  flex: 0 0 auto;
  overflow: hidden;
  container-type: inline-size;
  background-color: ${color.ink};
`

const OVERLAY_OPACITY = 0.1

const HeroImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 123%;
  max-width: none;
  object-fit: cover;
  object-position: center center;
  display: block;
  z-index: 0;
  transform: translate3d(0, 0, 0);
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, ${OVERLAY_OPACITY});
  pointer-events: none;
  z-index: 1;
`

const Label = styled.span<{
  $left: string
  $top: string
  $anchor?: 'left' | 'center' | 'right'
  $size?: 'lg' | 'sm'
  $width?: string
}>`
  position: absolute;
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  width: ${(props) => props.$width ?? 'auto'};
  transform: translateY(-50%)
    ${(props) =>
      props.$anchor === 'center'
        ? 'translateX(-50%)'
        : props.$anchor === 'right'
          ? 'translateX(-100%)'
          : ''};
  text-align: ${(props) => props.$anchor ?? 'left'};
  z-index: 2;
  color: ${color.white};
  font-family: ${font.sans};
  text-transform: uppercase;
  white-space: ${(props) => (props.$width ? 'normal' : 'nowrap')};
  line-height: 1.3;
  letter-spacing: ${tracking.tight};
  font-weight: ${(props) => (props.$size === 'lg' ? 500 : 300)};
  font-size: 0.8em;

  ${media.mobile} {
    display: none;
  }
`

const Divider = styled.span`
  position: absolute;
  left: 18.75%;
  top: 27.9%;
  transform: translateY(-50%);
  width: 18.87%;
  height: 1px;
  background-color: ${color.white};
  z-index: 2;

  ${media.mobile} {
    display: none;
  }
`

const TextLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  transform: translate3d(0, 0, 0);
`

const MobileContent = styled.div`
  display: none;

  ${media.mobile} {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    padding: 0 2rem;
    text-align: center;
    color: ${color.white};
  }
`

const Hero = () => {
  const image = useParallax<HTMLElement, HTMLImageElement>({ speed: -0.42 })
  const text = useParallax<HTMLElement, HTMLDivElement>({ speed: -0.85 })

  const setFrame = (node: HTMLElement | null) => {
    ;(image.frameRef as MutableRefObject<HTMLElement | null>).current = node
    ;(text.frameRef as MutableRefObject<HTMLElement | null>).current = node
  }

  return (
    <HeroContainer ref={setFrame} data-testid='hero'>
      <HeroImage
        ref={image.imageRef}
        src={heroImage}
        alt='Buenos Díaz'
        fetchPriority='high'
        decoding='async'
      />
      <Overlay />

      <TextLayer ref={text.imageRef}>
        <Label $left='16.84%' $top='27.9%' $anchor='right' $size='lg'>
          <SlideReveal delay={0} duration={0.9}>
            Made
          </SlideReveal>
        </Label>
        <Divider />
        <Label $left='39.53%' $top='27.9%' $size='lg'>
          <SlideReveal delay={0} duration={0.9}>
            For
          </SlideReveal>
        </Label>

        <Label $left='78.41%' $top='69.8%'>
          <SlideReveal delay={0.5} duration={0.9}>
            New York City
          </SlideReveal>
        </Label>
        <Label $left='23.72%' $top='69.8%' $anchor='right'>
          <SlideReveal delay={0.5} duration={0.9}>
            Heritage
          </SlideReveal>
        </Label>
        <Label $left='50%' $top='53.3%' $anchor='center'>
          <SlideReveal delay={0.5} duration={0.9}>
            Community
          </SlideReveal>
        </Label>

        <Label $left='50%' $top='91.4%' $anchor='center'>
          <SlideReveal delay={1} duration={0.9}>
            Mexican heritage, poured in New York.
            <br />
            Specialty coffee with a purpose.
          </SlideReveal>
        </Label>

        <MobileContent>
          <p className='secondaryTitle'>MADE FOR COMMUNITY</p>

          <p className='primaryTextSmall'>
            Mexican heritage, poured in New York.
            <br />
            Specialty coffee with a purpose.
          </p>
        </MobileContent>
      </TextLayer>
    </HeroContainer>
  )
}

export default Hero
