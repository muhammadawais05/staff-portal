import { useModal } from '@staff-portal/modals-service'

import SendRestoreReviewCallEmailModal from '../../SendRestoreReviewCallEmailModal'

export const useSendRestoreReviewCallEmailModal = ({
  stepId,
  talentId
}: {
  stepId: string
  talentId: string
}) => {
  const { showModal } = useModal(SendRestoreReviewCallEmailModal, {
    stepId,
    talentId
  })

  return {
    showModal
  }
}
