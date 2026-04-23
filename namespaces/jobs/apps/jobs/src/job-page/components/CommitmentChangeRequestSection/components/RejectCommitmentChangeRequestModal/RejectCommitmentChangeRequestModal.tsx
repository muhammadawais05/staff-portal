import { useMutation } from '@staff-portal/data-layer-service'
import { Container, Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React from 'react'
import { NodeType } from '@staff-portal/graphql'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { useSendEmailModal } from '@staff-portal/communication-send-email'

import { RejectCommitmentChangeRequestDocument } from './data'

export interface Props {
  jobId: string
  jobTitle?: string
  commitmentChangeRequestId?: string
  clientId?: string
  hideModal: () => void
}

const RejectCommitmentChangeRequestModal = ({
  jobTitle,
  commitmentChangeRequestId,
  ...props
}: Props) => {
  if (!jobTitle || !commitmentChangeRequestId) {
    return null
  }

  return (
    <RejectCommitmentChangeRequestModalBody
      jobTitle={jobTitle}
      commitmentChangeRequestId={commitmentChangeRequestId}
      {...props}
    />
  )
}

export interface ModalBodyProps extends Props {
  jobTitle: string
  commitmentChangeRequestId: string
}

const RejectCommitmentChangeRequestModalBody = ({
  jobId,
  jobTitle,
  commitmentChangeRequestId,
  clientId,
  hideModal
}: ModalBodyProps) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const { showModal: showSendEmailModal } = useSendEmailModal()

  const [rejectRequest, { loading }] = useMutation(
    RejectCommitmentChangeRequestDocument,
    {
      onError: () => showError('Unable to reject request.')
    }
  )

  const handleSubmit = async (comment = '') => {
    const { data } = await rejectRequest({
      variables: {
        input: { commitmentChangeRequestId, comment }
      }
    })

    return handleMutationResult({
      mutationResult: data?.rejectCommitmentChangeRequest,
      successNotificationMessage:
        'Commitment change request was successfully rejected.',
      onSuccessAction: () => {
        emitMessage(JOB_UPDATED, { jobId })
        hideModal()

        if (clientId) {
          showSendEmailModal({ nodeId: clientId })
        }
      }
    })
  }

  const content = (
    <>
      <Container bottom='medium'>
        <Typography size='medium' weight='semibold'>
          {jobTitle}
        </Typography>
      </Container>

      <Container bottom='medium'>
        <Typography size='medium'>
          What is your reason for rejecting the commitment change request?
        </Typography>
      </Container>
    </>
  )

  return (
    <ConfirmationModal
      data-testid='RejectCommitmentChangeRequestModal'
      variant='negative'
      required
      message={content}
      title='Reject Commitment Change Request'
      submitText='Reject Request'
      label='Comment'
      textFieldName='comment'
      onSubmit={handleSubmit}
      onClose={hideModal}
      loading={loading}
      operationVariables={{
        nodeId: commitmentChangeRequestId,
        nodeType: NodeType.COMMITMENT_CHANGE_REQUEST,
        operationName: 'rejectCommitmentChangeRequest'
      }}
    />
  )
}

export default RejectCommitmentChangeRequestModal
