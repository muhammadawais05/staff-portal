import { act, renderHook } from '@testing-library/react-hooks'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

import { usePreferEnterpriseBillingOptionMutation } from '../data'
import { useBillingOptionSetUnsetPreferredActions } from './useBillingOptionSetUnsetPreferredActions'

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
  usePreferEnterpriseBillingOptionMutation: jest.fn(),
  useUnsetPreferredBillingOptionMutation: jest.fn().mockReturnValue([])
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
let mockedUsePreferEnterpriseBillingOptionMutation = jest.fn()
const BILLING_OPTION_ID = 'ID'

describe('#useSetUnsetBillingOptionActions', () => {
  beforeEach(() => {
    mockedUsePreferEnterpriseBillingOptionMutation =
      usePreferEnterpriseBillingOptionMutation as jest.Mock
  })

  afterEach(jest.clearAllMocks)

  describe('handleOnPreferEnterpriseBillingOption', () => {
    it(`shows success notification when mutation is successful`, async () => {
      const mockPreferEnterpriseBillingOption = jest
        .fn()
        .mockResolvedValueOnce({
          data: {
            preferEnterpriseBillingOption: {
              success: true
            }
          }
        })

      mockedUsePreferEnterpriseBillingOptionMutation.mockReturnValueOnce([
        mockPreferEnterpriseBillingOption
      ])
      const { result } = renderHook(useBillingOptionSetUnsetPreferredActions)

      await act(() =>
        result.current.handleOnPreferEnterpriseBillingOption(BILLING_OPTION_ID)
      )

      expect(mockPreferEnterpriseBillingOption).toHaveBeenCalledTimes(1)
      expect(mockPreferEnterpriseBillingOption).toHaveBeenCalledWith({
        variables: {
          input: {
            billingOptionId: BILLING_OPTION_ID
          }
        }
      })
      expect(mockShowSuccess).toHaveBeenCalledTimes(1)
      expect(mockShowSuccess).toHaveBeenCalledWith(
        'actions.preferEnterpriseBillingOption.notification.success'
      )
      expect(mockEmitter).toHaveBeenCalledTimes(1)
      expect(mockEmitter).toHaveBeenNthCalledWith(
        1,
        ApolloContextEvents.preferEnterpriseBillingOption
      )
    })

    it(`shows error notification when mutation fails`, async () => {
      const mockPreferEnterpriseBillingOption = jest
        .fn()
        .mockResolvedValueOnce({
          data: {
            preferEnterpriseBillingOption: {
              success: false
            }
          }
        })

      mockedUsePreferEnterpriseBillingOptionMutation.mockReturnValueOnce([
        mockPreferEnterpriseBillingOption
      ])
      const { result } = renderHook(useBillingOptionSetUnsetPreferredActions)

      await act(() =>
        result.current.handleOnPreferEnterpriseBillingOption(BILLING_OPTION_ID)
      )

      expect(mockShowError).toHaveBeenCalledTimes(1)
      expect(mockShowError).toHaveBeenCalledWith(mockGetMessagesFromErrors)
    })

    it('shows error notification when mutation throws exception', async () => {
      const mockPreferEnterpriseBillingOption = jest
        .fn()
        .mockRejectedValueOnce(jest.fn())

      mockedUsePreferEnterpriseBillingOptionMutation.mockReturnValueOnce([
        mockPreferEnterpriseBillingOption
      ])
      const { result } = renderHook(useBillingOptionSetUnsetPreferredActions)

      await act(() =>
        result.current.handleOnPreferEnterpriseBillingOption(BILLING_OPTION_ID)
      )

      expect(mockShowError).toHaveBeenCalledTimes(1)
      expect(mockShowError).toHaveBeenCalledWith(mockGetMutationErrorMessage)
    })
  })
})
