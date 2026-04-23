import { getWorkExperienceLabel } from '../../../../../utils'
import { SkillConnectionType } from '../../../types'
import { TalentSkillTypename } from '../config'

export const TRANSLATIONS: Record<
  TalentSkillTypename,
  (talentType?: string) => string
> = {
  TalentEmployment: () => 'Employment history',
  TalentPortfolioItem: (talentType?: string) =>
    talentType ? getWorkExperienceLabel(talentType) : 'Portfolio',
  TalentEducation: () => 'Education',
  TalentCertification: () => 'Certifications',
  TalentProfile: () => 'Preferred environment'
}

export const generateSectionName = (
  nodeType: SkillConnectionType,
  talentType: string
) => {
  return TRANSLATIONS[nodeType](talentType)
}
