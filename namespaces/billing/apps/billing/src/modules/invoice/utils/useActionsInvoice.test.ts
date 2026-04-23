import { act, renderHook } from '@testing-library/react-hooks'
import { mockedEmit } from '@toptal/staff-portal-message-bus'
import fixtures from '@staff-portal/billing/src/_fixtures'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import i18n from '@staff-portal/billing/src/utils/i18n'

import { useActionsInvoice } from './useActionsInvoice'

const mockNotificationSuccess = jest.fn()
const mockNotificationError = jest.fn()
const error = { networkError: { response: 'Bad request', statusCode: 400 } }

const mockMutation = jest.fn()

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

describe('useActionsInvoice', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('#handleOnApplyPromotions', () => {
    describe('when server responded', () => {
      describe('when `success` is `true`', () => {
        beforeEach(async () => {
          mockMutation.mockImplementation(() =>
            Promise.resolve({
              data: { applyPromotions: { errors: [], success: true } }
            })
          )
          const { result } = renderHook(() => useActionsInvoice())

          await act(() =>
            result.current.handleOnApplyPromotions(fixtures.MockInvoice.id)
          )
        })

        it('displays success notification', () => {
          expect(mockNotificationSuccess).toHaveBeenCalledTimes(1)
          expect(mockNotificationSuccess).toHaveBeenCalledWith(
            i18n.t('invoice:applyPromotions.notification.success')
          )
        })

        it('emits Apollo event', () => {
          expect(mockedEmit).toHaveBeenCalledTimes(1)
          expect(mockedEmit).toHaveBeenCalledWith(
            ApolloContextEvents.invoiceApplyPromotions
          )
        })
      })

      describe('when `success` is `false`', () => {
        beforeEach(async () => {
          mockMutation.mockImplementation(() =>
            Promise.resolve({
              data: { applyPromotions: { errors: [], success: false } }
            })
          )
          const { result } = renderHook(() => useActionsInvoice())

          await act(() =>
            result.current.handleOnApplyPromotions(fixtures.MockInvoice.id)
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
        const { result } = renderHook(() => useActionsInvoice())

        await act(() =>
          result.current.handleOnApplyPromotions(fixtures.MockInvoice.id)
        )
      })

      it('show error message', () => {
        expect(mockNotificationError).toHaveBeenCalledTimes(1)
      })
    })
  })
})
