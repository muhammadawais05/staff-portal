import { ClaimCallbackRequestInput } from '@staff-portal/graphql/staff'

import { CLAIM_CALL_REQUEST } from './claim-call-request.staff.gql'

export const createClaimCallRequestMock = (
  input: ClaimCallbackRequestInput,
  companyUrl = 'test.url'
) => ({
  request: { query: CLAIM_CALL_REQUEST, variables: { input } },
  result: {
    data: {
      claimCallbackRequest: {
        success: true,
        errors: [],
        callbackRequest: {
          id: 'test-id',
          client: {
            id: 'test-id',
            webResource: {
              url: companyUrl,
              __typename: 'Link'
            },
            __typename: 'Client'
          },
          __typename: 'ClaimCallbackRequestClientConnection'
        },
        __typename: 'ClaimCallbackRequestPayload'
      },
      __typename: 'MutationResult'
    }
  }
})

export const createClaimCallRequestFailedMock = (
  input: ClaimCallbackRequestInput
) => ({
  request: { query: CLAIM_CALL_REQUEST, variables: { input } },
  error: new Error('Error occurred')
})
