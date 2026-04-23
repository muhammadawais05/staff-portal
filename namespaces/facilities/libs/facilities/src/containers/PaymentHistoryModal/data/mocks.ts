import { DownloadRolePaymentHistoryMutationVariables } from './download-role-payment-history.staff.gql.types'
import { DOWNLOAD_ROLE_PAYMENT_HISTORY } from './download-role-payment-history.staff.gql'

export const createDownloadRolePaymentHistoryMock = (
  input: DownloadRolePaymentHistoryMutationVariables['input']
) => ({
  request: {
    query: DOWNLOAD_ROLE_PAYMENT_HISTORY,
    variables: {
      input
    }
  },
  result: {
    data: {
      downloadRolePaymentHistory: {
        success: true,
        errors: [],
        downloadUrl: 'downloadMockUrl',
        __typename: 'DownloadRolePaymentHistoryPayload'
      }
    }
  }
})

export const createDownloadRolePaymentHistoryFailedMock = (
  input: DownloadRolePaymentHistoryMutationVariables['input']
) => ({
  request: {
    query: DOWNLOAD_ROLE_PAYMENT_HISTORY,
    variables: {
      input
    }
  },
  error: new Error('Failed request')
})
