import { Operation } from '@staff-portal/graphql/staff'

export const checkEngagementOperationByCondition = (
  condition: boolean,
  operations: (Operation | null | undefined)[]
) => {
  if (!condition) {
    return false
  }

  return checkAvailableEngagementOperations(operations)
}

export const checkAvailableEngagementOperations = (
  operations: (Operation | null | undefined)[]
) =>
  operations.some(operation => !!operation && operation.callable !== 'HIDDEN')
