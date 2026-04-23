import React, { useCallback } from 'react'
import { Button, Typography, Container } from '@toptal/picasso'
import { NodeType } from '@staff-portal/graphql'
import { Form } from '@toptal/picasso-forms'
import { Modal } from '@staff-portal/modals-service'
import { isMaxLength } from '@staff-portal/validators'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import { DisputeTaskDocument } from './data/dispute-task/dispute-task.staff.gql.types'

interface DisputeTaskForm {
  comment: string
}

export interface Props {
  taskId: string
  hideModal: () => void
  onDisputeTask: () => void
}

const DisputeTaskModal = ({ taskId, hideModal, onDisputeTask }: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: DisputeTaskDocument,
      mutationResultOptions: {
        successNotificationMessage: 'The task was disputed.',
        onSuccessAction: () => {
          hideModal()
          onDisputeTask()
        }
      }
    })

  const handleSubmit = useCallback(
    ({ comment }: DisputeTaskForm) =>
      handleMutationSubmit({
        taskId,
        comment: comment ?? ''
      }),
    [handleMutationSubmit, taskId]
  )

  return (
    <Modal
      withForm
      onClose={hideModal}
      open
      size='small'
      operationVariables={{
        nodeId: taskId,
        nodeType: NodeType.TASK,
        operationName: 'disputeTask'
      }}
    >
      <Modal.Title>Dispute Task</Modal.Title>

      <Form<DisputeTaskForm> onSubmit={handleSubmit}>
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>
              Are you sure you want to dispute this task?
            </Typography>
          </Container>

          <Form.Input
            required
            multiline
            width='full'
            name='comment'
            placeholder='Please add a comment'
            rows={4}
            validate={isMaxLength}
            autoFocus
            data-testid='dispute-task-comment'
          />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton
            variant='negative'
            data-testid='dispute-task-submit'
          >
            Dispute Task
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default DisputeTaskModal
