import { act, renderHook } from '@testing-library/react-hooks'

import { useConfirmations } from '.'

let mockDispatch = jest.fn()

jest.mock('../../../store', () => ({
  useStore: () => ({
    dispatch: mockDispatch
  })
}))

describe('useConfirmations', () => {
  beforeEach(() => {
    mockDispatch = jest.fn()
  })

  it('#handleOnCloseConfirmation', () => {
    const { result } = renderHook(() => useConfirmations())

    act(() => {
      result.current.handleOnCloseConfirmation()
    })

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'hideConfirmation' })
  })

  it('#handleOnSetConfirmation', () => {
    const { result } = renderHook(() => useConfirmations())

    act(() => {
      result.current.handleOnSetConfirmation({
        actionIsLoading: true
      })
    })

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        actionIsLoading: true
      },
      type: 'setConfirmation'
    })
  })

  it('#handleOnOpenConfirmation', () => {
    const { result } = renderHook(() => useConfirmations())
    const mockOnSuccess = jest.fn()

    act(() => {
      result.current.handleOnOpenConfirmation({
        actionTitle: 'test title',
        onSuccess: mockOnSuccess
      })
    })

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        actionTitle: 'test title',
        onSuccess: mockOnSuccess
      },
      type: 'showConfirmation'
    })
  })
})
