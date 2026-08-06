import styled from 'styled-components'
import heroImage from '@/assets/HeroBg.png'

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  aspect-ratio: 1728 / 961;
  overflow: hidden;
  container-type: inline-size;
  background-color: #fffdfa;

  @media (max-width: 767px) {
    aspect-ratio: 3 / 4;
  }
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
  font-weight: ${(props) => (props.$size === 'lg' ? 500 : 400)};
  font-size: ${(props) =>
    props.$size === 'lg' ? 'clamp(13px, 1.157cqw, 20px)' : 'clamp(10px, 0.868cqw, 15px)'};

  @media (max-width: 767px) {
    display: none;
  }
`

const Divider = styled.span`
  position: absolute;
  left: 72%;
  top: 47%;
  width: 5%;
  height: 1px;
  background-color: #ffffff;
  z-index: 2;

  @media (max-width: 767px) {
    display: none;
  }
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

    <Label $left='65%' $top='46%' $size='lg'>
      Made
    </Label>
    <Divider />
    <Label $left='80%' $top='46%' $size='lg'>
      For
    </Label>

    <Label $left='37%' $top='55%' $anchor='center'>
      Heritage
    </Label>
    <Label $left='62%' $top='73%' $anchor='right'>
      Culture
    </Label>
    <Label $left='8%' $top='79%'>
      New York City
    </Label>
    <Label $left='85%' $top='83%'>
      Community
    </Label>

    <Label $left='39%' $top='92%' $anchor='right' $width='18%'>
      Mexican heritage, poured in New York. Specialty coffee with a purpose.
    </Label>

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
