import { StyledTooltip } from '@/theme/StyledComponents'

export const TooltipButton = () => {
  return (
    <StyledTooltip>
      <div className='hint' data-position='4'>
        <span className='hint-radius' />
        <span data-testid='TooltipButton' className='tooltipButton'>
          TIP
        </span>
        <div data-testid='Tooltip' className='tooltipContent do--split-children'>
          <p>Your support helps Buenos Diaz keep serving amazing coffee. Venmo available!</p>
        </div>
      </div>
    </StyledTooltip>
  )
}
