import styled from 'styled-components'
import IgIcon from '@/assets/IgIcon.png'
import EmailIcon from '@/assets/EmailIcon.png'
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

const SocialIconsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(8px, 1cqw, 16px);

  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: clamp(14px, 1.8cqw, 22px);
    height: clamp(14px, 1.8cqw, 22px);
    object-fit: contain;
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

      <a href='/' className={'headerLogo'} aria-label='Buenos Díaz logo'>
        <img src={PrimaryLogo} alt='Email' />
      </a>

      <SocialIconsBox>
        <a href='mailto:hello@buenosdiaznyc.com' aria-label='Email Buenos Díaz'>
          <img src={EmailIcon} alt='Email' />
        </a>
        <a href='https://www.instagram.com/buenosdiaznyc/' target='_blank' rel='noreferrer'>
          <img src={IgIcon} alt='Instagram' />
        </a>
      </SocialIconsBox>
    </StyledHeader>
  )
}
