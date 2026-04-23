import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { ROLE_STEP_UPDATED, TALENT_UPDATED } from '@staff-portal/talents'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'

import { CancelScheduledInterviewInvitationDocument } from './data'

export interface Props {
  roleStepId: string
  hideModal: () => void
  talentId: string
}

const CancelScheduledInvitationModal = ({
  roleStepId,
  hideModal,
  talentId
}: Props) => {
  const emitMessage = useMessageEmitter()

  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: CancelScheduledInterviewInvitationDocument,
    mutationResultOptions: {
      successNotificationMessage: 'Scheduled invitation email was canceled.',
      onSuccessAction: () => {
        emitMessage(ROLE_STEP_UPDATED)
        emitMessage(TALENT_UPDATED, { talentId })
        hideModal()
      }
    }
  })

  return (
    <Modal onClose={hideModal} open size='small'>
      <ModalForm
        onSubmit={() => handleSubmit({ roleStepId })}
        title='Cancel the scheduled invitation email'
      >
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>
              Do you really want to cancel the scheduled invitation email?
            </Typography>
          </Container>
        </Modal.Content>

        <Modal.Actions>
          <Button
            variant='secondary'
            onClick={hideModal}
            data-testid='cancel-button'
          >
            Cancel
          </Button>
          <Form.SubmitButton
            variant='primary'
            loading={loading}
            data-testid='confirm-button'
          >
            Confirm
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default CancelScheduledInvitationModal
