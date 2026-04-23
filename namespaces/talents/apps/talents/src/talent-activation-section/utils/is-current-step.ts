import { StepStatus } from '@staff-portal/graphql/staff'
import { ActivationStepFragment } from '@staff-portal/talents'

const IN_PROGRESS_STATUSES = [
  StepStatus.PENDING_APPLICANT_ACTION,
  StepStatus.PENDING_STAFF_ACTION
]

export const isCurrentStep = (step: ActivationStepFragment) =>
  IN_PROGRESS_STATUSES.includes(step.status)
