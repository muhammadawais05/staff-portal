import { RemoveCallbackRequestInput } from '@staff-portal/graphql/staff'

import { REMOVE_CALL_REQUEST } from './remove-call-request.staff.gql'

export const createRemoveCallRequestMock = (
  input: RemoveCallbackRequestInput
) => ({
  request: { query: REMOVE_CALL_REQUEST, variables: { input } },
  result: {
    data: {
      removeCallbackRequest: {
        success: true,
        errors: null,
        callbackRequest: {
          id: input.callbackRequestId,
          __typename: 'CallbackRequest'
        },
        __typename: 'RemoveCallbackRequestPayload'
      }
    }
  }
})

export const createRemoveCallRequestInvalidMock = (
  input: RemoveCallbackRequestInput,
  errorMessage: string
) => ({
  request: { query: REMOVE_CALL_REQUEST, variables: { input } },
  result: {
    data: {
      removeCallbackRequest: {
        success: false,
        errors: [
          {
            code: 'blank',
            key: 'comment',
            message: errorMessage,
            __typename: 'RemoveCallbackRequestPayloadError'
          }
        ],
        callbackRequest: null,
        __typename: 'RemoveCallbackRequestPayload'
      }
    }
  }
})

export const createRemoveCallRequestFailedMock = (
  input: RemoveCallbackRequestInput,
  errorMessage?: string
) => ({
  request: { query: REMOVE_CALL_REQUEST, variables: { input } },
  error: new Error(errorMessage)
})
