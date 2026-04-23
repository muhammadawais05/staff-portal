import { QueryParams } from '@staff-portal/query-params-state'
import { FiltersConfig, usePagination } from '@staff-portal/filters'
import { renderHook } from '@testing-library/react-hooks'

import useHandleTalentApplicantsFilters from './use-handle-talent-applicants-filters'

const PAGE_LIMIT = 40

jest.mock('@staff-portal/local-storage-service', () => ({
  localStorageService: {
    setItem: jest.fn(),
    getItem: () => PAGE_LIMIT
  }
}))

jest.mock('@staff-portal/filters')
jest.mock('@staff-portal/talents-list', () => ({
  searchBarCategories: {},
  DEFAULT_PAGE_SIZE: 10
}))

const usePaginationMock = usePagination as jest.Mock

const handleFilterChangeMock = jest.fn()

const arrangeTest = ({
  filtersConfig = [],
  filterValues,
  handleFilterChange = handleFilterChangeMock
}: {
  filtersConfig?: FiltersConfig
  filterValues: QueryParams
  handleFilterChange?: () => void
}) => {
  usePaginationMock.mockImplementation(({ limit }: { limit: number }) => ({
    filtersConfig,
    filterValues,
    handleFilterChange,
    limit
  }))
}

describe('useHandleTalentApplicantsFilter', () => {
  describe('when `Screening` filter is already set and `Activation` filter is set', () => {
    it('resets `Screening` filter', () => {
      const previousFilterValues = {
        applicant_filter: 'pending_online_test_completion'
      }
      const newFilterValues = {
        applicant_filter: 'pending_online_test_completion',
        activation_filter_type: 'pending_profile_creation'
      }

      arrangeTest({
        filterValues: previousFilterValues
      })

      const { result } = renderHook(() => useHandleTalentApplicantsFilters())

      result.current.handleFilterChange(newFilterValues)

      expect(handleFilterChangeMock).toHaveBeenCalledWith({
        applicant_filter: undefined,
        activation_filter_type: 'pending_profile_creation'
      })
    })
  })

  describe('when `Activation` filter is already set and `Screening` filter is set', () => {
    it('resets `Activation` filter', () => {
      const previousFilterValues = {
        activation_filter_type: 'pending_profile_creation'
      }
      const newFilterValues = {
        applicant_filter: 'pending_online_test_completion',
        activation_filter_type: 'pending_profile_creation'
      }

      arrangeTest({
        filterValues: previousFilterValues
      })

      const { result } = renderHook(() => useHandleTalentApplicantsFilters())

      result.current.handleFilterChange(newFilterValues)

      expect(handleFilterChangeMock).toHaveBeenCalledWith({
        applicant_filter: 'pending_online_test_completion',
        activation_filter_type: undefined
      })
    })
  })

  describe('when the hook renders', () => {
    it('returns stored page limit', () => {
      arrangeTest({
        filterValues: {}
      })

      const { result } = renderHook(() => useHandleTalentApplicantsFilters())

      expect(result.current.limit).toBe(PAGE_LIMIT)
    })
  })
})
