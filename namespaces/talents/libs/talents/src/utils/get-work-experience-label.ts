import { shouldShowPortfolio } from './should-show-portfolio'

export const getWorkExperienceLabel = (talentType: string) =>
  shouldShowPortfolio(talentType) ? 'Portfolio' : 'Projects'
