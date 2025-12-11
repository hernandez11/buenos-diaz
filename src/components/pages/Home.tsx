import '@/theme/GlobalStyles.css'
import { Hero } from '@/components/Hero'
import { StyledInfoSection } from '@/theme/StyledComponents'
import { MenuCard, type Menu } from '../MenuCard'

const menuList: Menu[] = [
  {
    title: 'CAFÉ DE OLLA',
    subtitle: 'Piloncillo | Cinnamon | Orange',
    description: `Steeped with aromatic spices, this
  
  latte captures the soul of traditional Mexican coffee.Inspired by
  
  the clay pot brews shared in rural kitchens, it’s warm, spiced, &
    deeply rooted in heritage.`,
  },
  {
    title: 'EL NOGÁL',
    subtitle: 'Toasted Pecan | Brown Sugar | Mexican Vanilla',
    description: `Combining the warmth of toasted pecans with the smooth 
  
  sweetness of Mexican vanilla. Inspired by the flavors of southern 
  
  Mexico & cozy fall desserts, it’s comfort in a cup`,
  },
  {
    title: 'Horchata Latte',
    subtitle: 'Cinnamon | Vanilla | Rice',
    description: `Creamy, spiced, & full of nostalgia
  
  this drink reimagines a Mexican classic. Inspired by homemade 
  
  horchata shared on 
  warm afternoons, it’s smooth, comforting, and deeply familiar.`,
  },
]

export const Home = () => {
  return (
    <>
      <Hero />
      <StyledInfoSection data-testid='InfoSection'>
        <span className='textWrapper'>
          <p>
            <strong>BUENOS DíAZ</strong> | CHIS, MX
          </p>
          <p>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis magna mauris. Sed quis eros sit amet augue pellentesque blandit. Donec quis nunc rutrum, iaculis urna ac, mattis purus. Sed auctor justo at leo sagittis, a dapibus eros mattis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris vel interdum odio. Fusce ultricies lacinia tortor, ac sodales nunc tincidunt ut. Donec nec mattis nibh. Integer quis accumsan lectus. Morbi condimentum diam sed mauris faucibus, vitae varius nunc euismod. Cras dictum diam justo, eget efficitur risus euismod id.
        Curabitur sed venenatis quam. Nam arcu ligula, tincidunt ar imperdiet sed, dignissim sed metus. Suspendisse potenti. In hac habitasse platea dictumst. Phasellus rhoncus diam sed justo cursus fermentum. Aenean vel leo vel leo fermentum facilisis. Nullam tempus augue ac metus cursus, et auctor neque tempor.
        Nam vel mattis purus, commodo accumsan quam. Mauris tempor mauris erat, vitae convallis velit pharetra sed. Nunc tempus ut tortor vitae vestibulum. Ut at ex elit. Ut convallis erat vel arcu euismod ullamcorper sed gravida sem. Ut auctor augue velit, in sagittis velit lobortis at. Vivamus maximus tortor eros, at mollis ipsum mattis vitae. Pellentesque faucibus nisl non fringilla facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam tellus, aliquet eu nulla at, rhoncus porttitor nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent et nisl sit amet metus eleifend viverra. Mauris aliquet elit eu diam consequat ornare. Vivamus a magna vitae dolor bibendum consequat a non purus. Mauris lorem tortor, eleifend at purus sollicitudin, imperdiet viverra ligula.`}</p>
        </span>
      </StyledInfoSection>

      {/* <img></img> */}

      {menuList.map((menuItem, index) => (
        <MenuCard
          key={index}
          title={menuItem.title}
          subtitle={menuItem.subtitle}
          description={menuItem.description}
        />
      ))}
    </>
  )
}
