import { OperationCallableTypes } from '@staff-portal/graphql/staff'

export const disabledOperationMock = (messages: string[] = []) => ({
  callable: OperationCallableTypes.DISABLED,
  messages: [...messages],
  __typename: 'Operation'
})
