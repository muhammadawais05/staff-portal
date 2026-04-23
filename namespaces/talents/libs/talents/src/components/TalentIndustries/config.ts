import { IndustryConnectionType } from './types'

export enum TalentIndustryTypename {
  EMPLOYMENT = 'Employment',
  PORTFOLIO_ITEM = 'PortfolioItem',
  TALENT_PROFILE = 'Profile'
}

export const SECTIONS_ORDER: IndustryConnectionType[] = [
  TalentIndustryTypename.EMPLOYMENT,
  TalentIndustryTypename.PORTFOLIO_ITEM
]
