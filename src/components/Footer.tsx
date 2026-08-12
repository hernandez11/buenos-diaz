import styled from 'styled-components'

interface FooterProps {
  location?: string
  copyright?: string
  instagramUrl?: string
  tiktokUrl?: string
}

const Wrapper = styled.footer`
  width: 100%;
  box-sizing: border-box;
  container-type: inline-size;
  background-color: #fffdfa;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2cqw;
  padding: 0.75cqw 11.98cqw;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.5rem;
    text-align: center;
  }
`

const Text = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: clamp(11px, 0.868cqw, 15px);
  letter-spacing: -0.04em;
  color: #000000;
  white-space: nowrap;
  flex: 1 1 0;
  min-width: 0;
`

const TextEnd = styled(Text)`
  text-align: right;

  @media (max-width: 767px) {
    text-align: center;
  }
`

const SocialGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9cqw;
  flex: 0 0 auto;

  @media (max-width: 767px) {
    gap: 0.6rem;
  }
`

const SocialLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: clamp(11px, 0.868cqw, 15px);
  letter-spacing: -0.04em;
  color: #000000;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.6;
  }
`

const Divider = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: clamp(11px, 0.868cqw, 15px);
  letter-spacing: -0.04em;
  color: #000000;
`

const Footer = ({
  location = 'Mobile Espresso Bar | NYC',
  copyright = '@ Buenos Díaz Coffee, 2026',
  instagramUrl = 'https://www.instagram.com/buenosdiaznyc/',
  tiktokUrl = 'https://www.tiktok.com/@buenosdiaznyc',
}: FooterProps) => (
  <Wrapper data-testid='footer'>
    <Text>{location}</Text>

    <SocialGroup>
      <SocialLink href={instagramUrl} target='_blank' rel='noreferrer'>
        INSTAGRAM
      </SocialLink>
      <Divider>|</Divider>
      <SocialLink href={tiktokUrl} target='_blank' rel='noreferrer'>
        TIKTOK
      </SocialLink>
    </SocialGroup>

    <TextEnd>{copyright}</TextEnd>
  </Wrapper>
)

export default Footer
