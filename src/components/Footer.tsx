import styled from 'styled-components'
import IgIcon from '@/assets/IgIcon.png'
import EmailIcon from '@/assets/EmailIcon.png'

interface FooterLink {
  id: string
  label: string
  href: string
}

interface FooterProps {
  location?: string
  copyright?: string
  links?: [FooterLink, FooterLink, FooterLink, FooterLink]
}

const Wrapper = styled.footer`
  position: relative;
  width: 100%;
  background-color: #fffdfa;
  container-type: inline-size;
`

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0.5em 11.98cqw;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    text-align: center;
  }
`

const Location = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: clamp(11px, 0.868cqw, 15px);
  font-weight: 400;
  letter-spacing: -0.04em;
  color: #000000;
  white-space: nowrap;

  @media (max-width: 1024px) {
    font-size: 0.9em;
    order: 2;
  }
`

const Copyright = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: clamp(11px, 0.868cqw, 15px);
  font-weight: 400;
  letter-spacing: -0.04em;
  color: #000000;
  text-align: right;
  white-space: nowrap;

  @media (max-width: 1024px) {
    font-size: 0.9em;
    text-align: center;
    order: 3;
  }
`

const LogoMark = styled.span`
  font-family: 'Loved by the King', cursive;
  font-size: clamp(28px, 3.078cqw, 53.19px);
  color: #1e1e1e;
  text-align: center;
  line-height: 1;

  @media (max-width: 1024px) {
    order: 1;
    font-size: 2.4em;
  }
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #1e1e1e;
  opacity: 0.5;
  margin: 0 5.56cqw;
`

const BottomRow = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 11.98cqw;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    padding: 0.5rem 2rem;
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

const defaultLinks: [FooterLink, FooterLink, FooterLink, FooterLink] = [
  { id: 'home', label: 'HOME', href: '/' },
  { id: 'services', label: 'SERVICES', href: '/services' },
  { id: 'events', label: 'EVENTS', href: '/events' },
  { id: 'contact', label: 'CONTACT', href: '/contact' },
]

const Footer = ({
  location = 'Mobile Espresso Bar | NYC',
  copyright = '© Buenos Díaz Coffee, 2026',
  links = defaultLinks,
}: FooterProps) => (
  <Wrapper data-testid='footer'>
    <TopRow>
      <Location>{location}</Location>
      <LogoMark>BD</LogoMark>
      <Copyright>{copyright}</Copyright>
    </TopRow>

    <Divider />

    <BottomRow>
      <a className='navigationLink' href={links[0].href}>
        {links[0].label}
      </a>
      {/* <a className='navigationLink' href={links[1].href}>
        {links[1].label}
      </a> */}
      <SocialIconsBox>
        <a href='mailto:hello@buenosdiaznyc.com' aria-label='Email Buenos Díaz'>
          <img src={EmailIcon} alt='Email' />
        </a>
        <a href='https://www.instagram.com/buenosdiaznyc/' target='_blank' rel='noreferrer'>
          <img src={IgIcon} alt='Instagram' />
        </a>
      </SocialIconsBox>
      {/* <a className='navigationLink' href={links[2].href}>
        {links[2].label}
      </a> */}
      {/* <a className='navigationLink' href={links[3].href}>{links[3].label}</a> */}
    </BottomRow>
  </Wrapper>
)

export default Footer
