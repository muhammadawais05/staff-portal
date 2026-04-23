import { renderHook } from '@testing-library/react-hooks'
import { useNotifications } from '@toptal/picasso/utils'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { useGetTeamOptions } from '@staff-portal/staff'

import { useFiltersConfig } from './use-filters-config'
import {
  useGetMatchersOptions,
  useGetSalesRepsOptions,
  useViewerPermits
} from '..'

jest.mock('@toptal/picasso/utils', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useGetCurrentUser: jest.fn()
}))

jest.mock('@staff-portal/staff', () => ({
  ...jest.requireActual('@staff-portal/staff'),
  useGetTeamOptions: jest.fn()
}))

jest.mock('..', () => ({
  ...jest.requireActual('..'),
  useGetMatchersOptions: jest.fn(),
  useGetSalesRepsOptions: jest.fn(),
  useGetStaffFilterAutocompleteOptions: jest.fn(),
  useGetStaffFilterAutocompleteLabel: jest.fn(),
  useViewerPermits: jest.fn()
}))

const mockUseNotifications = useNotifications as jest.Mock
const mockUseGetCurrentUser = useGetCurrentUser as jest.Mock
const mockUseGetMatchersOptions = useGetMatchersOptions as jest.Mock
const mockUseGetSalesRepsOptions = useGetSalesRepsOptions as jest.Mock
const mockUseViewerPermits = useViewerPermits as jest.Mock
const mockUseGetTeamOptions = useGetTeamOptions as jest.Mock

const arrangeTest = () => {
  mockUseNotifications.mockReturnValue({ showError: jest.fn() })
  mockUseGetCurrentUser.mockReturnValue({ id: '1', fullName: 'test name' })
  mockUseGetSalesRepsOptions.mockReturnValue({
    salesReps: null,
    loading: false
  })
  mockUseGetMatchersOptions.mockReturnValue({ matcher: null, loading: false })
  mockUseViewerPermits.mockReturnValue({ permits: {} })
  mockUseGetTeamOptions.mockReturnValue({ teamOptions: null, loading: false })
}

describe('useFiltersConfig', () => {
  describe('useGetTeamOptions', () => {
    it('do not request for teams if not permitted', () => {
      arrangeTest()
      renderHook(() => useFiltersConfig({}))

      expect(mockUseGetTeamOptions).toHaveBeenCalledWith({
        ids: expect.anything(),
        onError: expect.anything(),
        skip: true
      })
    })

    it('request for teams if permitted', () => {
      arrangeTest()
      mockUseViewerPermits.mockReturnValue({
        permits: { filterOnTeamIds: true }
      })
      renderHook(() => useFiltersConfig({}))

      expect(mockUseGetTeamOptions).toHaveBeenCalledWith({
        ids: expect.anything(),
        onError: expect.anything(),
        skip: false
      })
    })
  })
})
