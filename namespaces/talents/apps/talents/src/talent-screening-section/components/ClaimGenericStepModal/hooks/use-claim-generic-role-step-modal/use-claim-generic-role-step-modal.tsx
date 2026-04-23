import { useModal } from '@staff-portal/modals-service'

import { StepActionHook } from '../../../../types'
import ClaimGenericStepModal from '../../ClaimGenericStepModal'

export const useClaimGenericRoleStepModal: StepActionHook = ({
  roleStepId,
  onSuccess,
  talentId
}) => {
  const { showModal } = useModal(ClaimGenericStepModal, {
    roleStepId,
    onSuccess,
    talentId
  })

  return { showModal }
}
