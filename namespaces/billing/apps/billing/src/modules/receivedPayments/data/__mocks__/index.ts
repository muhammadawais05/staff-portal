export const useDownloadRolePaymentHistoryMutation = () => [
  jest.fn().mockResolvedValue({
    data: {
      downloadRolePaymentHistory: {
        clientMutationId: null,
        downloadUrl:
          'https://staging.toptal.net/platform/roles/725325/payment_history/download.pdf?end_date=2021-04-08&start_date=2021-04-08',
        role: {
          id: 'VjEtU3RhZmYtNzI1MzI1'
        },
        errors: [],
        notice: null,
        success: true
      }
    }
  })
]

export const useDownloadCommissionsMutation = () => [
  jest.fn().mockResolvedValue({
    data: {
      downloadRolePaymentHistory: {
        downloadUrl: 'some-link',
        errors: [],
        success: true
      }
    }
  })
]
