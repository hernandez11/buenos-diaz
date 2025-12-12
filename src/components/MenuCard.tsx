import { StyledDottedLine, StyledMenuCard } from '@/theme/StyledComponents'

export type Menu = {
  title: string
  subtitle: string
  description: string
}
export const MenuCard = ({ title, subtitle, description }: Menu) => {
  return (
    <StyledMenuCard>
      <h1 className='primaryTextLarge' data-testid={'CardTitle'}>
        {title}
      </h1>
      <h3 className='primaryTextExtraSmall' data-testid={'CardSubtitle'}>
        {subtitle}
      </h3>
      <StyledDottedLine />
      <p className='primaryTextSmall' data-testid={'CardDescription'}>
        {description}
      </p>
    </StyledMenuCard>
  )
}
