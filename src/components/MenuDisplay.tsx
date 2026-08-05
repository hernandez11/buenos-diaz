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
  aspect-ratio: 1386 / 790;
  overflow: hidden;
  container-type: inline-size;
  background-color: #1e1e1e;

  @media (max-width: 1024px) {
    width: 88%;
    margin-bottom: 8em;
    aspect-ratio: auto;
    padding: 4rem 3rem;
    box-sizing: border-box;
  }

  @media (max-width: 767px) {
    width: 90%;
    margin-bottom: 5em;
    padding: 3rem 1.75rem;
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

const Column = styled.div<{ $left: string }>`
  position: absolute;
  left: ${(props) => props.$left};
  top: 32.28%;
  width: 26%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  color: #ffffff;

  @media (max-width: 1024px) {
    display: none;
  }
`

const ColumnStack = styled.div`
  display: none;

  @media (max-width: 1024px) {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    color: #ffffff;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 2.75rem;
  }
`

const StackedCategory = styled.div`
  display: flex;
  flex-direction: column;
`

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4cqw;

  @media (max-width: 1024px) {
    gap: 0.75rem;
  }
`

const Title = styled.h2`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: clamp(17px, 2.164cqw, 30px);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;

  @media (max-width: 1024px) {
    font-size: 1.4em;
  }

  @media (max-width: 767px) {
    font-size: 1.55em;
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

const Subtitle = styled.p`
  margin: 0.5cqw 0 0 0;
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 1.443cqw, 20px);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 1;
  text-transform: uppercase;

  @media (max-width: 1024px) {
    margin-top: 0.4rem;
    font-size: 0.95em;
  }

  @media (max-width: 767px) {
    font-size: 1.05em;
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

const ItemName = styled.h3`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 1.443cqw, 20px);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1;
  text-transform: uppercase;

  @media (max-width: 1024px) {
    font-size: 0.95em;
  }

  @media (max-width: 767px) {
    font-size: 1.05em;
  }
`

const ItemDescription = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: clamp(9px, 1.082cqw, 15px);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 1.35;

  @media (max-width: 1024px) {
    font-size: 0.8em;
    line-height: 1.45;
  }

  @media (max-width: 767px) {
    font-size: 0.85em;
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
  <>
    <TitleRow>
      <Title>{category.titleStart}</Title>
      <Divider />
      <Title>{category.titleEnd}</Title>
    </TitleRow>
    <Subtitle>{category.subtitle}</Subtitle>
    <ItemList>
      {category.items.map((item) => (
        <Item key={item.id}>
          <ItemName>{item.name}</ItemName>
          <ItemDescription>{item.description}</ItemDescription>
        </Item>
      ))}
    </ItemList>
  </>
)

const MenuDisplay = ({
  categories = defaultCategories,
  backgroundImage = MenuBg,
}: MenuDisplayProps) => (
  <Section data-testid='menu-section'>
    <Background src={backgroundImage} alt='' aria-hidden='true' />

    <Column $left='10.75%' data-testid='menu-column-specialty'>
      <CategoryBlock category={categories[0]} />
    </Column>

    <Column $left='63.92%' data-testid='menu-column-non-coffee'>
      <CategoryBlock category={categories[1]} />
    </Column>

    <ColumnStack>
      {categories.map((category) => (
        <StackedCategory key={category.id}>
          <CategoryBlock category={category} />
        </StackedCategory>
      ))}
    </ColumnStack>
  </Section>
)

export default MenuDisplay
