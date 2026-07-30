import styled from 'styled-components'
import MenuCard1 from '@/assets/MenuCard_1.jpg'
import MenuCard2 from '@/assets/MenuCard_2.jpg'

interface MenuCard {
  id: string
  image: string
}

interface MenuDisplayProps {
  cards?: MenuCard[]
}

const Container = styled.section`
  width: 90%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fffdfa;
  margin: 20em auto;

  @media (max-width: 768px) {
    margin-top: 20em;
    margin-bottom: 10em;
  }
`

const CardWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  @media (max-width: 1024px) {
    max-width: 900px;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 600px;
    place-items: center;
  }

  @media (max-width: 480px) {
    max-width: 500px;
    gap: 1rem;
    place-items: center;
  }
`

const Card = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 635 / 790;
  object-fit: cover;
  display: block;
  border-radius: 0;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
    aspect-ratio: 635 / 790;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    aspect-ratio: 635 / 790;
    margin: 0 auto;
  }
`

const defaultCards: MenuCard[] = [
  {
    id: 'non-coffee',
    image: MenuCard1,
  },
  {
    id: 'specialty',
    image: MenuCard2,
  },
]

const MenuDisplay = ({ cards = defaultCards }: MenuDisplayProps) => (
  <Container>
    <CardWrapper>
      {cards.map((card) => (
        <Card key={card.id} src={card.image} alt={card.id} />
      ))}
    </CardWrapper>
  </Container>
)

export default MenuDisplay
