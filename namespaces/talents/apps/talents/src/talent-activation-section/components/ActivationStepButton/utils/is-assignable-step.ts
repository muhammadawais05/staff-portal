import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { ActivationStepFragment } from '@staff-portal/talents'

import { StepOperation } from '../../../types'

const ASSIGNABLE_OPERATIONS = [
  StepOperation.Assign,
  StepOperation.Reassign,
  StepOperation.Unassign
]

export const isAssignableStep = (step: ActivationStepFragment) =>
  ASSIGNABLE_OPERATIONS.some(
    operation =>
      step.operations &&
      step.operations[operation].callable === OperationCallableTypes.ENABLED
  )
