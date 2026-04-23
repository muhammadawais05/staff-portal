import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { GetUserQueryOperationDocument } from './get-user-query-operations.staff.gql.types'

export const createUserQueryOperationsMock = (
  callable: OperationCallableTypes = OperationCallableTypes.ENABLED
) => ({
  request: { query: GetUserQueryOperationDocument },
  result: {
    data: {
      operations: {
        createTalentQuizQuestion: {
          callable,
          messages: [],
          __typename: 'Operation'
        },
        cloneTalentQuizQuestion: {
          callable,
          messages: [],
          __typename: 'Operation'
        },
        __typename: 'QueryOperations'
      }
    }
  }
})
