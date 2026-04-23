import { EngagementStatus } from '@staff-portal/graphql/staff'
import React from 'react'

import CandidateSendingSubmitButton from '../CandidateSendingSubmitButton'

interface Props {
  engagementId?: string | null
  onClick: () => void
}

const CandidateSendingDraftButton = ({ engagementId, onClick }: Props) => {
  const updateDraft = !!engagementId

  const buttonText = updateDraft ? 'Update Draft' : 'Save Draft'

  return (
    <CandidateSendingSubmitButton
      variant='secondary'
      status={EngagementStatus.DRAFT}
      onClick={onClick}
      data-testid='candidate-sending-draft-button'
    >
      {buttonText}
    </CandidateSendingSubmitButton>
  )
}

export default CandidateSendingDraftButton
