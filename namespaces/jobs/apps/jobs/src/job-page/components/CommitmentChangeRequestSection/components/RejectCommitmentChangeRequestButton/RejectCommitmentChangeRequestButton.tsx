import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'

import RejectCommitmentChangeRequestModal from '../RejectCommitmentChangeRequestModal'

type Props = {
  jobId: string
  jobTitle: string
  commitmentChangeRequestId: string
  clientId?: string
  disabled?: boolean
}

const RejectCommitmentChangeRequestButton = ({
  jobId,
  jobTitle,
  commitmentChangeRequestId,
  clientId,
  disabled
}: Props) => {
  const { showModal } = useModal(RejectCommitmentChangeRequestModal, {
    jobId,
    jobTitle,
    commitmentChangeRequestId,
    clientId
  })

  return (
    <Button
      data-testid='RejectCommitmentChangeRequestButton'
      size='small'
      variant='negative'
      disabled={disabled}
      onClick={showModal}
    >
      Reject Request
    </Button>
  )
}

export default RejectCommitmentChangeRequestButton
