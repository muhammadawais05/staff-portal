import React, { useMemo, useState } from 'react'
import { Button } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { Maybe } from '@staff-portal/graphql/staff'
import { useGetData, useMutation } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import { NodeType } from '@staff-portal/graphql'
import { JOB_UPDATED } from '@staff-portal/jobs'
import {
  NOT_SELECTED_OPTION,
  NOT_SELECTED_PLACEHOLDER
} from '@staff-portal/config'

import {
  JobPendingTalentReasonsDocument,
  UpdateTalentPendingReasonDocument
} from './data'

interface Props {
  pendingTalentReason?: Maybe<string>
  jobId: string
  hideModal: () => void
}

type FormValues = {
  reason: string
  reasonNotes: string
}

const PendingTalentReasonModal = ({
  jobId,
  pendingTalentReason,
  hideModal
}: Props) => {
  const { data: reasonsData, loading: reasonsLoading } = useGetData(
    JobPendingTalentReasonsDocument,
    'jobPendingTalentReasons'
  )()
  const emitMessage = useMessageEmitter()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [reason, setReason] = useState<Maybe<string> | undefined>(
    pendingTalentReason
  )
  const [updateTalentPendingReason, { loading }] = useMutation(
    UpdateTalentPendingReasonDocument,
    {
      onError: () => showError('Error updating pending talent reason')
    }
  )

  const handleSubmit = async (submitData: FormValues) => {
    const { data: mutationResult } = await updateTalentPendingReason({
      variables: {
        input: {
          jobId,
          reason,
          reasonNotes: submitData.reasonNotes
        }
      }
    })

    return handleMutationResult({
      mutationResult: mutationResult?.updateJobPendingTalentReason,
      successNotificationMessage:
        'The Pending Talent Reason was successfully updated.',
      onSuccessAction: () => {
        hideModal()
        emitMessage(JOB_UPDATED, { jobId })
      }
    })
  }

  const reasons = useMemo(() => {
    const mappedReasonsData = (reasonsData || []).map(item => ({
      value: item,
      text: item
    }))

    return [NOT_SELECTED_OPTION, ...mappedReasonsData]
  }, [reasonsData])

  return (
    <Modal
      withForm
      open
      size='small'
      onClose={hideModal}
      operationVariables={{
        nodeId: jobId,
        nodeType: NodeType.JOB,
        operationName: 'updateJobPendingTalentReason'
      }}
      data-testid='pending-talent-reason-modal'
    >
      <Form
        onSubmit={handleSubmit}
        initialValues={{ reason: pendingTalentReason?.toString() }}
      >
        <Modal.Title>Update Pending Talent Reason</Modal.Title>
        <Modal.Content>
          <Form.Select
            name='reason'
            placeholder={NOT_SELECTED_PLACEHOLDER}
            width='full'
            label='Reason'
            loading={reasonsLoading}
            autoFocus={true}
            options={reasons}
            onChange={event => setReason(event.target.value)}
            data-testid='reason-field'
          />
          <Form.Input
            label='Notes'
            name='reasonNotes'
            required={reason}
            width='full'
            multiline
            rows={4}
            rowsMax={25}
            validate={isMaxLength}
            data-testid='PendingTalentReasonModal-reason-notes'
          />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton
            variant='positive'
            data-testid='PendingTalentReasonModal-submit-button'
            disabled={loading}
          >
            Save
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default PendingTalentReasonModal
