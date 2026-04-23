import { FINISH_RELATED_HANDOFFS } from './finish-related-handoffs.staff.gql'

export const createFinishRelatedHandoffsMock = () => ({
  request: { query: FINISH_RELATED_HANDOFFS, variables: {} },
  result: {
    data: {
      finishRelatedHandoffs: {
        success: true,
        errors: null,
        __typename: 'FinishRelatedHandoffsPayload'
      }
    }
  }
})

export const createFinishRelatedHandoffsInvalidMock = (
  errorMessage: string
) => ({
  request: { query: FINISH_RELATED_HANDOFFS, variables: {} },
  result: {
    data: {
      finishRelatedHandoffs: {
        success: false,
        errors: [
          {
            code: 'TEST_CODE',
            key: 'TEST_KEY',
            message: errorMessage,
            __typename: 'UserError'
          }
        ],
        __typename: 'FinishRelatedHandoffsPayload'
      }
    }
  }
})

export const createFinishRelatedHandoffsFailedMock = (
  errorMessage?: string
) => ({
  request: { query: FINISH_RELATED_HANDOFFS, variables: { input: {} } },
  error: new Error(errorMessage)
})
