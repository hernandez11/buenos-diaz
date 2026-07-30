import styled from 'styled-components'
import heroClip from '@/assets/HeroClip.mp4'

const HeroContainer = styled.section`
  position: relative;
  height: 85vh;
  min-height: 50em;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const HeroVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right 35% bottom 40%;
  z-index: 0;
`

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 1;
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const HeroText = styled.p`
  margin: 0;
  color: white;
  font-size: 1em;
  letter-spacing: -0.48px;
  text-transform: uppercase;
`

const Hero = () => (
  <HeroContainer data-testid='hero'>
    <HeroVideo src={heroClip} autoPlay loop muted playsInline preload='auto' />
    <HeroOverlay />
    <HeroContent>
      <HeroText>MADE FOR COMMUNITY.</HeroText>
    </HeroContent>
  </HeroContainer>
)

export default Hero
