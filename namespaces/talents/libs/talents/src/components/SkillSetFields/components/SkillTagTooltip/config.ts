import { SkillConnectionType } from '../../types'

export enum TooltipPage {
  SkillConnections,
  Vetting
}

export const TooltipTitle = {
  [TooltipPage.SkillConnections]: 'Skill connections',
  [TooltipPage.Vetting]: 'Vetting'
}

export enum TalentSkillTypename {
  TALENT_EDUCATION = 'TalentEducation',
  TALENT_PORTFOLIO_ITEM = 'TalentPortfolioItem',
  TALENT_CERTIFICATION = 'TalentCertification',
  TALENT_EMPLOYMENT = 'TalentEmployment',
  TALENT_PROFILE = 'TalentProfile'
}

export const SECTIONS_ORDER: SkillConnectionType[] = [
  TalentSkillTypename.TALENT_EMPLOYMENT,
  TalentSkillTypename.TALENT_PORTFOLIO_ITEM,
  TalentSkillTypename.TALENT_CERTIFICATION,
  TalentSkillTypename.TALENT_EDUCATION,
  TalentSkillTypename.TALENT_PROFILE
]
