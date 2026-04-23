import { OperationCallableTypes } from '@staff-portal/graphql/staff'

export const createStaff = () => ({
  id: '123',
  fullName: 'TEST_NAME'
})

export const createOperation = (
  callable: OperationCallableTypes,
  messages: string[] = []
) => ({
  callable,
  messages
})
