import styled from 'styled-components'
import FaqBg from '@/assets/FaqBg.webp'
import { bodySm, color } from '@/theme'
import { useParallax } from '@/components/useParallax'
import { SlideReveal } from '@/components/SlideReveal'

interface FaqItem {
  question: string
  answer: string
}

interface FaqPageProps {
  backgroundImage?: string
}

const faqs: FaqItem[] = [
  {
    question: 'WHAT IS BUENOS DÍAZ?',
    answer:
      'We are a mobile espresso bar based in New York City. We bring specialty coffee rooted in Mexican tradition to events, popups, and private gatherings across the city.',
  },
  {
    question: 'WHAT MAKES OUR COFFEE DIFFERENT?',
    answer:
      'Our coffee comes from Chiapas, Mexico, where our family has farmed for generations. We pair it with syrups we make in house, built on the authentic flavors we grew up with, so every drink tastes like where it came from.',
  },
  {
    question: 'WHERE CAN YOU FIND US?',
    answer:
      'We move around. Check the events page for what is coming up, or follow us on Instagram for the latest!',
  },
  {
    question: 'DO WE CATER PRIVATE EVENTS?',
    answer: 'Yes. We bring the bar, the team, and everything needed to serve your guests.',
  },
  {
    question: 'WHAT EVENTS DO WE SERVE?',
    answer:
      'Weddings, brand launches, office mornings, markets, popups, and private parties. If it calls for good coffee, we are interested.',
  },
  {
    question: "WHAT'S INCLUDED WHEN YOU BOOK WITH US?",
    answer:
      'Our full bar setup, baristas, equipment, cups, and a menu built for your event. We handle setup and breakdown.',
  },
  {
    question: 'CAN WE CUSTOMIZE THE MENU FOR YOUR EVENT?',
    answer:
      'Yes. We can build around a theme, a flavor, or a product. Signature drinks made for your event are part of what we do.',
  },
  {
    question: 'DO WE OFFER NON-COFFEE OPTIONS?',
    answer:
      'Yes. Along with our specialty coffee, we offer our signature homemade horchata and Guava Roja, a hibiscus and guava alternative.',
  },
  {
    question: 'HOW DO YOU BOOK US?',
    answer:
      'Email us at hello@buenosdiaznyc.com with details of your event. We will follow up with availability, specifics, and a quote.',
  },
]

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
  top: -13%;
  left: -19.14%;
  width: 119.14%;
  height: 150%;
  max-width: none;
  object-fit: cover;
  object-position: center 42%;
  display: block;
  transform: translate3d(0, 0, 0);

  @media (max-width: 900px) {
    width: 170%;
    left: -27.3%;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2.2cqw;
  row-gap: 6.9cqw;
  padding: 9.7cqw 13.31cqw 8cqw;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 3.5rem;
    padding: 4rem 1.5rem 5rem;
  }

  @media (max-width: 767px) {
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

  @media (max-width: 1024px) {
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

  @media (max-width: 1024px) {
    margin-top: 0.4rem;
    min-height: 0;
  }
`

const Answer = styled.p`
  ${bodySm};
  font-weight: 300;
  color: ${color.ink};
  margin-top: 1.2cqw;

  @media (max-width: 1024px) {
    margin-top: 0.6rem;
  }
`

export const FaqPage = ({ backgroundImage = FaqBg }: FaqPageProps) => {
  const { frameRef, imageRef } = useParallax({ speed: -0.42 })

  return (
    <Section data-testid='faq-page'>
      <Hero ref={frameRef}>
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
              <Answer>{item.answer}</Answer>
            </SlideReveal>
          </Item>
        ))}
      </Grid>
    </Section>
  )
}

export default FaqPage
