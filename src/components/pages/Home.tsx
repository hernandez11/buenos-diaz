import '@/theme/GlobalStyles.css'
import styled from 'styled-components'
import Hero from '@/components/Hero'
import MenuDisplay from '@/components/MenuDisplay'
import ContactSection from '@/components/ContactSection'

const HeroCover = styled.div`
  position: relative;
  z-index: 1;
  background-color: #fffdfa;
`

const InfoPanel = styled.section`
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 1.5rem;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: 767px) {
    padding: 4rem 20%;
  }

  .infoSection {
    width: 75%;
    max-width: 40em;
    text-align: center;
    white-space: pre-line;

    @media (max-width: 767px) {
      width: 100%;

      p:first-child {
        margin-bottom: 1em;
      }
    }
  }
`

export const Home = () => {
  return (
    <>
      <Hero />

      <HeroCover data-hero-cover>
        <InfoPanel>
          <div className='infoSection' data-testid='InfoSection'>
            <p className='secondaryTitle'>
              <strong>BUENOS DÍAZ</strong> | NYC
            </p>
            <p className='primaryTextSmall'>{`I come from a family of coffee farmers in Chiapas, Mexico, where coffee is more than just a morning pick-me-up—it’s a way of life. In Chiapas, coffee puts food on tables and is grown with care, patience, and pride. Families there savor the fruits of their labor every day, after growing, harvesting, and roasting their own beans. As the largest coffee-producing region in Mexico, Chiapas is steeped in a tradition of quality and passion that has shaped the way coffee is enjoyed and celebrated.

        My family has carried on this tradition for generations, cultivating and harvesting coffee with the same care and dedication. Growing up surrounded by these practices instilled in me a deep respect for the craft and a desire to share its warmth, richness, and cultural significance.

        At Buenos Díaz, we specialize in specialty coffee and crafting experiences that go beyond the cup. From thoughtfully sourced beans to homemade syrups and flavors grounded in Mexican traditions, every drink tells a story—one of care, culture, and the joy of sharing coffee with others.`}</p>

          </div>
        </InfoPanel>

        <MenuDisplay />

        <ContactSection />
      </HeroCover>
    </>
  )
}

export default Home
