import { StepType } from '@staff-portal/graphql/staff'
import { ActivationStepFragment } from '@staff-portal/talents'

export const getNeedsToptalEmail = (step: ActivationStepFragment) =>
  step.type === StepType.TOPTAL_EMAIL
