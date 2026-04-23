import { useModal } from '@staff-portal/modals-service'

import { StepActionHook } from '../../../../types'
import ClaimOnlineTestStepModal from '../../ClaimOnlineTestStepModal'

export const useClaimOnlineTestStepModal: StepActionHook = ({
  roleStepId,
  onSuccess,
  talentId
}) => {
  const { showModal } = useModal(ClaimOnlineTestStepModal, {
    roleStepId,
    onSuccess,
    talentId
  })

  return { showModal }
}
