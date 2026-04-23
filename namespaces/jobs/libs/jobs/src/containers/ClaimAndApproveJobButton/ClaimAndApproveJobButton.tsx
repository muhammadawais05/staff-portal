import React from 'react'
import { Button } from '@toptal/picasso'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useModal } from '@staff-portal/modals-service'

import ApproveJobModal from './components/ApproveJobModal'
import { JOB_UPDATED } from '../../messages'

export interface Props {
  jobId: string
  disabled?: boolean
}

const ClaimAndApproveJobButton = ({ jobId, disabled }: Props) => {
  const emitMessage = useMessageEmitter()

  const { showModal } = useModal(ApproveJobModal, {
    jobId,
    onApproveJob: () => emitMessage(JOB_UPDATED, { jobId })
  })

  return (
    <Button
      size='small'
      variant='positive'
      onClick={showModal}
      disabled={disabled}
      data-testid='claim-and-approve-job-button'
    >
      Claim and Approve Job
    </Button>
  )
}

export default ClaimAndApproveJobButton
