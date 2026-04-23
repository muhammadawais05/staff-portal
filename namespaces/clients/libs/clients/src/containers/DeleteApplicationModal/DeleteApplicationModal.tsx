import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { FeedbackReasonActions } from '@staff-portal/graphql/staff'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import { FormReasonSelect } from '@staff-portal/feedbacks'
import { NodeType } from '@staff-portal/graphql'

import { CLIENT_UPDATED } from '../../messages'
import { RejectClientDocument } from './data/reject-client'

export interface Props {
  clientId: string
  hideModal: () => void
}

const DeleteApplicationModal = ({ clientId, hideModal }: Props) => {
  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: RejectClientDocument,
    errorNotificationMessage:
      'An error occurred, the Company Application was not deleted.',
    mutationResultOptions: {
      successNotificationMessage:
        'The Company Application was successfully deleted.',
      successMessageEmitOptions: {
        type: CLIENT_UPDATED,
        payload: { companyId: clientId }
      },
      onSuccessAction: hideModal
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
        operationName: 'rejectClient'
      }}
    >
      <ModalForm
        onClose={hideModal}
        onSubmit={handleSubmit}
        title='Delete Applicant'
        initialValues={{
          clientId: clientId
        }}
      >
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>
              Do you really want to delete this company application?
            </Typography>
          </Container>

          <FormReasonSelect
            action={FeedbackReasonActions.COMPANY_REMOVED}
            required
            autoFocus
            enableReset
            width='full'
            name='reasonId'
            label='Reason'
            data-testid='delete-application-modal-reason-id'
          />

          <Form.Input
            required
            multiline
            rows={4}
            width='full'
            name='comment'
            label='Details'
            data-testid='delete-application-modal-reason-comment'
            validate={isMaxLength}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='positive'>
            Delete Application
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default DeleteApplicationModal
