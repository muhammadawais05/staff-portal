import React from 'react'
import { Button, Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { StartNegotiationInput } from '@staff-portal/graphql/staff'
import { ModalForm } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'

import { NEGOTIATION_STATUS_OPTIONS } from '../../../../../config'
import { StartNegotiationDocument } from '../../data'

interface Props {
  companyId: string
  companyName: string
  hideModal: () => void
}

const StartNegotiationForm = ({ companyId, companyName, hideModal }: Props) => {
  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: StartNegotiationDocument,
    mutationResultOptions: {
      successNotificationMessage: 'The Negotiations were successfully started.',
      onSuccessAction: hideModal
    }
  })

  return (
    <ModalForm<StartNegotiationInput>
      onSubmit={handleSubmit}
      title={`Start Negotiations with ${companyName}`}
      initialValues={{ clientId: companyId }}
      data-testid='StartNegotiationModal-form'
    >
      <Modal.Content>
        <Form.Input
          required
          autoFocus
          width='full'
          name='contactEmail'
          label='Contact email'
          validate={isMaxLength}
          data-testid='StartNegotiationModal-contactEmail'
        />
        <Form.Select
          width='full'
          name='status'
          required
          label='Initial status'
          options={NEGOTIATION_STATUS_OPTIONS}
          data-testid='StartNegotiationModal-status'
        />
        <Form.Input
          width='full'
          name='comment'
          label='Comment'
          multiline
          rows={4}
          validate={isMaxLength}
          data-testid='StartNegotiationModal-comment'
        />
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton
          variant='positive'
          data-testid='StartNegotiationModal-submit'
        >
          Start
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default StartNegotiationForm
