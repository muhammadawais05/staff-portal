import { act, renderHook } from '@testing-library/react-hooks'
import { mockedEmit } from '@toptal/staff-portal-message-bus'
import fixtures from '@staff-portal/billing/src/_fixtures'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

import { useActionsPurchaseOrder } from './useActionsPurchaseOrder'

const mockNotificationSuccess = jest.fn()
const mockNotificationError = jest.fn()
const error = { networkError: { response: 'Bad request', statusCode: 400 } }

const mockMutation = jest.fn()
const mockPurchaseOrderId = fixtures.MockPurchaseOrders.nodes[0].id

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

describe('useActionsPurchaseOrder', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('#handleOnArchivePurchaseOrder', () => {
    describe('when server responded', () => {
      describe('when `success` is `true` for Archive', () => {
        beforeEach(async () => {
          mockMutation.mockImplementation(() =>
            Promise.resolve({
              data: { archivePurchaseOrder: { errors: [], success: true } }
            })
          )
          const { result } = renderHook(() => useActionsPurchaseOrder())

          await act(() =>
            result.current.handleOnArchivePurchaseOrder(
              mockPurchaseOrderId,
              false
            )
          )
        })

        it('displays success notification', () => {
          expect(mockNotificationSuccess).toHaveBeenCalledTimes(1)
          expect(mockNotificationSuccess).toHaveBeenCalledWith(
            'Purchase order has been archived'
          )
        })

        it('emits Apollo event', () => {
          expect(mockedEmit).toHaveBeenCalledTimes(1)
          expect(mockedEmit).toHaveBeenCalledWith(
            ApolloContextEvents.purchaseOrderArchiveToggle
          )
        })
      })

      describe('when `success` is `true` for Unarchive', () => {
        beforeEach(async () => {
          mockMutation.mockImplementation(() =>
            Promise.resolve({
              data: { unarchivePurchaseOrder: { errors: [], success: true } }
            })
          )
          const { result } = renderHook(() => useActionsPurchaseOrder())

          await act(() =>
            result.current.handleOnArchivePurchaseOrder(
              mockPurchaseOrderId,
              true
            )
          )
        })

        it('displays success notification', () => {
          expect(mockNotificationSuccess).toHaveBeenCalledTimes(1)
          expect(mockNotificationSuccess).toHaveBeenCalledWith(
            'Purchase order has been unarchived'
          )
        })

        it('emits Apollo event', () => {
          expect(mockedEmit).toHaveBeenNthCalledWith(
            1,
            ApolloContextEvents.purchaseOrderArchiveToggle
          )
        })
      })

      describe('when `success` is `false`', () => {
        beforeEach(async () => {
          mockMutation.mockImplementation(() =>
            Promise.resolve({
              data: { archivePurchaseOrder: { errors: [], success: false } }
            })
          )
          const { result } = renderHook(() => useActionsPurchaseOrder())

          await act(() =>
            result.current.handleOnArchivePurchaseOrder(
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
        const { result } = renderHook(() => useActionsPurchaseOrder())

        await act(() =>
          result.current.handleOnArchivePurchaseOrder(
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
