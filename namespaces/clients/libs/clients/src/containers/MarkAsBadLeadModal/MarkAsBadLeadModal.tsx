import React from 'react'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { FeedbackReasonActions } from '@staff-portal/graphql/staff'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import { FormReasonSelect } from '@staff-portal/feedbacks'
import { NodeType } from '@staff-portal/graphql'

import { CLIENT_UPDATED } from '../../messages'
import { MarkClientAsBadLeadDocument } from './data/mark-client-as-bad-lead'

export interface Props {
  clientId: string
  hideModal: () => void
  onSuccess: () => void
}

const MarkAsBadLeadModal = ({ clientId, hideModal, onSuccess }: Props) => {
  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: MarkClientAsBadLeadDocument,
    errorNotificationMessage:
      'An error occurred, the client has not been marked as bad lead.',
    mutationResultOptions: {
      successNotificationMessage: 'Client has been marked as bad lead.',
      successMessageEmitOptions: {
        type: CLIENT_UPDATED,
        payload: { companyId: clientId }
      },
      onSuccessAction: () => {
        onSuccess()
        hideModal()
      }
    }
  })

  return (
    <Modal
      open
      onClose={hideModal}
      size='small'
      operationVariables={{
        nodeId: clientId,
        nodeType: NodeType.CLIENT,
        operationName: 'markClientAsBadLead'
      }}
    >
      <ModalForm
        title='Mark Company as Bad Lead'
        onSubmit={handleSubmit}
        onClose={hideModal}
        open
        size='small'
        initialValues={{
          clientId: clientId
        }}
      >
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>
              Do you really want to mark this company as a bad lead?
            </Typography>
          </Container>

          <FormReasonSelect
            required
            autoFocus
            enableReset
            width='full'
            name='reasonId'
            label='Reason'
            action={FeedbackReasonActions.COMPANY_MARKED_AS_BAD_LEAD}
            data-testid='mark-as-bad-lead-modal-reason-id'
          />

          <Form.Input
            required
            multiline
            rows={4}
            width='full'
            name='comment'
            label='Details'
            data-testid='mark-as-bad-lead-modal-reason-comment'
            validate={isMaxLength}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='negative'>
            Mark as Bad Lead
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default MarkAsBadLeadModal
