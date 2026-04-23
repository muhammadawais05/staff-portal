import { act, renderHook } from '@testing-library/react-hooks'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

import { useReverifyCreditCardBillingOptionMutation } from '../data'
import { useBillingOptionCreditCardActions } from './useBillingOptionCreditCardActions'

jest.mock('@toptal/picasso', () => jest.fn())
jest.mock('@toptal/picasso/utils', () => ({
  useNotifications: () => ({
    showError: mockShowError,
    showSuccess: mockShowSuccess
  })
}))
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))
jest.mock('@toptal/staff-portal-message-bus', () => ({
  defineMessage: jest.fn(),
  useMessageEmitter: () => mockEmitter
}))
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useConfirmations',
  () => ({
    useConfirmations: () => mockHandleOnOpenConfirmation
  })
)
jest.mock('../data', () => ({
  useReverifyCreditCardBillingOptionMutation: jest.fn().mockReturnValue([])
}))
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo', () => ({
  getMessagesFromErrors: () => mockGetMessagesFromErrors,
  getMutationErrorMessage: () => mockGetMutationErrorMessage
}))
jest.mock('@staff-portal/billing/src/_lib/customHooks/useQueryParams', () => ({
  useQueryParams: () => ['test', jest.fn()]
}))

const mockHandleOnOpenConfirmation = jest.fn()
const mockEmitter = jest.fn()
const mockShowError = jest.fn()
const mockShowSuccess = jest.fn()
const mockGetMessagesFromErrors = jest.fn()
const mockGetMutationErrorMessage = jest.fn()
let mockUseReverifyCreditCardBillingOptionMutation = jest.fn()
const BILLING_OPTION_ID = 'ID'

describe('#useBillingOptionCreditCardActions', () => {
  beforeEach(() => {
    mockUseReverifyCreditCardBillingOptionMutation =
      useReverifyCreditCardBillingOptionMutation as jest.Mock
  })

  afterEach(jest.clearAllMocks)

  describe('handleOnReverifyCreditCardBillingOption', () => {
    it(`shows success notification when mutation is successful`, async () => {
      const mockReverifyCreditCardBillingOption = jest
        .fn()
        .mockResolvedValueOnce({
          data: {
            reverifyCreditCardBillingOption: {
              success: true
            }
          }
        })

      mockUseReverifyCreditCardBillingOptionMutation.mockReturnValueOnce([
        mockReverifyCreditCardBillingOption
      ])
      const { result } = renderHook(useBillingOptionCreditCardActions)

      await act(() =>
        result.current.handleOnReverifyCreditCardBillingOption(
          BILLING_OPTION_ID
        )
      )

      expect(mockReverifyCreditCardBillingOption).toHaveBeenCalledTimes(1)
      expect(mockReverifyCreditCardBillingOption).toHaveBeenCalledWith({
        variables: {
          input: {
            billingOptionId: BILLING_OPTION_ID
          }
        }
      })
      expect(mockShowSuccess).toHaveBeenCalledTimes(1)
      expect(mockShowSuccess).toHaveBeenCalledWith(
        'actions.reverifyCreditCardBillingOption.notification.success'
      )
      expect(mockEmitter).toHaveBeenCalledTimes(1)
      expect(mockEmitter).toHaveBeenNthCalledWith(
        1,
        ApolloContextEvents.reverifyCreditCardBillingOption
      )
    })

    it(`shows error notification when mutation fails`, async () => {
      const mockReverifyCreditCardBillingOption = jest
        .fn()
        .mockResolvedValueOnce({
          data: {
            reverifyCreditCardBillingOption: {
              success: false
            }
          }
        })

      mockUseReverifyCreditCardBillingOptionMutation.mockReturnValueOnce([
        mockReverifyCreditCardBillingOption
      ])
      const { result } = renderHook(useBillingOptionCreditCardActions)

      await act(() =>
        result.current.handleOnReverifyCreditCardBillingOption(
          BILLING_OPTION_ID
        )
      )

      expect(mockShowError).toHaveBeenCalledTimes(1)
      expect(mockShowError).toHaveBeenCalledWith(mockGetMessagesFromErrors)
    })

    it('shows error notification when mutation throws exception', async () => {
      const mockReverifyCreditCardBillingOption = jest
        .fn()
        .mockRejectedValueOnce(jest.fn())

      mockUseReverifyCreditCardBillingOptionMutation.mockReturnValueOnce([
        mockReverifyCreditCardBillingOption
      ])
      const { result } = renderHook(useBillingOptionCreditCardActions)

      await act(() =>
        result.current.handleOnReverifyCreditCardBillingOption(
          BILLING_OPTION_ID
        )
      )

      expect(mockShowError).toHaveBeenCalledTimes(1)
      expect(mockShowError).toHaveBeenCalledWith(mockGetMutationErrorMessage)
    })
  })
})
