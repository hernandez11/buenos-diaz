import styled from 'styled-components'
import FaqBg from '@/assets/FaqBg_fall.webp'
import { bodySm, color, media } from '@/theme'
import { useParallax } from '@/components/useParallax'
import { SlideReveal } from '@/components/SlideReveal'
import { Link } from 'react-router-dom'
import { faqs, type FaqItem } from '@/content/faq'
import { useContactLink } from '@/components/useContactLink'

interface FaqPageProps {
  backgroundImage?: string
}

const Section = styled.section`
  width: 100%;
  flex: 1;
  container-type: inline-size;
  background-color: ${color.cream};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: calc(-1 * var(--header-h, 0px));
`

const Hero = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1728 / 850;
  flex: 0 0 auto;
  overflow: hidden;

  @media (max-width: 900px) {
    aspect-ratio: 4 / 3;
  }
`

const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: center;
  display: block;
  transform: translate3d(0, 0, 0);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2.2cqw;
  row-gap: 6.9cqw;
  padding: 9.7cqw 13.31cqw 8cqw;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 3.5rem;
    padding: 4rem 1.5rem 5rem;
  }

  ${media.mobile} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 1.25rem;
    row-gap: 2.75rem;
    padding: 3rem 5% 7rem;
  }
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`

const Index = styled.span`
  ${bodySm};
  font-size: 1.107cqw;
  font-weight: 300;
  color: ${color.ink};
  white-space: nowrap;

  ${media.tablet} {
    font-size: 0.9em;
  }
`

const Question = styled.h2`
  ${bodySm};
  font-weight: 500;
  text-transform: uppercase;
  color: ${color.ink};
  margin-top: 0.5cqw;
  min-height: 3.9cqw;

  ${media.tablet} {
    margin-top: 0.4rem;
    min-height: 0;
  }
`

const Answer = styled.p`
  ${bodySm};
  font-weight: 300;
  color: ${color.ink};
  margin-top: 1.2cqw;

  ${media.tablet} {
    margin-top: 0.6rem;
  }
`

const ContactLink = styled(Link)`
  font: inherit;
  font-weight: 500;
  color: ${color.accent};
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
  -webkit-tap-highlight-color: transparent;

  &:hover,
  &:focus-visible {
    color: ${color.sageDark};
    text-decoration: underline;
  }
`

const renderAnswer = (item: FaqItem, onContact: ReturnType<typeof useContactLink>) => {
  if (!item.contactPhrase) return item.answer

  const start = item.answer.toLowerCase().indexOf(item.contactPhrase.toLowerCase())
  if (start < 0) return item.answer

  const end = start + item.contactPhrase.length

  return (
    <>
      {item.answer.slice(0, start)}
      <ContactLink to='/' onClick={onContact}>
        {item.answer.slice(start, end)}
      </ContactLink>
      {item.answer.slice(end)}
    </>
  )
}

export const FaqPage = ({ backgroundImage = FaqBg }: FaqPageProps) => {
  const { frameRef, imageRef } = useParallax({ speed: 0 })
  const handleContact = useContactLink()

  return (
    <Section data-testid='faq-page'>
      <Hero ref={frameRef} data-scroll-anchor>
        <HeroImage
          ref={imageRef}
          src={backgroundImage}
          alt=''
          aria-hidden='true'
          fetchPriority='high'
          decoding='async'
        />
      </Hero>

      <Grid data-hero-cover>
        {faqs.map((item, index) => (
          <Item key={item.question}>
            <SlideReveal index={index % 4} duration={0.9}>
              <Index>({String(index + 1).padStart(2, '0')})</Index>
              <Question>{item.question}</Question>
              <Answer>{renderAnswer(item, handleContact)}</Answer>
            </SlideReveal>
          </Item>
        ))}
      </Grid>
    </Section>
  )
}

export default FaqPage
