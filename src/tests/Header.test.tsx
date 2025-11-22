import { describe, it, expect, vi } from 'vitest'
import Header from '@/Header'
import { render, screen } from '@testing-library/react'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

describe('Header', () => {
  it('renders navlinks, logo, and social icon', () => {
    render(<Header />)

    expect(screen.getByTestId('InfoNavLink')).toBeInTheDocument()
    expect(screen.getByTestId('MenuNavLink')).toBeInTheDocument()
    expect(screen.getByTestId('LogoNavLink')).toBeInTheDocument()

    const socialLink = screen.getByTestId('SocialNavLink')
    expect(socialLink).toHaveAttribute('href', 'https://instagram.com/_u/joshua._.hdz')
    expect(socialLink).toHaveAttribute('target', '_blank')
  })
})
