import React from 'react'
import { Button, Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import {
  NegotiationStatus,
  NegotiationPendingStatus,
  UpdateNegotiationStatusInput
} from '@staff-portal/graphql/staff'
import { ModalForm } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'

import { NEGOTIATION_STATUS_OPTIONS } from '../../../../../config'
import { UpdateNegotiationStatusDocument } from '../../data'

interface Props {
  companyName: string
  negotiationId: string
  negotiationStatus: NegotiationStatus
  hideModal: () => void
}

const UpdateNegotiationStatusForm = ({
  companyName,
  negotiationId,
  negotiationStatus,
  hideModal
}: Props) => {
  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: UpdateNegotiationStatusDocument,
    mutationResultOptions: {
      mutationResult: 'updateNegotiationStatus',
      successNotificationMessage:
        'The Negotiations Status was successfully updated.',
      onSuccessAction: hideModal
    }
  })

  const status =
    negotiationStatus === NegotiationStatus.WAITING_ON_CLIENT
      ? NegotiationPendingStatus.WAITING_ON_TOPTAL
      : NegotiationPendingStatus.WAITING_ON_CLIENT

  return (
    <ModalForm<UpdateNegotiationStatusInput>
      initialValues={{ status, negotiationId }}
      data-testid='UpdateNegotiationStatusForm-form'
      onSubmit={handleSubmit}
      title={`Update Negotiations Status of ${companyName}`}
    >
      <Modal.Content>
        <Form.Select
          width='full'
          name='status'
          required
          data-testid='UpdateNegotiationStatusForm-status'
          label='Status'
          options={NEGOTIATION_STATUS_OPTIONS}
        />
        <Form.Input
          width='full'
          name='comment'
          label='Comment'
          data-testid='UpdateNegotiationStatusForm-comment'
          multiline
          rows={4}
          validate={isMaxLength}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton
          variant='positive'
          data-testid='UpdateNegotiationStatusForm-submit'
        >
          Update
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default UpdateNegotiationStatusForm
