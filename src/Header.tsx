import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  return (
    <>
      <p data-testid={'InfoNavLink'}>INFO.</p>
      <p data-testid={'MenuNavLink'}>MENU.</p>
      <p data-testid={'LogoNavLink'}>BUENOS DIAZ</p>
      <p onClick={() => navigate('./')} data-testid={'SocialNavLink'}>
        INSTA
      </p>
    </>
  )
}
