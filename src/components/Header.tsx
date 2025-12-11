import { StyledHeader } from '@/theme/StyledComponents'
import { InstagramIcon } from './InstagramIcon'

export const Header = () => {
  return (
    <StyledHeader>
      <div className='navMenu'>
        <p data-testid={'InfoNavLink'}>INFO.</p>
        <p data-testid={'MenuNavLink'}>MENU.</p>
      </div>

      <p className={'primaryLogo'} data-testid={'PrimaryLogo'}>
        BUENOS DIAZ
      </p>

      <InstagramIcon />
    </StyledHeader>
  )
}
