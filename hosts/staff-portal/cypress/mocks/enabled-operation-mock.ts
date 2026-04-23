import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'

export const enabledOperationMock = () =>
  ({
    callable: OperationCallableTypes.ENABLED,
    messages: [],
    __typename: 'Operation'
  } as Operation)
