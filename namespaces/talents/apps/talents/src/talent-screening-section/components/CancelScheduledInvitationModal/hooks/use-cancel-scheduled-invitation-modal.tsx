import { useModal } from '@staff-portal/modals-service'

import CancelScheduledInvitationModal from '../CancelScheduledInvitationModal'

export const useCancelScheduledInvitationModal = ({
  roleStepId,
  talentId
}: {
  roleStepId: string
  talentId: string
}) => {
  const { showModal } = useModal(CancelScheduledInvitationModal, {
    roleStepId,
    talentId
  })

  return {
    showModal
  }
}
