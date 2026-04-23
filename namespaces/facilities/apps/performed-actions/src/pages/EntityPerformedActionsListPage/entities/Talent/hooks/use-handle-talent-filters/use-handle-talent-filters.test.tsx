import { renderHook, act } from '@testing-library/react-hooks'
import { useLocation } from '@staff-portal/navigation'

import useHandleTalentFilters from './use-handle-talent-filters'
import { TalentPerformedActionsChangeTypeFilter } from '../../enums'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  __esModule: true,
  useLocation: jest.fn()
}))
const mockUseLocation = useLocation as jest.Mock

const arrangeTest = ({ search }: { search: string }) => {
  mockUseLocation.mockReturnValue({ search })
}

describe('useHandleTalentFilters', () => {
  it('returns parsed url values', async () => {
    arrangeTest({
      search: '?change_type%5B%5D=availability_change&change_type%5B%5D=flags'
    })

    const { result } = renderHook(() => useHandleTalentFilters())

    await act(() => Promise.resolve())

    expect(result.current.filterValues).toEqual({
      changeType: [
        TalentPerformedActionsChangeTypeFilter.AvailabilityChange,
        TalentPerformedActionsChangeTypeFilter.Flags
      ]
    })
  })

  describe('When `change_type` url value is not an array', () => {
    it('returns parsed url values', async () => {
      arrangeTest({
        search: '?change_type=string'
      })

      const { result } = renderHook(() => useHandleTalentFilters())

      await act(() => Promise.resolve())

      expect(result.current.filterValues).toEqual({
        changeType: []
      })
    })
  })

  describe('When `change_type` url value has a few invalid values', () => {
    it('returns parsed url values', async () => {
      arrangeTest({
        search:
          '?change_type%5B%5D=availability_change&change_type%5B%5D=foo&change_type%5B%5D=flags'
      })

      const { result } = renderHook(() => useHandleTalentFilters())

      await act(() => Promise.resolve())

      expect(result.current.filterValues).toEqual({
        changeType: [
          TalentPerformedActionsChangeTypeFilter.AvailabilityChange,
          TalentPerformedActionsChangeTypeFilter.Flags
        ]
      })
    })
  })

  describe('When `change_type` url value has all invalid values', () => {
    it('returns parsed url values', async () => {
      arrangeTest({
        search: '?change_type%5B%5D=foo&change_type%5B%5D=bar'
      })

      const { result } = renderHook(() => useHandleTalentFilters())

      await act(() => Promise.resolve())

      expect(result.current.filterValues).toEqual({
        changeType: []
      })
    })
  })
})
