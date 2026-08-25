import '@/theme/GlobalStyles.css'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Home } from './components/pages/Home'
import Footer from '@/components/Footer'
import { EventsPage } from './components/pages/EventsPage'
import EventDetail from './components/EventDetail'
import { NotFound } from './components/pages/NotFound'
import { useLenis } from './components/useLenis'
import { useScrollJumpLog } from './components/useScrollJumpLog'
import ScrollLogo from './components/ScrollLogo'
import { FaqPage } from './components/pages/FaqPage'
import { Cursor } from './components/Cursor'
import { ScrollToTop } from './components/ScrollToTop'

const AppShell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100svh;
`

const Main = styled.main`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  padding-top: var(--header-h, 0px);
`

export default function App() {
  useLenis()
  useScrollJumpLog()

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Cursor />
      <ScrollLogo />
      <AppShell>
        <Header />
        <Main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/events' element={<EventsPage />}>
              <Route path=':id' element={<EventDetail />} />
            </Route>
            <Route path='/faq' element={<FaqPage />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Main>
        <Footer />
      </AppShell>
    </BrowserRouter>
  )
}
