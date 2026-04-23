import { useModal } from '@staff-portal/modals-service'

import { StepActionHook } from '../../../types'
import ClaimTechnicalGenericStepModal from '../ClaimTechnicalGenericStepModal'

export const useClaimTechnicalGenericStepModal: StepActionHook = ({
  roleStepId,
  onSuccess,
  talentId
}) => {
  const { showModal } = useModal(ClaimTechnicalGenericStepModal, {
    roleStepId,
    onSuccess,
    talentId
  })

  return {
    showModal
  }
}
