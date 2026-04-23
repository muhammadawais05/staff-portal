import React from 'react'
import { Container, Button, Typography } from '@toptal/picasso'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { isMaxLength } from '@staff-portal/validators'

import { useRemoveCallRequest } from './data/remove-call-request'

export interface Props {
  id: string
  fromName?: string | null
  hideModal: () => void
}

const RemoveCallRequestModal = ({ id, fromName, hideModal }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const { removeCallRequest } = useRemoveCallRequest({
    onError: () => showError('Unable to remove call request.')
  })

  const handleSubmit = async (comment: string) => {
    const { data } = await removeCallRequest(id, comment)

    return handleMutationResult({
      mutationResult: data?.removeCallbackRequest,
      successNotificationMessage: 'The Call Request has been removed.',
      onSuccessAction: hideModal
    })
  }

  return (
    <Modal
      onClose={hideModal}
      size='small'
      open
      operationVariables={{
        nodeId: id,
        nodeType: NodeType.CALLBACK_REQUEST,
        operationName: 'removeCallbackRequest'
      }}
    >
      <ModalForm<{ comment: string }>
        onSubmit={({ comment }) => handleSubmit(comment)}
        title={`Remove call request ${fromName ? `from ${fromName}` : ''}`}
      >
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>
              Are you sure you want to remove this call request
              {fromName ? ` from ${fromName}` : ''}?
            </Typography>
          </Container>
          <Form.Input
            name='comment'
            label='Comment'
            width='full'
            autoFocus
            multiline
            rows={4}
            placeholder='Please specify a reason.'
            required
            validate={isMaxLength}
            data-testid='remove-call-request-reason'
          />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton
            variant='negative'
            data-testid='remove-call-request-submit'
          >
            Remove
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default RemoveCallRequestModal
