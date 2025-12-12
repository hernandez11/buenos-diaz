import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TooltipButton } from '@/components/TooltipButton'

describe('TooltipButton', () => {
  it('renders button and tooltip on hover', async () => {
    render(<TooltipButton />)

    expect(screen.getByTestId('TooltipButton')).toBeInTheDocument()
    expect(screen.getByTestId('Tooltip')).toBeInTheDocument()
  })
})
