import { StyledHero } from '@/theme/StyledComponents'

export const Hero = () => {
  return (
    <StyledHero data-testid={'HeroImage'}>
      <div className='heroContainer'>
        <h1 data-testid={'HeroTitle'}>BUENOS DIAZ</h1>
        <p data-testid={'HeroSubtitle'}>NYC | Espresso popup</p>
      </div>
    </StyledHero>
  )
}
