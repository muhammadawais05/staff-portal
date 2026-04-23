import { StepStatus } from '@staff-portal/graphql/staff'
import { StepIndicatorColor } from '@staff-portal/ui'
import { ActivationStepFragment } from '@staff-portal/talents'

import { isAssignableStep } from './is-assignable-step'

export const getIndicatorColor = (
  step: ActivationStepFragment,
  assignedToViewer: boolean
): StepIndicatorColor => {
  if (step.status === StepStatus.FINISHED) {
    return StepIndicatorColor.Green
  } else if (isAssignableStep(step) && step.staff) {
    return assignedToViewer
      ? StepIndicatorColor.Yellow
      : StepIndicatorColor.Blue
  }

  return StepIndicatorColor.LightGrey
}
