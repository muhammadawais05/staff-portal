import React from 'react'
import { Typography, Button } from '@toptal/picasso'
import { Modal, ModalComponentBaseProps } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { NodeType } from '@staff-portal/graphql'

import { JOB_UPDATED } from '../../messages'
import { useResumePostponedJob } from './data'

export interface Props extends ModalComponentBaseProps {
  jobId: string
}

const RestorePostponedModal = ({ jobId, hideModal }: Props) => {
  const emitMessage = useMessageEmitter()
  const { showError, showSuccess } = useNotifications()
  const [resumePostponedJob, { loading }] = useResumePostponedJob({
    jobId,
    onCompleted: ({ resumePostponedJob: result }) => {
      if (result?.errors.length) {
        showError(concatMutationErrors(result?.errors))

        return
      }

      showSuccess('Job has been restored.')
      hideModal()
      emitMessage(JOB_UPDATED, { jobId })
    },
    onError: () => {
      showError('An error occurred, the job has not been restored.')
    }
  })

  return (
    <Modal
      open
      onClose={hideModal}
      size='small'
      data-testid='restore-postponed-job-modal'
      operationVariables={{
        nodeId: jobId,
        nodeType: NodeType.JOB,
        operationName: 'resumePostponedJob'
      }}
    >
      <Modal.Title>Restore Postponed Job</Modal.Title>
      <Modal.Content>
        <Typography size='medium'>
          Are you sure that you want to restore this job from postponed? Job
          will return to "pending talent" status. Talent will be able to apply
          and you can continue to search for a match.
        </Typography>
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Button
          data-testid='restore-postponed-submit-button'
          variant='positive'
          loading={loading}
          onClick={() => resumePostponedJob()}
        >
          Restore Postponed
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default RestorePostponedModal
