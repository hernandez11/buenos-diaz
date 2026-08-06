import '@/theme/GlobalStyles.css'
import { Header } from '@/components/Header'
import { Home } from './components/pages/Home'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  )
}
