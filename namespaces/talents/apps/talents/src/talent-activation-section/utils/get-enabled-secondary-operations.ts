import { isOperationEnabled } from '@staff-portal/operations'
import { ActivationStepFragment } from '@staff-portal/talents'

import { StepOperation, SecondaryOperation } from '../types'

export const SECONDARY_OPERATION_KEYS: SecondaryOperation[] = [
  StepOperation.Reset,
  StepOperation.Reassign,
  StepOperation.Unassign,
  StepOperation.SendIntroductionEmail,
  StepOperation.SendRestorationEmail,
  StepOperation.SendRescheduleEmail
]

export const getEnabledSecondaryOperations = ({
  operations
}: ActivationStepFragment) =>
  operations
    ? (SECONDARY_OPERATION_KEYS.map(key =>
        isOperationEnabled(operations[key]) ? key : null
      ).filter(Boolean) as SecondaryOperation[])
    : []
