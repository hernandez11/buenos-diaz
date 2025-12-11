import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RecipeCard } from '@/components/RecipeCard'

describe('RecipeCard', () => {
  it('renders title, subtitle, and description', () => {
    render(<RecipeCard title='' subtitle='' description='' />)

    expect(screen.getByTestId('CardTitle')).toBeInTheDocument()
    expect(screen.getByTestId('CardSubtitle')).toBeInTheDocument()
    expect(screen.getByTestId('CardDescription')).toBeInTheDocument()
  })
})
