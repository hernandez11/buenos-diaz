import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Home } from '@/components/pages/Home'
import { Hero } from '@/components/Hero'
import { MenuCard } from '@/components/MenuCard'

vi.mock('@/components/Hero', () => ({
  Hero: vi.fn(),
}))
vi.mock('@/components/MenuCard', () => ({
  MenuCard: vi.fn(),
}))

describe('Home', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders hero and visual components', () => {
    render(<Home />)

    expect(Hero).toHaveBeenCalledOnce()
    expect(screen.getByTestId('InfoSection')).toBeInTheDocument()
    expect(MenuCard).toHaveBeenCalledTimes(3)
  })
})
