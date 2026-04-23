import { useModal } from '@staff-portal/modals-service'

import { StepActionHook } from '../../../../types'
import ApprovePaymentStepModal from '../../ApprovePaymentStepModal'

export const useApprovePaymentStepModal: StepActionHook = ({
  roleStepId,
  onSuccess,
  talentId
}) => {
  const { showModal } = useModal(ApprovePaymentStepModal, {
    roleStepId,
    onSuccess,
    talentId
  })

  return { showModal }
}
