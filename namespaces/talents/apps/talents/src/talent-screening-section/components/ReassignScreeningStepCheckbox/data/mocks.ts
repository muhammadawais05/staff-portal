import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { GET_REASSIGN_ROLE_STEP_OPERATION } from './get-reassign-role-step-operation.staff.gql'

export const createGetReassignRoleStepOperationMock = ({
  roleStepId,
  callable
}: {
  roleStepId: string
  callable: OperationCallableTypes
}) => ({
  request: {
    query: GET_REASSIGN_ROLE_STEP_OPERATION,
    variables: { roleStepId }
  },
  result: {
    data: {
      node: {
        id: roleStepId,
        operations: {
          reassignRoleStep: {
            callable,
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'RoleStepOperations'
        },
        __typename: 'RoleStep'
      }
    }
  }
})

export const createGetReassignRoleStepOperationFailedMock = (
  roleStepId: string,
  errorMessage = 'fake error message.'
) => ({
  request: {
    query: GET_REASSIGN_ROLE_STEP_OPERATION,
    variables: { roleStepId }
  },
  error: new Error(errorMessage)
})
