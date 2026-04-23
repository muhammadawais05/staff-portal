import { useModal } from '@staff-portal/modals-service'
import { useState } from 'react'

import SendTalentToPortfolioReviewModal from '../SendTalentToPortfolioReviewModal'

const useSendTalentToPortfolioReviewModal = ({
  onSuccess,
  talentId
}: {
  talentId: string
  onSuccess?: () => void
}) => {
  const [emailTemplateId, setEmailTemplateId] = useState<string | undefined>()
  const { showModal } = useModal(SendTalentToPortfolioReviewModal, {
    talentId,
    emailTemplateId,
    onSuccess
  })

  const handleShowModal = (newEmailTemplateId?: string) => {
    setEmailTemplateId(newEmailTemplateId)
    showModal()
  }

  return {
    showModal: handleShowModal
  }
}

export default useSendTalentToPortfolioReviewModal
