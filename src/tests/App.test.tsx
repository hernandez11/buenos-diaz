import { describe, it, expect, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import App from '@/App'
import { Header } from '@/components/Header'

vi.mock('@/components/Header', () => ({
  Header: vi.fn(),
}))

describe('App', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders header and visual components', () => {
    render(<App />)

    expect(Header).toHaveBeenCalledTimes(1)
  })
})
