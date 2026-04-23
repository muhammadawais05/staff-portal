import { act, renderHook } from '@testing-library/react-hooks'

import { useModals } from '.'
import { ModalKey } from '../../../@types/types'

let mockDispatch = jest.fn()
let mockSetQuery = jest.fn()

jest.mock('../../../store', () => ({
  useStore: () => ({
    dispatch: mockDispatch
  })
}))

jest.mock('../useQueryParams', () => ({
  useQueryParams: () => ['test', mockSetQuery]
}))

describe('useModals', () => {
  beforeEach(() => {
    mockDispatch = jest.fn()
    mockSetQuery = jest.fn()
  })

  it('handleOnCloseModal', () => {
    const { result } = renderHook(() => useModals())

    act(() => {
      result.current.handleOnCloseModal()
    })

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'hideModal' })
    expect(mockSetQuery).toHaveBeenCalledTimes(1)
    expect(mockSetQuery).toHaveBeenCalledWith({
      billing_cycle_gid: undefined,
      engagement_id: undefined,
      invoice_id: undefined,
      memorandum_id: undefined,
      modal: undefined,
      notable_id: undefined,
      notable_type: undefined,
      note_id: undefined,
      variant: undefined
    })
  })

  it('handleOnOpenModal', () => {
    const { result } = renderHook(() => useModals())

    act(() => {
      result.current.handleOnOpenModal(ModalKey.timesheet, {
        engagementId: '1'
      })
    })

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        modalName: 'timesheet',
        options: { engagementId: '1' }
      },
      type: 'showModal'
    })
  })

  it('handleOnSetModalProps', () => {
    const { result } = renderHook(() => useModals())

    const mockNavigateTo = jest.fn()

    act(() => {
      result.current.handleOnSetModalProps({
        all: {
          handleNavigateTo: mockNavigateTo
        }
      })
    })

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        props: { all: { handleNavigateTo: mockNavigateTo } }
      },
      type: 'setModalProps'
    })
  })

  it('handleOnOpenModalWithUrlSearch', () => {
    const { result } = renderHook(() => useModals())

    act(() => {
      result.current.handleOnOpenModalWithUrlSearch(ModalKey.timesheet, {
        engagementId: '1'
      })
    })

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        modalName: 'timesheet',
        options: {
          engagementId: '1'
        }
      },
      type: 'showModal'
    })
    expect(mockSetQuery).toHaveBeenCalledTimes(1)
    expect(mockSetQuery).toHaveBeenCalledWith({
      engagement_id: '1',
      modal: 'timesheet'
    })
  })

  it('handleOnOpenModalWithUrlSearch without options', () => {
    const { result } = renderHook(() => useModals())

    act(() => {
      result.current.handleOnOpenModalWithUrlSearch(ModalKey.timesheet)
    })

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        modalName: 'timesheet'
      },
      type: 'showModal'
    })
    expect(mockSetQuery).toHaveBeenCalledTimes(1)
    expect(mockSetQuery).toHaveBeenCalledWith({
      modal: 'timesheet'
    })
  })
})
