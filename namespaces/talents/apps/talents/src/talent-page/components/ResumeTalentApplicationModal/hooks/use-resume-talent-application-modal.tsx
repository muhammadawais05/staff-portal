import { useModal } from '@staff-portal/modals-service'

import ResumeTalentApplicationModal from '../ResumeTalentApplicationModal'
import useSendTalentToPortfolioReviewModal from '../../SendTalentToPortfolioReviewModal/hooks'

const useResumeTalentApplicationModal = ({
  talentId
}: {
  talentId: string
}) => {
  const { showModal } = useSendTalentToPortfolioReviewModal({ talentId })

  const { showModal: showResumeTalentApplicationModal } = useModal(
    ResumeTalentApplicationModal,
    {
      talentId,
      onSendToPortfolioReview: showModal
    }
  )

  return { showResumeTalentApplicationModal }
}

export default useResumeTalentApplicationModal
