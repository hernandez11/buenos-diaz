import { describe, it, expect, vi } from 'vitest'
import Header from '@/Header'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'

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
    expect(screen.getByTestId('SocialNavLink')).toBeInTheDocument()
  })

  it('navigates on social icon click', async () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(<Header />)

    await userEvent.click(screen.getByTestId('SocialNavLink'))
    expect(mockNavigate).toHaveBeenCalledExactlyOnceWith('./')
  })
})
