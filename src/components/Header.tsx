import { StyledHeader } from '@/theme/StyledComponents'

export const Header = () => {
  return (
    <StyledHeader>
      <div className='navMenu'>
        <a
          href='https://instagram.com/buenosdiaznyc'
          target='_blank'
          rel='noreferrer'
          className='headerLink'
        >
          <p className='primaryTextSmall' data-testid={'InfoNavLink'}>
            @buenosdiaznyc
          </p>
        </a>
      </div>

      <p className={'headerLogo'} data-testid={'PrimaryLogo'}>
        BUENOS DIAZ
      </p>
    </StyledHeader>
  )
}
