import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Error_img from '@/assets/Error_img.jpg'

const Section = styled.section`
  flex: 1;
  container-type: inline-size;
  background-color: #fffdfa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(2.5rem, 6cqw, 5.5rem);
  padding: clamp(3rem, 8cqw, 7rem) clamp(1.5rem, 4cqw, 4rem);
`

const DigitsBox = styled.div`
  position: relative;
  width: min(100%, 1082px);
  aspect-ratio: 1082 / 292;
`

const Digits = styled.p`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  line-height: 1;
  color: #ed6636;
  font-size: clamp(96px, 46.2cqw, 500px);
`

const PhotoWindow = styled.div`
  position: absolute;
  z-index: 1;
  left: 55.36%;
  top: -10.62%;
  width: 18.58%;
  height: 88.7%;
  overflow: hidden;
  border: 0.5px solid #fff;
`

const PhotoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.9);
  transform-origin: 100% 80%;
`

const MessageRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(0.75rem, 2cqw, 1.5rem);
  width: 100%;
  text-decoration: none;
`

const MessageWord = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  letter-spacing: -0.04em;
  color: #1e1e1e;
  font-size: 1em;
  white-space: nowrap;
`

const Divider = styled.span`
  display: block;
  width: clamp(60px, 12.73cqw, 220px);
  height: 1px;
  background-color: #1e1e1e;
`

export const NotFound = () => {
  return (
    <Section data-testid='not-found'>
      <DigitsBox>
        <Digits>404</Digits>
        <PhotoWindow>
          <PhotoImg src={Error_img} alt='' />
        </PhotoWindow>
      </DigitsBox>

      <MessageRow as={Link} to='/'>
        <MessageWord>PAGE</MessageWord>
        <Divider />
        <MessageWord>NOT</MessageWord>
        <Divider />
        <MessageWord>FOUND</MessageWord>
      </MessageRow>
    </Section>
  )
}

export default NotFound
