import styled from 'styled-components'

export const StyledHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ece7dc;
  color: #1e1e1e;
  padding: 0 1em;
  height: 5em;

  .navMenu {
    display: flex;

    > p {
      padding-right: 1em;
    }
  }

  .primaryLogo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`

export const StyledHero = styled.div`
  background-image: url('');
  height: 60vh;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  // @media (max-width: 768px) {
  // ...styled
  // }
`
