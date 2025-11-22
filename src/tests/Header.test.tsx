import { describe, it, expect, vi } from 'vitest'
import Header from '@/Header'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'

vi.mock('@/Header', () => ({
  Header: vi.fn(),
}))

describe('Header', () => {
  it('renders navlinks, logo, and social icon', () => {
    render(<Header />)

    expect(screen.getByTestId('InfoNavlink')).toBeInTheDocument()
  })
})
