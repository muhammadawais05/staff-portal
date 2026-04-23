import { EngagementStatus } from '@staff-portal/graphql/staff'
import React from 'react'

import CandidateSendingSubmitButton from '../CandidateSendingSubmitButton'

interface Props {
  engagementId?: string | null
  onClick: () => void
}

const CandidateSendingPendingApprovalButton = ({
  engagementId,
  onClick
}: Props) => {
  const buttonText = engagementId
    ? 'Update and Notify Approver'
    : 'Save and Notify Approver'

  return (
    <CandidateSendingSubmitButton
      variant='secondary'
      data-testid='candidate-sending-pending-approval-button'
      status={EngagementStatus.PENDING_APPROVAL}
      onClick={onClick}
    >
      {buttonText}
    </CandidateSendingSubmitButton>
  )
}

export default CandidateSendingPendingApprovalButton
