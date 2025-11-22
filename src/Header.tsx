export default function Header() {
  return (
    <>
      <p data-testid={'InfoNavLink'}>INFO.</p>
      <p data-testid={'MenuNavLink'}>MENU.</p>
      <p data-testid={'LogoNavLink'}>BUENOS DIAZ</p>
      <a
        href='https://instagram.com/_u/joshua._.hdz'
        target='_blank'
        rel='noopener noreferrer'
        data-testid='SocialNavLink'
      >
        INSTA
      </a>
    </>
  )
}
