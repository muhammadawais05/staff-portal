import { act, renderHook } from '@testing-library/react-hooks'
import { mockedEmit } from '@toptal/staff-portal-message-bus'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

import { useActionsPurchaseOrderLine } from './useActionsPurchaseOrderLine'

const mockNotificationSuccess = jest.fn()
const mockNotificationError = jest.fn()
const error = { networkError: { response: 'Bad request', statusCode: 400 } }

const mockMutation = jest.fn()
const mockPurchaseOrderId = '123'

jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: () => [mockMutation]
}))
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo')
jest.mock('@toptal/picasso/utils', () => ({
  useNotifications: () => ({
    showError: mockNotificationError,
    showSuccess: mockNotificationSuccess
  })
}))

describe('useActionsPurchaseOrderLine', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('#handleOnArchivePurchaseOrderLine', () => {
    describe('when server responded', () => {
      describe('when `success` is `true` for Archive', () => {
        beforeEach(async () => {
          mockMutation.mockImplementation(() =>
            Promise.resolve({
              data: { archivePurchaseOrderLine: { errors: [], success: true } }
            })
          )
          const { result } = renderHook(() => useActionsPurchaseOrderLine())

          await act(() =>
            result.current.handleOnArchivePurchaseOrderLine(
              mockPurchaseOrderId,
              false
            )
          )
        })

        it('displays success notification', () => {
          expect(mockNotificationSuccess).toHaveBeenCalledTimes(1)
          expect(mockNotificationSuccess).toHaveBeenCalledWith(
            'Purchase order line has been archived'
          )
        })

        it('emits Apollo event', () => {
          expect(mockedEmit).toHaveBeenCalledTimes(1)
          expect(mockedEmit).toHaveBeenCalledWith(
            ApolloContextEvents.purchaseOrderLineArchiveToggle
          )
        })
      })

      describe('when `success` is `true` for Unarchive', () => {
        beforeEach(async () => {
          mockMutation.mockImplementation(() =>
            Promise.resolve({
              data: {
                unarchivePurchaseOrderLine: { errors: [], success: true }
              }
            })
          )
          const { result } = renderHook(() => useActionsPurchaseOrderLine())

          await act(() =>
            result.current.handleOnArchivePurchaseOrderLine(
              mockPurchaseOrderId,
              true
            )
          )
        })

        it('displays success notification', () => {
          expect(mockNotificationSuccess).toHaveBeenCalledTimes(1)
          expect(mockNotificationSuccess).toHaveBeenCalledWith(
            'Purchase order line has been unarchived'
          )
        })

        it('emits Apollo event', () => {
          expect(mockedEmit).toHaveBeenNthCalledWith(
            1,
            ApolloContextEvents.purchaseOrderLineArchiveToggle
          )
        })
      })

      describe('when `success` is `false`', () => {
        beforeEach(async () => {
          mockMutation.mockImplementation(() =>
            Promise.resolve({
              data: { archivePurchaseOrderLine: { errors: [], success: false } }
            })
          )
          const { result } = renderHook(() => useActionsPurchaseOrderLine())

          await act(() =>
            result.current.handleOnArchivePurchaseOrderLine(
              mockPurchaseOrderId,
              false
            )
          )
        })

        it('displays success notification', () => {
          expect(mockNotificationSuccess).not.toHaveBeenCalledTimes(1)
        })

        it('does not emit Apollo event', () => {
          expect(mockedEmit).not.toHaveBeenCalledTimes(1)
        })

        it('show error message', () => {
          expect(mockNotificationError).toHaveBeenCalledTimes(1)
        })
      })
    })

    describe('when error occurs', () => {
      beforeEach(async () => {
        mockMutation.mockImplementation(() => Promise.reject(error))
        const { result } = renderHook(() => useActionsPurchaseOrderLine())

        await act(() =>
          result.current.handleOnArchivePurchaseOrderLine(
            mockPurchaseOrderId,
            false
          )
        )
      })

      it('show error message', () => {
        expect(mockNotificationError).toHaveBeenCalledTimes(1)
      })
    })
  })
})
