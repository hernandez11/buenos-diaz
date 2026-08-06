import '@/theme/GlobalStyles.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Home } from './components/pages/Home'
import EventsGallery from '@/components/pages/EventsGallery'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/events' element={<EventsGallery />} />
        <Route path='/*' element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
