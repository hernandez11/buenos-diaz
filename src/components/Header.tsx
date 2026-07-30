import styled from 'styled-components'
import EmailIcon from '@/assets/EmailIcon.png'
import InstagramIcon from '@/assets/InstagramIcon.png'
import PrimaryLogo from '@/assets/PrimaryLogo.png'

const StyledHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fffdfa;
  color: #1e1e1e;
  padding: 0 4.9%;
  height: 96px;
  box-sizing: border-box;

  .navMenu {
    display: flex;
    align-items: center;
    gap: 3em;

    > p {
      margin: 0;
    }
  }

  .headerLogo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Loved by the King', cursive;
    font-size: 40px;
    margin: 0;
    white-space: nowrap;
  }

  .iconMenu {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .iconLink {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.6;
    }

    > img {
      width: 20px;
      height: 20px;
      object-fit: contain;
      display: block;
    }
  }

  @media (max-width: 767px) {
    height: 72px;
    padding: 0 1.5rem;

    .navMenu {
      gap: 1.5em;
    }

    .headerLogo {
      font-size: 28px;
    }

    .iconMenu {
      gap: 1rem;
    }

    .iconLink > img {
      width: 18px;
      height: 18px;
    }
  }

  .headerLogo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    margin: 0;

    > img {
      height: clamp(44px, 4.5vw, 64px);
      width: auto;
      object-fit: contain;
      display: block;
    }
  }
  }
`

export const Header = () => {
  return (
    <StyledHeader>
      <div className='navMenu'>
        <p className='primaryTextSmall' data-testid={'InfoNavLink'}>
          @buenosdiaznyc
        </p>
      </div>

      <a className={'headerLogo'} aria-label='Buenos Díaz logo'>
        <img src={PrimaryLogo} alt='Email' />
      </a>

      <div className='iconMenu'>
        <a
          href='mailto:hello@buenosdiaznyc.com'
          className='iconLink'
          aria-label='Email Buenos Díaz'
          data-testid={'EmailLink'}
        >
          <img src={EmailIcon} alt='Email' />
        </a>
        <a
          href='https://www.instagram.com/buenosdiaznyc/'
          target='_blank'
          rel='noreferrer'
          className='iconLink'
          aria-label='Buenos Díaz on Instagram'
          data-testid={'InstagramLink'}
        >
          <img src={InstagramIcon} alt='Instagram' />
        </a>
      </div>
    </StyledHeader>
  )
}
