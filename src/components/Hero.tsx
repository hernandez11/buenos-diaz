import styled from 'styled-components'
import heroImage from '@/assets/HeroBg.png'

const LOGO_RATIO = 3956 / 1218

const HeroContainer = styled.section`
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  height: 100vh;
  height: 100dvh;
  margin-top: calc(-1 * var(--header-h, 0px));
  flex: 0 0 auto;
  overflow: hidden;
  container-type: inline-size;
  background-color: #1e1e1e;
`

const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  z-index: 0;
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
          : 'none'};
  text-align: ${(props) => props.$anchor ?? 'left'};
  z-index: 2;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  white-space: ${(props) => (props.$width ? 'normal' : 'nowrap')};
  line-height: 1.3;
  letter-spacing: -0.04em;
  font-weight: ${(props) => (props.$size === 'lg' ? 400 : 300)};
  font-size: ${(props) =>
    props.$size === 'lg' ? 'clamp(13px, 1.157cqw, 20px)' : 'clamp(11px, 0.868cqw, 15px)'};

  @media (max-width: 767px) {
    display: none;
  }
`

const Divider = styled.span`
  position: absolute;
  left: 74%;
  top: 24%;
  width: 5%;
  height: 1px;
  background-color: #ffffff;
  z-index: 2;

  @media (max-width: 767px) {
    display: none;
  }
`

const LogoBlock = styled.div`
  position: absolute;
  left: 50%;
  top: 49.4%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 767px) {
    display: none;
  }
`

const LogoSlot = styled.span`
  display: block;
  width: 35em;
  max-width: 60cqw;
  aspect-ratio: ${LOGO_RATIO};
`

const SocialRow = styled.div`
  position: absolute;
  left: 95.3%;
  top: 96.5%;
  transform: translate(-100%, -50%);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.8cqw;

  @media (max-width: 767px) {
    display: none;
  }
`

const SocialLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: clamp(10px, 0.868cqw, 15px);
  letter-spacing: -0.04em;
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`

const Slash = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: clamp(10px, 0.868cqw, 15px);
  color: #ffffff;
`

const MobileContent = styled.div`
  display: none;

  @media (max-width: 767px) {
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
    color: #ffffff;
  }
`

const Hero = () => (
  <HeroContainer data-testid='hero'>
    <HeroImage src={heroImage} alt='Buenos Díaz' />

    <Label $left='66.7%' $top='23%' $size='lg'>
      Made
    </Label>
    <Divider />
    <Label $left='82.6%' $top='23%' $size='lg'>
      For
    </Label>

    <Label $left='22%' $top='33.2%' $anchor='center'>
      Heritage
    </Label>
    <Label $left='8%' $top='66.4%'>
      New York City
    </Label>
    <Label $left='60.1%' $top='72.8%' $anchor='right'>
      Culture
    </Label>
    <Label $left='84.8%' $top='69.5%'>
      Community
    </Label>

    <LogoBlock>
      <LogoSlot data-logo-slot='hero' />
    </LogoBlock>

    <Label $left='29%' $top='95.7%' $anchor='right' $width='24%'>
      Mexican heritage, poured in New York. Specialty coffee with a purpose.
    </Label>

    <SocialRow>
      <SocialLink href='https://www.instagram.com/buenosdiaznyc/' target='_blank' rel='noreferrer'>
        Instagram
      </SocialLink>
      <Slash>/</Slash>
      <SocialLink href='https://www.tiktok.com/@buenosdiaznyc' target='_blank' rel='noreferrer'>
        TikTok
      </SocialLink>
    </SocialRow>

    <MobileContent>
      <p className='secondaryTitle'>MADE FOR COMMUNITY</p>

      <p className='primaryTextSmall'>
        Mexican heritage, poured in New York.
        <br />
        Specialty coffee with a purpose.
      </p>
    </MobileContent>
  </HeroContainer>
)

export default Hero
