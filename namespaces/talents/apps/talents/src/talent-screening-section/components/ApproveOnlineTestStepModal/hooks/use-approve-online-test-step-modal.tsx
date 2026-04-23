import { useModal } from '@staff-portal/modals-service'

import { StepActionHook } from '../../../types'
import ApproveOnlineTestStepModal from '../ApproveOnlineTestStepModal'

export const useApproveOnlineTestStepModal: StepActionHook = ({
  roleStepId,
  onSuccess,
  talentId
}) => {
  const { showModal } = useModal(ApproveOnlineTestStepModal, {
    roleStepId,
    onSuccess,
    talentId
  })

  return {
    showModal
  }
}
