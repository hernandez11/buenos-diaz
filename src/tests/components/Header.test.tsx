import { describe, it, expect, vi, afterEach } from 'vitest'
import { Header } from '@/components/Header'
import { render, screen } from '@testing-library/react'
import { InstagramIcon } from '@/components/InstagramIcon'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

vi.mock('@/components/InstagramIcon', () => ({
  InstagramIcon: vi.fn(),
}))

describe('Header', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders navlinks, logo, and social icon', () => {
    render(<Header />)

    expect(InstagramIcon).toHaveBeenCalledOnce()
    expect(screen.getByTestId('InfoNavLink')).toBeInTheDocument()
    expect(screen.getByTestId('MenuNavLink')).toBeInTheDocument()
    expect(screen.getByTestId('PrimaryLogo')).toBeInTheDocument()
  })
})
