import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { GET_CREATE_TASK_OPERATION } from './get-create-task-operation.staff.gql'

export const getGetCreateTaskOperationMock = () => {
  return {
    request: { query: GET_CREATE_TASK_OPERATION },
    result: {
      data: {
        operations: {
          createTask: {
            callable: OperationCallableTypes.ENABLED,
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'OperationConnection'
        }
      }
    }
  }
}
