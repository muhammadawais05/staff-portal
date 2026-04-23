import { getRoleTypeText } from '@staff-portal/facilities'
import React from 'react'

import CandidateSendingSubmitButton from '../CandidateSendingSubmitButton'

interface Props {
  hasPendingAssignment: boolean
  talentType?: string | null
  onClick: () => void
}

const CandidateSendingSendButton = ({
  hasPendingAssignment,
  talentType,
  onClick
}: Props) => {
  const talentRoleType = getRoleTypeText(talentType)
  const buttonText = hasPendingAssignment
    ? `Assign ${talentRoleType}`
    : `Send ${talentRoleType}`

  return (
    <CandidateSendingSubmitButton
      variant='positive'
      data-testid='candidate-sending-send-button'
      onClick={onClick}
    >
      {buttonText}
    </CandidateSendingSubmitButton>
  )
}

export default CandidateSendingSendButton
