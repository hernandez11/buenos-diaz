import styled from 'styled-components'

interface EventData {
  id: string
  title: string
  description: string
  image: string
  date: string
  time: string
  location: string
}

interface UpcomingEventsSectionProps {
  event?: EventData
}

const Container = styled.section`
  width: 100%;
  background-color: #f1ede3;
  padding: 15em 0em;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 10em 0em;
  }
`

const Header = styled.div`
  width: 80%;
  max-width: 1400px;
  margin-bottom: 3rem;
  text-align: left;

  @media (max-width: 768px) {
    margin-bottom: 10em;
  }
`

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 1.5em;
  font-weight: 600;
  letter-spacing: -0.96px;
  margin: 0;
  text-transform: uppercase;
  color: #000000;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.3em;
  }
`

const SectionSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1em;
  font-weight: 400;
  letter-spacing: -0.64px;
  margin: 0.3rem 0 0 0;
  text-transform: uppercase;
  color: #000000;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`

const StackedContent = styled.div`
  width: 80%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`

const EventTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1em;
  font-weight: 700;
  letter-spacing: -0.64px;
  margin: 0;
  text-transform: uppercase;
  color: #000000;
  line-height: 1.2;
  text-align: right;
  align-self: flex-end;
  max-width: 600px;

  @media (max-width: 768px) {
    text-align: center;
    align-self: center;
    font-size: 0.9em;
  }
`

const EventDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75em;
  font-weight: 300;
  letter-spacing: -0.48px;
  line-height: 1.6;
  margin: 0;
  color: #000000;
  text-align: right;
  align-self: flex-end;
  max-width: 450px;

  @media (max-width: 1024px) {
    max-width: 380px;
  }

  @media (max-width: 768px) {
    text-align: center;
    align-self: center;
  }
`

const ImageAndButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10rem;
  width: 90%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`

const ImageCard = styled.img`
  width: 100%;
  max-width: 450px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;

  @media (max-width: 1024px) {
    max-width: 380px;
  }

  @media (max-width: 768px) {
    max-width: 500px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
`

const RsvpButton = styled.a`
  background-color: #000000;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1.25rem;
  margin-top: 12em;
  font-family: 'Inter', sans-serif;
  font-size: 1em;
  font-weight: 400;
  letter-spacing: -0.64px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 2.5px;
  display: inline-block;
  text-decoration: none;
  white-space: nowrap;
  height: fit-content;

  &:hover {
    background-color: #333333;
  }

  @media (max-width: 768px) {
    width: 50%;
    margin-top: 2em;
    text-align: center;
    padding: 0.6rem 1.5rem;
  }
`

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
  width: 90%;
  margin-top: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
`

const DateTime = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75em;
  font-weight: 300;
  letter-spacing: -0.48px;
  margin: 0;
  color: #000000;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const Location = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75em;
  font-weight: 300;
  letter-spacing: -0.48px;
  margin: 0;
  color: #000000;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const defaultEvent: EventData = {
  id: '1',
  title: 'Buenos Diaz x Obscure Coffee',
  description: `We're linking up with Obscure Coffee Roasters for a one day popup in Bushwick, featuring a special collab menu that brings together our Chiapas roots and their Puerto Rican coffee. Expect our signature drinks alongside an exclusive lineup, including a limited sampler flight you won't find anywhere else.`,
  image: '/src/assets/EventCard.jpg',
  date: 'Sat, Aug 15',
  time: '10a - 3p',
  location: '259 Melrose St, Brooklyn, NY 11206',
}

const UpcomingEventsSection = ({ event = defaultEvent }: UpcomingEventsSectionProps) => (
  <Container>
    <Header>
      <SectionTitle>UPCOMING EVENTS</SectionTitle>
      <SectionSubtitle>(PROXIMOS EVENTOS)</SectionSubtitle>
    </Header>

    <StackedContent>
      <EventTitle>{event.title}</EventTitle>

      <EventDescription>{event.description}</EventDescription>

      <ImageAndButtonRow>
        <ImageCard src={event.image} alt={event.title} />
        <RsvpButton
          href='https://partiful.com/e/kFfHCucijBKoxfG6LSRp?c=ZJ8JG7bl'
          target='_blank'
          rel='noopener noreferrer'
        >
          RSVP
        </RsvpButton>
      </ImageAndButtonRow>

      <BottomRow>
        <DateTime>
          {event.date} | {event.time}
        </DateTime>
        <Location>{event.location}</Location>
      </BottomRow>
    </StackedContent>
  </Container>
)

export default UpcomingEventsSection
