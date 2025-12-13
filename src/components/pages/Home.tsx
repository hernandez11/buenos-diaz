import '@/theme/GlobalStyles.css'
import { Hero } from '@/components/Hero'
import { StyledHome } from '@/theme/StyledComponents'
import { MenuCard, type Menu } from '../MenuCard'
import { TooltipButton } from '../TooltipButton'

const menuList: Menu[] = [
  {
    title: 'CARAMELO LATTE',
    subtitle: 'Goat-milk caramel | Brown sugar | Vanilla',
    description: `
    Slow-cooked and deeply comforting, this latte highlights 
    the warmth of cajeta, a 

    classic Mexican caramel made from goat’s milk. 
    Smooth and nostalgic, it’s a 

    festive sip that feels both familiar and special.`,
  },
  {
    title: 'PONCHE NAVIDEÑO LATTE',
    subtitle: 'Guava | Orange | Sugarcane',
    description: `A tribute to the Christmas season in 

    Mexico, this latte draws from the flavors of traditional 
    ponche enjoyed on cold nights. 
    Aromatic, fruity, and warming, it’s 
    
    festive without being sweet-heavy, and deeply tied to holiday ritual.`,
  },
  {
    title: 'ROMPOPE LATTE',
    subtitle: 'Homemade eggnog | Cinnamon | Brown sugar',
    description: `Inspired by traditional rompope shared during the 
    
    holidays, this latte is rich, smooth, 
    
    and deeply comforting. A festive drink rooted in warmth, 
    tradition, and celebration.`,
  },
  {
    title: 'CAFÉ DE OLLA LATTE',
    subtitle: 'Piloncillo | Cinnamon | Orange',
    description: `Steeped with aromatic spices, this
  
  latte captures the soul of traditional Mexican coffee.Inspired by
  
  the clay pot brews shared in rural kitchens, it’s warm, spiced, &
  deeply rooted in heritage.`,
  },
]

export const Home = () => {
  return (
    <StyledHome>
      <Hero />
      <div className='infoSection' data-testid='InfoSection'>
        <p className='primaryTextMedium'>
          <strong>BUENOS DíAZ</strong> | CHIS, MX
        </p>
        <p className='primaryTextSmall'>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis magna mauris. Sed quis eros sit amet augue pellentesque blandit. Donec quis nunc rutrum, iaculis urna ac, mattis purus. Sed auctor justo at leo sagittis, a dapibus eros mattis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris vel interdum odio. Fusce ultricies lacinia tortor, ac sodales nunc tincidunt ut. Donec nec mattis nibh. Integer quis accumsan lectus. Morbi condimentum diam sed mauris faucibus, vitae varius nunc euismod. Cras dictum diam justo, eget efficitur risus euismod id.
        Curabitur sed venenatis quam. Nam arcu ligula, tincidunt ar imperdiet sed, dignissim sed metus. Suspendisse potenti. In hac habitasse platea dictumst. Phasellus rhoncus diam sed justo cursus fermentum. Aenean vel leo vel leo fermentum facilisis. Nullam tempus augue ac metus cursus, et auctor neque tempor.
        Nam vel mattis purus, commodo accumsan quam. Mauris tempor mauris erat, vitae convallis velit pharetra sed. Nunc tempus ut tortor vitae vestibulum. Ut at ex elit. Ut convallis erat vel arcu euismod ullamcorper sed gravida sem. Ut auctor augue velit, in sagittis velit lobortis at. Vivamus maximus tortor eros, at mollis ipsum mattis vitae. Pellentesque faucibus nisl non fringilla facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam tellus, aliquet eu nulla at, rhoncus porttitor nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent et nisl sit amet metus eleifend viverra. Mauris aliquet elit eu diam consequat ornare. Vivamus a magna vitae dolor bibendum consequat a non purus. Mauris lorem tortor, eleifend at purus sollicitudin, imperdiet viverra ligula.`}</p>
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
