import { IndustryConnectionType } from '../types'
import { TalentIndustryTypename } from '../config'

export const TRANSLATIONS: Record<IndustryConnectionType, string> = {
  Employment: 'Employment history',
  PortfolioItem: 'Portfolio',
  Profile: 'Preferred environment'
}

export const generateSectionName = (
  nodeType: TalentIndustryTypename
): string => {
  return TRANSLATIONS[nodeType]
}
