import { useModal } from '@staff-portal/modals-service'

import { StepActionHook } from '../../../../types'
import ClaimEnglishStepModal from '../../ClaimEnglishStepModal'

export const useClaimEnglishStepModal: StepActionHook = ({
  roleStepId,
  onSuccess,
  talentId
}) => {
  const { showModal } = useModal(ClaimEnglishStepModal, {
    roleStepId,
    onSuccess,
    talentId
  })

  return { showModal }
}
