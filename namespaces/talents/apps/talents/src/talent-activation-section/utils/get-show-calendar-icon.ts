import { StepType } from '@staff-portal/graphql/staff'
import { ActivationStepFragment } from '@staff-portal/talents'

export const getShowCalendarIcon = (
  step: ActivationStepFragment,
  isProfileCreationStepFinished: boolean
) =>
  step.type === StepType.REVIEW_CALL &&
  !step.staff &&
  isProfileCreationStepFinished
