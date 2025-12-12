import { StyledHeader } from '@/theme/StyledComponents'
import { InstagramIcon } from './InstagramIcon'

export const Header = () => {
  return (
    <StyledHeader>
      <div className='navMenu'>
        <p className='primaryTextSmall' data-testid={'InfoNavLink'}>
          INFO.
        </p>
        <p className='primaryTextSmall' data-testid={'MenuNavLink'}>
          MENU.
        </p>
      </div>

      <p className={'headerLogo'} data-testid={'PrimaryLogo'}>
        BUENOS DIAZ
      </p>

      <InstagramIcon />
    </StyledHeader>
  )
}
