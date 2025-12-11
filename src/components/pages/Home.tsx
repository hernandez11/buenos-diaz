import '@/theme/GlobalStyles.css'
import { Hero } from '@/components/Hero'
import { StyledInfoSection } from '@/theme/StyledComponents'

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
    </>
  )
}
