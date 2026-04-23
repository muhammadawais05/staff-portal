import { useModal } from '@staff-portal/modals-service'

import { StepActionHook } from '../../../../types'
import ApproveEnglishStepModal from '../../ApproveEnglishStepModal'

export const useApproveEnglishStepModal: StepActionHook = ({
  roleStepId,
  onSuccess,
  talentId
}) => {
  const { showModal } = useModal(ApproveEnglishStepModal, {
    roleStepId,
    onSuccess,
    talentId
  })

  return {
    showModal
  }
}
