import { StyledHero } from '@/theme/StyledComponents'
import '@/theme/GlobalStyles.css'

export const Hero = () => {
  return (
    <StyledHero data-testid={'HeroImage'}>
      <div className='heroContainer'>
        <h1 data-testid={'HeroTitle'}>BUENOS DIAZ</h1>
        {/* <p className={'primaryTextSmallSpaced'} data-testid={'HeroSubtitle'}>
          MOBILE <strong>ESPRESSO</strong> BAR
        </p> */}
        <p className={'primaryTextSmallSpaced'} data-testid={'HeroSubtitle'}>
          <strong>COMING SOON...</strong>
        </p>
      </div>
    </StyledHero>
  )
}
