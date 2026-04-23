import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'

import { paymentGroupActionHandler } from './paymentGroupActionHandler'
import { useActionsPaymentGroup } from './useActionsPaymentGroup'

export const usePaymentGroupActionHandler = () => {
  const {
    handleOnRemovePaymentFromPaymentGroup,
    handleOnRevertPaymentToPaymentGroup
  } = useActionsPaymentGroup()
  const { handleOnOpenModalWithUrlSearch: handleOnOpenModal } = useModals()
  const handleOnActionClick = paymentGroupActionHandler({
    handleOnRemovePaymentFromPaymentGroup,
    handleOnRevertPaymentToPaymentGroup,
    handleOnOpenModal
  })

  return {
    handleOnActionClick
  }
}
