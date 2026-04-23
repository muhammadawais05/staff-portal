import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'

export const useWireBillingOptionVerificationActions = () => {
  const { handleOnOpenModal } = useModals()

  const handleOnVerifyWireBillingOption = (billingOptionId: string) => {
    handleOnOpenModal(ModalKey.billingOptionWireVerification, {
      nodeId: billingOptionId,
      isVerify: true
    })
  }

  const handleOnUnverifyWireBillingOption = (billingOptionId: string) => {
    handleOnOpenModal(ModalKey.billingOptionWireVerification, {
      nodeId: billingOptionId,
      isVerify: false
    })
  }

  return {
    handleOnVerifyWireBillingOption,
    handleOnUnverifyWireBillingOption
  }
}
