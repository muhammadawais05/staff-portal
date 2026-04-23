import { renderHook } from '@testing-library/react-hooks'
import { ModalKey } from '@staff-portal/billing/src/@types/types'

import { useWireBillingOptionVerificationActions } from './useWireBillingOptionVerificationActions'

const mockedHandleOnOpenModal = jest.fn()

jest.mock('@staff-portal/billing/src/_lib/customHooks/useModals', () => ({
  useModals: () => ({
    handleOnOpenModal: mockedHandleOnOpenModal
  })
}))

const billingOptionId = 'id'

describe('useWireBillingOptionVerificationActions', () => {
  afterEach(jest.clearAllMocks)

  describe('handleOnVerifyWireBillingOption', () => {
    it('opens a modal to verify a billing option', () => {
      const { result } = renderHook(useWireBillingOptionVerificationActions)

      result.current.handleOnVerifyWireBillingOption(billingOptionId)

      expect(mockedHandleOnOpenModal).toHaveBeenCalledTimes(1)
      expect(mockedHandleOnOpenModal).toHaveBeenCalledWith(
        ModalKey.billingOptionWireVerification,
        {
          nodeId: billingOptionId,
          isVerify: true
        }
      )
    })
  })

  describe('handleOnUnverifyWireBillingOption', () => {
    it('opens a modal to unverify a billing option', () => {
      const { result } = renderHook(useWireBillingOptionVerificationActions)

      result.current.handleOnUnverifyWireBillingOption(billingOptionId)

      expect(mockedHandleOnOpenModal).toHaveBeenCalledTimes(1)
      expect(mockedHandleOnOpenModal).toHaveBeenCalledWith(
        ModalKey.billingOptionWireVerification,
        {
          nodeId: billingOptionId,
          isVerify: false
        }
      )
    })
  })
})
