import { TalentSkillSetVettedResultFragment } from '../../../../../../../../data/talent-skill-set-vetted-result-fragment'

export const calculateNotVettedMessage = (
  vettedResult?: TalentSkillSetVettedResultFragment | null
) => {
  if (!vettedResult) {
    return 'Skill not yet vetted.'
  }

  const { reason } = vettedResult

  return reason
    ? `Not vetted due to ${reason.toLowerCase()}.`
    : 'No vetting information.'
}
