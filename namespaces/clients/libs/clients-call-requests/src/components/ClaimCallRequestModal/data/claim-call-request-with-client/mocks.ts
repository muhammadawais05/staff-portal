import { ClaimCallbackRequestWithClientInput } from '@staff-portal/graphql/staff'

import { CLAIM_CALL_REQUEST_WITH_CLIENT } from '.'

export const createClaimCallRequestWithClientMock = (
  input: ClaimCallbackRequestWithClientInput,
  companyUrl = 'test.url'
) => ({
  request: { query: CLAIM_CALL_REQUEST_WITH_CLIENT, variables: { input } },
  result: {
    data: {
      claimCallbackRequestWithClient: {
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
        __typename: 'ClaimCallbackRequestWithClientPayload'
      },
      __typename: 'MutationResult'
    }
  }
})
