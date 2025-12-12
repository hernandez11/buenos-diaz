import { StyledTooltip } from '@/theme/StyledComponents'

export const TooltipButton = () => {
  return (
    <StyledTooltip role='HELLO-WORLD'>
      <div className='hint' data-position='4'>
        <span className='hint-radius' />
        <a
          href='venmo://paycharge?txn=charge&recipients=Joshua-diaz_822'
          target='_blank'
          rel='noopener noreferrer'
          data-testid='TooltipButton'
          className='tooltipButton'
        >
          TIP
        </a>
        <div data-testid='Tooltip' className='tooltipContent do--split-children'>
          <p>Your support helps Buenos Diaz keep serving amazing coffee. Venmo available!</p>
        </div>
      </div>
    </StyledTooltip>
  )
}
