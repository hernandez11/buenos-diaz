import styled from 'styled-components'
import heroImage from '@/assets/hero-bg.jpg'
import bodyImage from '@/assets/body-img.jpg'

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

  .headerLogo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Loved by the King', cursive;
    font-size: 30px;
  }

  @media (max-width: 767px) {
    .navMenu {
      > p {
        display: none;
      }
    }
  }
`

export const StyledHero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: url(${heroImage});
  height: 85vh;
  min-height: 50em;
  width: 100%;
  background-position: center 75%;
  background-repeat: no-repeat;
  background-size: cover;

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

      @media (max-width: 480px) {
        font-size: 60px;
        letter-spacing: 5px;
      }
    }

    > p {
      margin-top: 8px;
    }
  }
`

export const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-x: hidden;

  .infoSection {
    width: 75%;
    margin: 20em 0;
    text-align: center;
    white-space: pre-line;
  }

  .centerImageContainer {
    width: 95%;
    height: 250px;
    backgroundcolor: #1e1e1e;
    background-image: url(${bodyImage});
    background-position: center 60%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .menuWrapper {
    margin: 10em auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: fit-content;
    max-width: 700px;
  }
`

export const StyledMenuCard = styled.div`
  text-align: start;
  padding: 2em 0;

  > p {
    white-space: pre-line;
  }
`

export const StyledDottedLine = styled.div`
  flex-frow: 1;
  margin: 0 8px;
  width: 75%;
  height: 1px;
  background-image: radial-gradient(currentColor 1px, transparent 1px);
  background-size: 7px 7px;
  background-repeat: repeat-x;
  background-position: left center;
`

export const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  .icon-content {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    overflow: hidden;
    background: linear-gradient(45deg, #405de6, #5b51db, #b33ab4, #c135b4, #e1306c, #fd1f1f);

    svg {
      width: 30px;
      height: 30px;
      position: relative;
      z-index: 1;
    }

    /* Optional hover effect */
    &:hover {
      box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
    }
  }
`

export const StyledTooltip = styled.div`
  /* hide on desktop */
  display: none;

  @media (max-width: 767px) {
    --purple: #720c8f;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    margin-top: -200px;

    .hint {
      margin-top: 150px;
      // margin: 150px auto;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .tooltipButton {
      z-index: 3;
      border: 2px solid #ece7dc;
      border-radius: 50%;
      width: 100px;
      height: 100px;
      background-color: #9f3433;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
      transform: translate(0, 0) scale(0.95);
      margin: auto;
      position: relative;
      text-decoration: none;
      text-align: center;
    }

    .hint-radius {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -125px 0 0 -125px;
      opacity: 0;
      visibility: hidden;
      transform: scale(0);
    }

    .tooltipContent {
      display: none;

      width: 300px;
      position: absolute;
      z-index: 5;
      padding: 35px 0;
      pointer-events: auto;
      color: #1e1e1e;
      text-align: end;

      &::after {
        content: '';
        position: absolute;
        top: -44px;
        left: 0;
        width: 80px;
        height: 1px;
        background-color: #1e1e1e;
        transform-origin: 0 50%;
        transform: rotate(60deg);
      }

      &::before {
        content: '';
        position: absolute;
        top: 25px;
        left: 40px;
        width: 250px; /* always extended */
        height: 1px;
        background-color: #1e1e1e;
      }
    }

    /* Position 4 */
    .hint[data-position='4'] .tooltipContent {
      top: 143px;
      left: 10%;
      margin-left: 40px;
    }
  }
`
