import styled from 'styled-components'
import MenuBg from '@/assets/MenuBg.jpg'

interface MenuItem {
  id: string
  name: string
  description: string
}

interface MenuCategory {
  id: string
  titleStart: string
  titleEnd: string
  subtitle: string
  items: MenuItem[]
}

interface MenuDisplayProps {
  categories?: [MenuCategory, MenuCategory]
  backgroundImage?: string
}

const Section = styled.section`
  position: relative;
  width: 80%;
  margin: 0 auto 20em auto;
  aspect-ratio: 1386 / 650;
  overflow: hidden;
  container-type: inline-size;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    width: 88%;
    margin-bottom: 8em;
  }

  @media (max-width: 767px) {
    aspect-ratio: auto;
    box-sizing: border-box;
  }
`

const Background = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  z-index: 0;
`

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: space-evenly;
  gap: clamp(1.5rem, 7cqw, 4rem);
  padding: 2em;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    gap: clamp(1.5rem, 4cqw, 3rem);
    padding: 3rem 2rem;
  }

  @media (max-width: 767px) {
    width: auto;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 3rem 1.75rem;
    gap: 2.75rem;
  }
`

const CategoryColumn = styled.div`
  flex: 0 1 320px;
  max-width: 26cqw;
  display: flex;
  flex-direction: column;
  color: #ffffff;

  @media (max-width: 1024px) {
    max-width: 34cqw;
  }

  @media (max-width: 767px) {
    justify-content: center;
    max-width: 420px;
    width: 100%;
  }
`

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4cqw;

  @media (max-width: 1024px) {
    gap: 0.75rem;
  }
`

const Divider = styled.span`
  width: 5.56cqw;
  height: 2px;
  background-color: #ffffff;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    width: 2.25rem;
  }

  @media (max-width: 767px) {
    width: 2.75rem;
  }
`

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.2cqw;
  margin-top: 6cqw;

  @media (max-width: 1024px) {
    gap: 1.25rem;
    margin-top: 1.75rem;
  }

  @media (max-width: 767px) {
    gap: 1.5rem;
    margin-top: 2rem;
  }
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6cqw;

  @media (max-width: 1024px) {
    gap: 0.35rem;
  }
`

const Title = styled.h2`
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.04em;
  font-weight: 600;
  font-size: 1.5em;
`

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.04em;
  font-weight: 400;
  font-size: 1em;
`

const ItemDescription = styled.p`
  font-family: 'Inter', sans-serif;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.04em;
  font-weight: 300;
  font-size: 0.8em;
  max-width: 25cqw;

  @media (max-width: 1024px) {
    max-width: 30cqw;
  }

  @media (max-width: 767px) {
    max-width: 40ch;
  }
`

const defaultCategories: [MenuCategory, MenuCategory] = [
  {
    id: 'specialty',
    titleStart: 'Specialty',
    titleEnd: 'Drinks',
    subtitle: '(Bebidas Especiales)',
    items: [
      {
        id: 'fresa',
        name: 'Fresa Horchata Latte',
        description:
          'Double espresso with strawberry puree + creamy oatmilk horchata spiced with warm cinnamon.',
      },
      {
        id: 'cajeta',
        name: 'Cajeta Cortado',
        description:
          'Double espresso with cajeta, a rich Mexican caramel made from slow-cooked goat’s milk.',
      },
      {
        id: 'guava-cream',
        name: 'Guava Cream Top',
        description:
          'Double espresso latte layered beneath a silky guava and strawberry cold foam.',
      },
    ],
  },
  {
    id: 'non-coffee',
    titleStart: 'Non',
    titleEnd: 'Coffee',
    subtitle: '(Sin Café)',
    items: [
      {
        id: 'guava-roja',
        name: 'Guava Roja',
        description:
          'Tropical guava layered with the vibrant tang of hibiscus and subtle warming spices. Inspired by the refreshing jamaica agua fresca found across Mexico.',
      },
      {
        id: 'horchata',
        name: 'Horchata',
        description:
          'A traditional Mexican drink made from rice, cinnamon, and vanilla, blended into a smooth, creamy milk based agua fresca.',
      },
    ],
  },
]

const CategoryBlock = ({ category }: { category: MenuCategory }) => (
  <CategoryColumn>
    <TitleRow>
      <Title>{category.titleStart}</Title>
      <Divider />
      <Title>{category.titleEnd}</Title>
    </TitleRow>
    <Subtitle>{category.subtitle}</Subtitle>
    <ItemList>
      {category.items.map((item) => (
        <Item key={item.id}>
          <Subtitle>{item.name}</Subtitle>
          <ItemDescription>{item.description}</ItemDescription>
        </Item>
      ))}
    </ItemList>
  </CategoryColumn>
)

const MenuDisplay = ({
  categories = defaultCategories,
  backgroundImage = MenuBg,
}: MenuDisplayProps) => (
  <Section data-testid='menu-section'>
    <Background src={backgroundImage} alt='' aria-hidden='true' />
    <Content>
      <CategoryBlock category={categories[0]} />
      <CategoryBlock category={categories[1]} />
    </Content>
  </Section>
)

export default MenuDisplay
