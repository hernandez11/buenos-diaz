import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import EventsGallery from './EventsGallery'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const EventsPage = () => {
  return (
    <Wrapper data-testid='events-page'>
      <EventsGallery />
      <Outlet />
    </Wrapper>
  )
}

export default EventsPage
