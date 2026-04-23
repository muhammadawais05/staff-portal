import { Operation, StepStatus } from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import type { StepIndicatorData } from '@staff-portal/ui'
import { ActivationStepFragment } from '@staff-portal/talents'

import { getIndicatorColor } from './get-indicator-color'

type GetIndicatorIconProps = {
  step: ActivationStepFragment
  isAssignedToViewer: boolean
  isCurrentStep: boolean
  operation: Operation
}

export const getIndicatorData = ({
  step,
  isAssignedToViewer,
  isCurrentStep,
  operation
}: GetIndicatorIconProps): StepIndicatorData => {
  const color = getIndicatorColor(step, isAssignedToViewer)

  const withArrow =
    (step.status === StepStatus.NEW && isOperationEnabled(operation)) ||
    isCurrentStep

  return {
    color,
    withArrow
  }
}
