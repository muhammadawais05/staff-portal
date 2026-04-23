import { act, renderHook } from '@testing-library/react-hooks'

import { useTimesheetModals } from '.'

let mockHandleOnOpenModalWithUrlSearch = jest.fn()

jest.mock('../useModals', () => ({
  useModals: () => ({
    handleOnOpenModalWithUrlSearch: mockHandleOnOpenModalWithUrlSearch
  })
}))

describe('useTimesheetModals', () => {
  beforeEach(() => {
    mockHandleOnOpenModalWithUrlSearch = jest.fn()
  })

  it('handleOnShowEdit', () => {
    const { result } = renderHook(() => useTimesheetModals())

    act(() => {
      result.current.handleOnShowEdit('VjEtQmlsbGluZ0N5Y2xlLTEyMzQ1', 'all')
    })

    expect(mockHandleOnOpenModalWithUrlSearch).toHaveBeenCalledTimes(1)
    expect(mockHandleOnOpenModalWithUrlSearch).toHaveBeenCalledWith(
      'timesheet-edit',
      {
        billingCycleId: '12345',
        variant: 'all'
      }
    )
  })

  it('handleOnShowView', () => {
    const { result } = renderHook(() => useTimesheetModals())

    act(() => {
      result.current.handleOnShowView('VjEtQmlsbGluZ0N5Y2xlLTEyMzQ1', 'all')
    })

    expect(mockHandleOnOpenModalWithUrlSearch).toHaveBeenCalledTimes(1)
    expect(mockHandleOnOpenModalWithUrlSearch).toHaveBeenCalledWith(
      'timesheet',
      {
        billingCycleId: '12345',
        variant: 'all'
      }
    )
  })

  it('handleOnUnsubmit', () => {
    const { result } = renderHook(() => useTimesheetModals())

    act(() => {
      result.current.handleOnUnsubmit('VjEtQmlsbGluZ0N5Y2xlLTEyMzQ1')
    })

    expect(mockHandleOnOpenModalWithUrlSearch).toHaveBeenCalledTimes(1)
    expect(mockHandleOnOpenModalWithUrlSearch).toHaveBeenCalledWith(
      'timesheet-unsubmit',
      {
        billingCycleId: '12345'
      }
    )
  })
})
