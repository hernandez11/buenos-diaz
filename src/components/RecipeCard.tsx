import { StyledRecipeCard } from '@/theme/StyledComponents'

interface RecipeCardProps {
  title: string
  subtitle: string
  description: string
}
export const RecipeCard = ({ title, subtitle, description }: RecipeCardProps) => {
  return (
    <StyledRecipeCard>
      <h1 data-testid={'CardTitle'}>{title}</h1>
      <h3 data-testid={'CardSubtitle'}>{subtitle}</h3>
      <p data-testid={'CardDescription'}>{description}</p>
    </StyledRecipeCard>
  )
}
