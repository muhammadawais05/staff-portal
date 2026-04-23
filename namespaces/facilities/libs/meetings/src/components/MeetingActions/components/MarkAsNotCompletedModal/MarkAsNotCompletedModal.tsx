import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form, useField } from '@toptal/picasso-forms'
import { FormCancelButton } from '@staff-portal/forms'
import React, { useCallback } from 'react'
import { MeetingOutcome, FailMeetingInput } from '@staff-portal/graphql/staff'
import { isMaxLength } from '@staff-portal/validators'
import { NodeType } from '@staff-portal/graphql'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import { NOT_COMPLETED_REASONS } from '../../../../config'
import { FailMeetingDocument } from './data'

const ModalContent = () => {
  const {
    input: { value: outcome }
  } = useField<string>('outcome')

  return (
    <Modal.Content>
      <Form.Select
        required
        name='outcome'
        label='Provide a reason'
        options={NOT_COMPLETED_REASONS}
        placeholder='Choose an option'
        data-testid='outcome'
      />
      <Form.Input
        name='comment'
        validate={isMaxLength}
        required={outcome !== MeetingOutcome.NO_SHOW}
        label='Comment'
        multiline
        rows={4}
        width='full'
        data-testid='comment'
      />
    </Modal.Content>
  )
}

export interface Props {
  meetingId: string
  hideModal: () => void
}

const TITLE = 'Mark as Not Completed'

const MarkAsNotCompletedModal = ({ meetingId, hideModal }: Props) => {
  const { handleSubmit } = useModalFormChangeHandler({
    mutationDocument: FailMeetingDocument,
    mutationResultOptions: {
      successNotificationMessage: 'Meeting was marked as "Not Completed"',
      onSuccessAction: hideModal
    }
  })

  const handleModalSubmit = useCallback(
    formData =>
      handleSubmit({
        ...formData,
        meetingId
      }),
    [meetingId, handleSubmit]
  )

  return (
    <Modal
      onClose={hideModal}
      open
      size='small'
      operationVariables={{
        nodeId: meetingId,
        nodeType: NodeType.MEETING,
        operationName: 'failMeeting'
      }}
      defaultTitle={TITLE}
    >
      <ModalForm<FailMeetingInput> title={TITLE} onSubmit={handleModalSubmit}>
        <ModalContent />

        <Modal.Actions>
          <FormCancelButton onClick={hideModal} />
          <Form.SubmitButton variant='negative'>Done</Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default MarkAsNotCompletedModal
