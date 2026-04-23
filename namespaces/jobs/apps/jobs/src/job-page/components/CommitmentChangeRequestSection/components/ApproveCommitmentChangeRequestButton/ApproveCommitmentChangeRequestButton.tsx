import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'

import ApproveCommitmentChangeRequestModal from '../ApproveCommitmentChangeRequestModal'

type Props = {
  jobId: string
  commitmentChangeRequestId: string
  disabled?: boolean
}

const ApproveCommitmentChangeRequestButton = ({
  jobId,
  commitmentChangeRequestId,
  disabled
}: Props) => {
  const { showModal } = useModal(ApproveCommitmentChangeRequestModal, {
    jobId,
    commitmentChangeRequestId
  })

  return (
    <Button
      data-testid='ApproveCommitmentChangeRequestButton'
      size='small'
      variant='positive'
      disabled={disabled}
      onClick={showModal}
    >
      Accept Request
    </Button>
  )
}

export default ApproveCommitmentChangeRequestButton
