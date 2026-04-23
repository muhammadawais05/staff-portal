import { NOT_VETTED_RESULTS } from '../../../../../../constants'
import { TalentSkillSetVettedResultFragment } from '../../../../../../data/talent-skill-set-vetted-result-fragment'

export const shouldShowNotVettedSkill = (
  vettedResult?: TalentSkillSetVettedResultFragment | null
): vettedResult is undefined | null =>
  !vettedResult || NOT_VETTED_RESULTS.includes(vettedResult.result)
