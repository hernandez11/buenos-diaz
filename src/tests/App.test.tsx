import { describe, it, expect, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import App from '@/App'
import { Header } from '@/components/Header'
import { Home } from '@/components/pages/Home'

vi.mock('@/components/Header', () => ({
  Header: vi.fn(),
}))
vi.mock('@/components/pages/Home', () => ({
  Home: vi.fn(),
}))

describe('App', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders header and pages', () => {
    render(<App />)

    expect(Header).toHaveBeenCalledOnce()
    expect(Home).toHaveBeenCalledOnce()
  })
})
