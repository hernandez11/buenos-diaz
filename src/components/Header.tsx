import { Link } from 'react-router-dom'
import styled from 'styled-components'

const LOGO_RATIO = 3956 / 1218

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  box-sizing: border-box;
  container-type: inline-size;
  background-color: transparent;
  height: var(--header-h, 88px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4.7cqw;

  @media (max-width: 767px) {
    padding: 0 1.5rem;
  }
`

const NavGroup = styled.nav`
  display: flex;
  align-items: center;
  gap: 4.4cqw;
  flex: 1 1 0;
  min-width: 0;

  @media (max-width: 767px) {
    gap: 1.25rem;
  }
`

const NavGroupEnd = styled(NavGroup)`
  justify-content: flex-end;
`

const NavItem = styled(Link)`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: clamp(11px, 0.868cqw, 15px);
  letter-spacing: -0.04em;
  color: var(--nav-color, #1e1e1e);
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.6;
  }
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  text-decoration: none;
`

const LogoSlot = styled.span`
  display: block;
  width: clamp(120px, 11cqw, 190px);
  aspect-ratio: ${LOGO_RATIO};
`

export const Header = () => {
  return (
    <StyledHeader data-testid='header'>
      <NavGroup>
        <NavItem to='/'>HOME</NavItem>
        <NavItem to='/services'>SERVICES</NavItem>
      </NavGroup>

      <LogoLink to='/' aria-label='Buenos Díaz'>
        <LogoSlot data-logo-slot='header' />
      </LogoLink>

      <NavGroupEnd>
        <NavItem to='/shop'>SHOP</NavItem>
        <NavItem to='/faq'>FAQ</NavItem>
      </NavGroupEnd>
    </StyledHeader>
  )
}

export default Header
