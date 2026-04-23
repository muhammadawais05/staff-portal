import { act, renderHook } from '@testing-library/react-hooks'
import { useNotifications } from '@toptal/picasso/utils'
import { useTranslation } from 'react-i18next'
import { mockedEmit } from '@toptal/staff-portal-message-bus'
import { useConfirmations } from '@staff-portal/billing/src/_lib/customHooks/useConfirmations'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'

import { useActionsNote } from '.'

const mockMutation = jest.fn()
const mockHandleCloseModal = jest.fn()
const mockHandleOutboundEventEmit = jest.fn()
const mockShowError = jest.fn()
const mockShowSuccess = jest.fn()
const mockHandleOnOpenConfirmation = jest.fn()
const mockHandleOnCloseConfirmation = jest.fn()
const mockHandleOnSetConfirmation = jest.fn()

jest.mock('@toptal/picasso/utils')
jest.mock('react-i18next')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo')
jest.mock('@staff-portal/billing/src/_lib/customHooks/useConfirmations')
jest.mock('@staff-portal/billing/src/store', () => ({
  useStore: () => ({
    state: { modal: { options: { billingCycleGid: 'gid//test' } } }
  })
}))
jest.mock('@staff-portal/billing/src/_lib/context/externalIntegratorContext')
jest.mock('@staff-portal/billing/src/_lib/customHooks/useModals')
jest.mock('@staff-portal/data-layer-service/src/hooks/use-mutation', () => ({
  useMutation: () => [mockMutation]
}))
;(useModals as jest.Mock).mockReturnValue({
  handleOnCloseModal: mockHandleCloseModal
})
useExternalIntegratorContext.mockReturnValue({
  handleOutboundEventEmit: mockHandleOutboundEventEmit
})
useTranslation.mockReturnValue({
  t: args => args
})
useNotifications.mockReturnValue({
  showError: mockShowError,
  showSuccess: mockShowSuccess
})
useConfirmations.mockReturnValue({
  handleOnCloseConfirmation: mockHandleOnCloseConfirmation,
  handleOnOpenConfirmation: mockHandleOnOpenConfirmation,
  handleOnSetConfirmation: mockHandleOnSetConfirmation
})

const error = { networkError: { response: 'Bad request', statusCode: 400 } }
const mockDeleteInput = {
  noteId: '12345'
}

describe('useActionsNotes', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('#handleOnDelete', () => {
    beforeEach(() => {
      const { result } = renderHook(() => useActionsNote())

      act(() => result.current.handleOnDelete(mockDeleteInput))
    })

    it('trigger confirmation', () => {
      expect(mockHandleOnOpenConfirmation).toHaveBeenCalledTimes(1)
      expect(mockHandleOnOpenConfirmation).toHaveBeenCalledWith({
        actionTitle: 'modal.note.confirm',
        description: 'modal.note.description',
        onSuccess: expect.any(Function),
        title: 'modal.note.title'
      })
    })
  })

  describe('#handleOnDeleteSuccess', () => {
    beforeEach(async () => {
      mockMutation.mockImplementation(() => Promise.resolve())
      const { result } = renderHook(() => useActionsNote())

      await act(() => result.current.handleOnDeleteSuccess(mockDeleteInput))
    })

    it('closing the modal', () => {
      expect(mockHandleOnCloseConfirmation).toHaveBeenCalledTimes(1)
    })

    it('emitting apollo event', () => {
      expect(mockedEmit).toHaveBeenCalledTimes(1)
      expect(mockedEmit).toHaveBeenCalledWith({ metaData: 'note:delete' })
    })

    it('show success message', () => {
      expect(mockShowSuccess).toHaveBeenCalledTimes(1)
      expect(mockShowSuccess).toHaveBeenCalledWith(
        'notification.success.delete'
      )
    })

    describe('when error occurs', () => {
      beforeEach(async () => {
        mockMutation.mockImplementation(() => Promise.reject(error))
        const { result } = renderHook(() => useActionsNote())

        await act(() => result.current.handleOnDeleteSuccess(mockDeleteInput))
      })

      it('show error message', () => {
        expect(mockShowError).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('#handleOnDeleteAttachment', () => {
    beforeEach(() => {
      const { result } = renderHook(() => useActionsNote())

      act(() => result.current.handleOnDeleteAttachment(mockDeleteInput))
    })

    it('trigger confirmation', () => {
      expect(mockHandleOnOpenConfirmation).toHaveBeenCalledTimes(1)
      expect(mockHandleOnOpenConfirmation).toHaveBeenCalledWith({
        actionTitle: 'modal.attachment.title',
        description: 'modal.attachment.description',
        onSuccess: expect.any(Function),
        title: 'modal.attachment.title'
      })
    })
  })

  describe('#handleOnDeleteAttachmentSuccess', () => {
    beforeEach(async () => {
      mockMutation.mockImplementation(() => Promise.resolve())
      const { result } = renderHook(() => useActionsNote())

      await act(() =>
        result.current.handleOnDeleteAttachmentSuccess(mockDeleteInput)
      )
    })

    it('closing the modal', () => {
      expect(mockHandleOnCloseConfirmation).toHaveBeenCalledTimes(1)
    })

    it('emitting apollo event', () => {
      expect(mockedEmit).toHaveBeenCalledTimes(1)
      expect(mockedEmit).toHaveBeenCalledWith({
        metaData: 'note:delete-attachment'
      })
    })

    it('show success message', () => {
      expect(mockShowSuccess).toHaveBeenCalledTimes(1)
      expect(mockShowSuccess).toHaveBeenCalledWith(
        'notification.success.deleteAttachment'
      )
    })

    describe('when error occurs', () => {
      beforeEach(async () => {
        mockMutation.mockImplementation(() => Promise.reject(error))
        const { result } = renderHook(() => useActionsNote())

        await act(() =>
          result.current.handleOnDeleteAttachmentSuccess(mockDeleteInput)
        )
      })

      it('show error message', () => {
        expect(mockShowError).toHaveBeenCalledTimes(1)
      })
    })
  })
})
