import { useModal } from '@staff-portal/modals-service'

import { StepActionHook } from '../../../../types'
import ApproveGenericRoleStepModal from '../../ApproveGenericRoleStepModal'

export const useApproveGenericRoleStepModal: StepActionHook = ({
  roleStepId,
  onSuccess,
  talentId
}) => {
  const { showModal } = useModal(ApproveGenericRoleStepModal, {
    roleStepId,
    onSuccess,
    talentId
  })

  return { showModal }
}
