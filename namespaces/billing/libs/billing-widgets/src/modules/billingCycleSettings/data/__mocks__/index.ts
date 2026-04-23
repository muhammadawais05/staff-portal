export const useSetChangeProductBillingFrequencyMutation = () => [
  jest.fn().mockResolvedValue({
    data: {
      useSetChangeProductBillingFrequencyMutation: {
        job: {
          id: 'VjEtSm9iLTE2OTM4Ng'
        },
        errors: [],
        notice: null,
        success: true
      }
    }
  })
]

export const useGetBillingCycleSettingsData = jest.fn().mockReturnValue({
  data: {},
  loading: false,
  initialLoading: false,
  changeProductBillingFrequencyOperation: {
    callable: 'ENABLED'
  },
  refetch: jest.fn()
})
