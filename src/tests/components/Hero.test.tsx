import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/Hero'

describe('Hero', () => {
  it('renders image, title, and subtitle', () => {
    render(<Hero />)

    expect(screen.getByTestId('HeroImage')).toBeInTheDocument()
    expect(screen.getByTestId('HeroTitle')).toBeInTheDocument()
    expect(screen.getByTestId('HeroSubtitle')).toBeInTheDocument()
  })
})
