import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'

export const useBillingOptionUpdateActions = () => {
  const { handleOnOpenModal } = useModals()

  const handleOnUpdateBillingOption = (
    billingOptionId: string,
    clientId: string
  ) => {
    handleOnOpenModal(ModalKey.billingOptionUpdate, {
      nodeId: billingOptionId,
      clientId
    })
  }

  return {
    handleOnUpdateBillingOption
  }
}
