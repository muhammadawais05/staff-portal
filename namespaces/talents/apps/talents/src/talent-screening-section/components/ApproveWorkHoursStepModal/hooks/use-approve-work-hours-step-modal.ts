import { useModal } from '@staff-portal/modals-service'

import { StepActionHook } from '../../../types'
import ApproveWorkHoursStepModal from '../ApproveWorkHoursStepModal'

export const useApproveWorkHoursStepModal: StepActionHook = ({
  roleStepId,
  onSuccess,
  talentId
}) => {
  const { showModal } = useModal(ApproveWorkHoursStepModal, {
    roleStepId,
    onSuccess,
    talentId
  })

  return { showModal }
}
