import fixtures from '@staff-portal/billing/src/_fixtures'

export const useGetConsolidationDefaults = jest.fn().mockReturnValue({
  data: fixtures.MockGetConsolidationDefaults.data,
  loading: false,
  initialLoading: false,
  refetch: jest.fn()
})
