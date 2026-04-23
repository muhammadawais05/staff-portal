import { PromptModal } from '@toptal/picasso'
import React from 'react'

import { useResumeSendingJobAway } from './hooks'

export interface Props {
  jobId: string
  hideModal: () => void
}

const RestoreSendingAwayModal = ({
  jobId,
  hideModal
}: Props) => {
  const { resumeSendingJobAway } = useResumeSendingJobAway({ jobId, hideModal })

  return (
    <PromptModal
      open
      onClose={hideModal}
      variant='negative'
      title='Restore Sending Away Job'
      message='Are you sure that you want to restore this job from sending away? Job will return to "pending talent" status. Talent will be able to apply and you can continue to search for a match.'
      submitText='Restore Sending Away'
      onSubmit={resumeSendingJobAway}
      data-testid='RestoreSendingAwayModal'
    />
  )
}

export default RestoreSendingAwayModal
