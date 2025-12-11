import styled from 'styled-components'
import heroImage from '@/assets/hero-bg.jpg'

export const StyledHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ece7dc;
  color: #1e1e1e;
  padding: 0 3em;
  height: 7em;

  .navMenu {
    display: flex;

    > p {
      padding-right: 3em;
    }
  }

  .primaryLogo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Loved by the King', cursive;
    font-size: 30px;
  }

  @media (max-width: 320px) {
    .navMenu {
      display: none;
    }
  }
`

export const StyledHero = styled.div`
  background-image: url(${heroImage});
  height: 85vh;
  min-height: 50em;
  width: 100%;
  background-position: center 75%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .heroContainer {
    color: white;
    width: 100%;

    > h1 {
      text-wrap: nowrap;
      font-size: 75px;
      font-weight: 400;
      font-family: 'Loved by the King', cursive;
      margin: 0;
      letter-spacing: 5px;
    }

    > p {
      font-size: 17.5px;
      letter-spacing: 5px;
      margin-top: 8px;
    }
  }
`

export const StyledInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 20em;

  .textWrapper {
    text-align: center;
    width: 65%;
    margin: 20em 0;

    > p {
      white-space: pre-line;
    }
  }
`

export const StyledRecipeCard = styled.div`
  > p {
    white-space: pre-line;
  }
`
