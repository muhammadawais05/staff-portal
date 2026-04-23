import {
  isOperationEnabled,
  isOperationHidden,
  OperationFragment
} from '@staff-portal/operations'

export const extractScheduleOperation = ([
  singleCommitInterviewOperation,
  timeSlotInterviewOperation
]: (OperationFragment | undefined)[]) => {
  const operations = [
    singleCommitInterviewOperation,
    timeSlotInterviewOperation
  ]

  const enabledOperation = operations.find(operation =>
    isOperationEnabled(operation)
  )

  if (enabledOperation) {
    return enabledOperation
  }

  return operations.find(operation => !isOperationHidden(operation))
}
