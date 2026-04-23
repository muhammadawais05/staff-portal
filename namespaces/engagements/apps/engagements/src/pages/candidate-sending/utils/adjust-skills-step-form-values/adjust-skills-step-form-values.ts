import {
  NewEngagementWizardStep,
  SkillVettingResult
} from '@staff-portal/graphql/staff'

import { CandidateSendingStepAttributes } from '../../types'

const adjustSkillsStepFormValues = (
  stepAttributes: NonNullable<
    CandidateSendingStepAttributes<NewEngagementWizardStep.SKILLS>
  >
) => ({
  ...stepAttributes,
  skillVettingComment:
    stepAttributes.skillVettingResult !== SkillVettingResult.NO
      ? null
      : stepAttributes.skillVettingComment
})

export default adjustSkillsStepFormValues
