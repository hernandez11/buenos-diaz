import '@/theme/GlobalStyles.css'
import { Hero } from '@/components/Hero'
import { StyledHome } from '@/theme/StyledComponents'
import { MenuCard, type Menu } from '../MenuCard'
import { TooltipButton } from '../TooltipButton'

const menuList: Menu[] = [
  // {
  //   title: 'CARAMELO LATTE',
  //   subtitle: 'Goat-milk caramel | Brown sugar | Vanilla',
  //   description: `
  //   Slow-cooked and deeply comforting,
  //   this latte highlights the warmth of cajeta,
  //   a classic Mexican caramel made from goat’s milk
  //   Smooth and nostalgic, it’s a festive sip that feels both familiar and special`,
  // },
  // {
  //   title: 'PONCHE NAVIDEÑO LATTE',
  //   subtitle: 'Guava | Orange | Sugarcane',
  //   description: `A tribute to the Christmas season in Mexico,
  //   this latte draws from the flavors of traditional ponche enjoyed on cold nights
  //   Aromatic, fruity, and warming, it’s festive without being sweet-heavy, and deeply tied to holiday ritual`,
  // },
  // {
  //   title: 'ROMPOPE LATTE',
  //   subtitle: 'Homemade eggnog | Cinnamon | Brown sugar',
  //   description: `Inspired by traditional rompope shared during the holidays,
  //   this latte is rich, smooth, and deeply comforting
  //   A festive drink rooted in warmth,
  //   tradition, and celebration`,
  // },
  // {
  //   title: 'CAFÉ DE OLLA LATTE',
  //   subtitle: 'Piloncillo | Cinnamon | Orange',
  //   description: `Steeped with aromatic spices,
  //   this latte captures the soul of traditional Mexican coffee
  //   Inspired by the clay pot brews shared in rural kitchens, it’s warm, spiced, &
  // deeply rooted in heritage`,
  // },
]

export const Home = () => {
  return (
    <StyledHome>
      <Hero />
      <div className='infoSection' data-testid='InfoSection'>
        <p className='primaryTextMedium'>
          <strong>BUENOS DíAZ</strong> | CHIS, MX
        </p>
        <p className='primaryTextSmall'>{`I come from a family of coffee farmers in Chiapas, Mexico, where coffee is more than just a morning pick-me-up—it’s a way of life. In Chiapas, coffee puts food on tables and is grown with care, patience, and pride. Families there savor the fruits of their labor every day, after growing, harvesting, and roasting their own beans. As the largest coffee-producing region in Mexico, Chiapas is steeped in a tradition of quality and passion that has shaped the way coffee is enjoyed and celebrated.

        My family has carried on this tradition for generations, cultivating and harvesting coffee with the same care and dedication. Growing up surrounded by these practices instilled in me a deep respect for the craft and a desire to share its warmth, richness, and cultural significance.

        At Buenos Díaz, we specialize in specialty coffee and crafting experiences that go beyond the cup. From thoughtfully sourced beans to homemade syrups and flavors grounded in Mexican traditions, every drink tells a story—one of care, culture, and the joy of sharing coffee with others.`}</p>
      </div>
      <div className='centerImageContainer'></div>
      <TooltipButton />
      <div className={'menuWrapper'}>
        {menuList.map((menuItem, index) => (
          <MenuCard
            key={index}
            title={menuItem.title}
            subtitle={menuItem.subtitle}
            description={menuItem.description}
          />
        ))}
      </div>
    </StyledHome>
  )
}
