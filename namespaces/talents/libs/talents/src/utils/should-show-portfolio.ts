import { Vertical } from '../enums'

export const shouldShowPortfolio = (talentType: string) => {
  const talentRole = talentType
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase() as Vertical

  return [Vertical.DESIGNER, Vertical.FINANCE_EXPERT].includes(talentRole)
}
