import { TalentSkillSetsFragment } from '../../../data/talent-skill-sets-fragment'
import {
  TalentCertificationSkillConnectionFragment,
  TalentEducationSkillConnectionFragment,
  TalentEmploymentSkillConnectionFragment,
  TalentPortfolioItemSkillConnectionFragment,
  TalentProfileSkillConnectionFragment
} from '../../../data/talent-skill-set-connections-fragment'

export type SkillConnection =
  | TalentCertificationSkillConnectionFragment
  | TalentEducationSkillConnectionFragment
  | TalentEmploymentSkillConnectionFragment
  | TalentPortfolioItemSkillConnectionFragment
  | TalentProfileSkillConnectionFragment
export type SkillSets = TalentSkillSetsFragment['nodes']
export type SkillSet = SkillSets[0]
export type SkillConnectionType = SkillConnection['__typename']
