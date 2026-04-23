import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'

import { paymentActionHandler } from './paymentActionHandler'

export const usePaymentActionHandler = () => {
  const { handleOnOpenModalWithUrlSearch: handleOnOpenModal } = useModals()
  const handleOnActionClick = paymentActionHandler({ handleOnOpenModal })

  return {
    handleOnActionClick
  }
}
