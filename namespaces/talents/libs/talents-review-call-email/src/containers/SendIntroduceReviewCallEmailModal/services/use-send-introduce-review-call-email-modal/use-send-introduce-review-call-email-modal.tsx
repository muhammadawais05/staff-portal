import { useModal } from '@staff-portal/modals-service'

import SendIntroduceReviewCallEmailModal from '../../SendIntroduceReviewCallEmailModal'

export const useSendIntroduceReviewCallEmailModal = ({
  stepId,
  talentId
}: {
  stepId: string
  talentId: string
}) => {
  const { showModal } = useModal(SendIntroduceReviewCallEmailModal, {
    stepId,
    talentId
  })

  return {
    showModal
  }
}
