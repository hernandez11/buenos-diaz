import styled from 'styled-components'
import MenuBg from '@/assets/MenuBg.webp'
import { bodySmFlat, color, displayMd, titleSm } from '@/theme'
import { useParallax } from '@/components/useParallax'
import { SlideReveal } from '@/components/SlideReveal'

interface MenuEntry {
  id: string
  name: string
  description?: string
}

interface ClassicPair {
  id: string
  left: string
  right?: string
}

interface MenuDisplayProps {
  backgroundImage?: string
  specialty?: MenuEntry[]
  classics?: ClassicPair[]
  nonCoffee?: MenuEntry[]
}

const Section = styled.section`
  width: 100%;
  height: 115vh;
  height: 115svh;
  container-type: inline-size;
  background-color: ${color.cream};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 900px) {
    height: auto;
    overflow: visible;
  }
`

const Hero = styled.div`
  position: relative;
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;

  @media (max-width: 900px) {
    flex: 0 0 auto;
    aspect-ratio: 4 / 3;
  }
`

const HeroImage = styled.img`
  position: absolute;
  top: -25%;
  left: 0;
  width: 100%;
  height: 150%;
  object-fit: cover;
  object-position: center center;
  display: block;
  opacity: 0.8;
  transform: translate3d(0, 0, 0);
`

const Columns = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4cqw;
  padding: 3cqw 8.2cqw 3.5cqw;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 3rem;
    padding-block: 2.5rem 3rem;
    padding-left: 1.5rem;
    padding-right: min(48%, calc(100% - 1.5rem - 16rem));
  }
`

const Column = styled.div`
  flex: 1 1 0;
  min-width: 0;
  max-width: 22cqw;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    max-width: none;
    width: 100%;
    min-width: 0;
  }
`

const Heading = styled.h2`
  ${displayMd};
  color: ${color.ink};
  display: flex;
  align-items: center;
  gap: 0.7cqw;
  white-space: nowrap;

  @media (max-width: 900px) {
    gap: 0.6rem;
  }
`

const Rule = styled.span`
  flex: 0 0 auto;
  width: clamp(36px, 4.4cqw, 77px);
  height: 2px;
  background-color: ${color.ink};

  @media (max-width: 900px) {
    width: 2.5rem;
  }
`

const Subheading = styled.p`
  ${titleSm};
  color: ${color.ink};
  margin-top: 0.4cqw;

  @media (max-width: 900px) {
    margin-top: 0.35rem;
  }
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9cqw;
  margin-top: 1.4cqw;

  @media (max-width: 900px) {
    gap: 0.9rem;
    margin-top: 1rem;
  }
`

const Entry = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5cqw;

  @media (max-width: 900px) {
    gap: 0.3rem;
  }
`

const EntryName = styled.span`
  ${bodySmFlat};
  font-weight: 500;
  text-transform: uppercase;
  color: ${color.ink};
`

const EntryDescription = styled.p`
  ${bodySmFlat};
  color: ${color.ink};
`

const PairList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1cqw;
  margin-top: 1.4cqw;

  @media (max-width: 900px) {
    gap: 0.75rem;
    margin-top: 1rem;
  }
`

const PairRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2cqw;
  width: 100%;
`

const PairItem = styled.span<{ $align: 'left' | 'right' }>`
  ${bodySmFlat};
  font-weight: 500;
  text-transform: uppercase;
  color: ${color.ink};
  flex: 1 1 0;
  min-width: 0;
  text-align: ${(props) => props.$align};
`

const PairRule = styled.span`
  flex: 0 0 auto;
  width: clamp(12px, 1.2cqw, 20px);
  height: 1px;
  background-color: ${color.ink};
`

const defaultSpecialty: MenuEntry[] = [
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
    description: 'Double espresso latte layered beneath a silky guava and strawberry cold foam.',
  },
]

const defaultClassics: ClassicPair[] = [
  { id: 'row-1', left: 'Espresso', right: 'Flat White' },
  { id: 'row-2', left: 'Latte', right: 'American' },
  { id: 'row-3', left: 'Cortado', right: 'Machiato' },
  { id: 'row-4', left: 'Cappucino' },
]

const defaultNonCoffee: MenuEntry[] = [
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
]

const MenuDisplay = ({
  backgroundImage = MenuBg,
  specialty = defaultSpecialty,
  classics = defaultClassics,
  nonCoffee = defaultNonCoffee,
}: MenuDisplayProps) => {
  const { frameRef, imageRef } = useParallax({ speed: 0.42 })

  return (
    <Section data-testid='menu-section'>
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

      <Columns>
        <Column>
          <SlideReveal index={0}>
            <Heading>
              Specialty
              <Rule />
              Drinks
            </Heading>
            <Subheading>(Bebidas Especiales)</Subheading>
            <List>
              {specialty.map((entry) => (
                <Entry key={entry.id}>
                  <EntryName>{entry.name}</EntryName>
                  {entry.description && <EntryDescription>{entry.description}</EntryDescription>}
                </Entry>
              ))}
            </List>
          </SlideReveal>
        </Column>

        <Column>
          <SlideReveal index={1}>
            <Heading>Classics</Heading>
            <Subheading>(Clásicos)</Subheading>
            <PairList>
              {classics.map((pair) => (
                <PairRow key={pair.id}>
                  <PairItem $align='left'>{pair.left}</PairItem>
                  <PairRule />
                  <PairItem $align='right'>{pair.right}</PairItem>
                </PairRow>
              ))}
            </PairList>
          </SlideReveal>
        </Column>

        <Column>
          <SlideReveal index={2}>
            <Heading>
              Non
              <Rule />
              Coffee
            </Heading>
            <Subheading>(Sin Café)</Subheading>
            <List>
              {nonCoffee.map((entry) => (
                <Entry key={entry.id}>
                  <EntryName>{entry.name}</EntryName>
                  {entry.description && <EntryDescription>{entry.description}</EntryDescription>}
                </Entry>
              ))}
            </List>
          </SlideReveal>
        </Column>
      </Columns>
    </Section>
  )
}

export default MenuDisplay
