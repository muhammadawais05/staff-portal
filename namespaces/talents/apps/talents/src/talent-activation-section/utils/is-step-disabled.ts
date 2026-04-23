import { isOperationDisabled } from '@staff-portal/operations'

import { StepOperation, ActivationStepOperations } from '../types'

export const isStepDisabled = (
  operations?: Pick<
    ActivationStepOperations,
    StepOperation.Assign | StepOperation.Approve
  > | null
) =>
  !!operations &&
  (isOperationDisabled(operations[StepOperation.Assign]) ||
    isOperationDisabled(operations[StepOperation.Approve]))
