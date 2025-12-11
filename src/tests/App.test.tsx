import { describe, it, expect, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import App from '@/App'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'

vi.mock('@/components/Header', () => ({
  Header: vi.fn(),
}))
vi.mock('@/components/Hero', () => ({
  Hero: vi.fn(),
}))

describe('App', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders header and visual components', () => {
    render(<App />)

    expect(Header).toHaveBeenCalledOnce()
    expect(Hero).toHaveBeenCalledOnce()
  })
})
