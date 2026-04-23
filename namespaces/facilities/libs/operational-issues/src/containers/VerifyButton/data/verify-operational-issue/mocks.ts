import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import {
  VerifyOperationalIssueDocument,
  VerifyOperationalIssueMutation,
  VerifyOperationalIssueMutationVariables
} from './verify-operational-issue.staff.gql.types'

export const createVerifyOperationalIssueMock = (
  variables: VerifyOperationalIssueMutationVariables,
  data: Partial<VerifyOperationalIssueMutation['verifyOperationalIssue']> = {}
) => ({
  request: {
    query: VerifyOperationalIssueDocument,
    variables
  },
  result: {
    data: {
      verifyOperationalIssue: {
        errors: [],
        success: true,
        operationalIssue: {
          id: variables.operationalIssueId,
          operations: {
            approveOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            claimOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            reopenOperationalIssue: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            resolveOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            verifyOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            }
          },
          __typename: 'OperationalIssue'
        },
        __typename: 'MutationResult',
        ...data
      }
    }
  }
})

export const createVerifyOperationalIssueInvalidMock = (
  variables: VerifyOperationalIssueMutationVariables,
  errorMessage = 'Verify operational issue error.'
) => ({
  request: {
    query: VerifyOperationalIssueDocument,
    variables
  },
  error: new Error(errorMessage)
})
