import styled from 'styled-components'
import { color, font, media, tracking } from '@/theme'

interface FooterProps {
  location?: string
  copyright?: string
  instagramUrl?: string
}

const Wrapper = styled.footer`
  position: relative;
  z-index: 2;
  width: 100%;
  box-sizing: border-box;
  container-type: inline-size;
  background-color: ${color.cream};
  min-height: var(--footer-h, 56px);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 2cqw;
  padding: 0.75cqw 4cqw;

  ${media.mobile} {
    gap: 0.75rem;
    padding: 1rem;
  }
`

const Text = styled.span`
  font-family: ${font.sans};
  font-weight: 400;
  font-size: clamp(9px, 0.868cqw, 15px);
  letter-spacing: ${tracking.tight};
  color: ${color.black};
  white-space: nowrap;
  flex: 0 1 auto;
  min-width: 0;
`

const TextEnd = styled(Text)`
  text-align: right;
`

const SocialGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9cqw;
  flex: 0 0 auto;

  ${media.mobile} {
    gap: 0.6rem;
  }
`

const SocialLink = styled.a`
  font-family: ${font.sans};
  font-weight: 400;
  font-size: clamp(9px, 0.868cqw, 15px);
  letter-spacing: ${tracking.tight};
  color: ${color.black};
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.6;
  }
`

const Footer = ({
  location = 'Mobile Espresso Bar | NYC',
  copyright = '@ Buenos Díaz Coffee, 2026',
  instagramUrl = 'https://www.instagram.com/buenosdiaznyc/',
}: FooterProps) => (
  <Wrapper data-testid='footer'>
    <Text>{location}</Text>

    <SocialGroup>
      <SocialLink href={instagramUrl} target='_blank' rel='noreferrer'>
        INSTAGRAM
      </SocialLink>
    </SocialGroup>

    <TextEnd>{copyright}</TextEnd>
  </Wrapper>
)

export default Footer
