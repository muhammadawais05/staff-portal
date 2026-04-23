import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import {
  ClaimOperationalIssueDocument,
  ClaimOperationalIssueMutation,
  ClaimOperationalIssueMutationVariables
} from './claim-operational-issue.staff.gql.types'

export const createClaimOperationalIssueMock = (
  variables: ClaimOperationalIssueMutationVariables,
  data: Partial<ClaimOperationalIssueMutation['claimOperationalIssue']> = {}
) => ({
  request: {
    query: ClaimOperationalIssueDocument,
    variables
  },
  result: {
    data: {
      claimOperationalIssue: {
        success: true,
        errors: [],
        operationalIssue: {
          id: variables.input.operationalIssueId,
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
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            resolveOperationalIssue: {
              callable: OperationCallableTypes.ENABLED,
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

export const createClaimOperationalIssueInvalidMock = (
  variables: ClaimOperationalIssueMutationVariables,
  errorMessage = 'Claim operational issue error.'
) => ({
  request: {
    query: ClaimOperationalIssueDocument,
    variables
  },
  error: new Error(errorMessage)
})
