import { NodeType } from '@staff-portal/graphql'
import { PromptModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import React from 'react'

import { CancelTaskDocument } from './data'

interface Props {
  hideModal: () => void
  taskId: string
  onCancelTask: () => void
}

export const CancelTaskModal = ({ taskId, hideModal, onCancelTask }: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: CancelTaskDocument,
      mutationResultOptions: {
        successNotificationMessage: 'The task was deleted.',
        onSuccessAction: () => {
          hideModal()
          onCancelTask()
        }
      },
      errorNotificationMessage: 'An error occurred, the task was not deleted.'
    })

  const handleSubmit = () => handleMutationSubmit({ taskId })

  return (
    <PromptModal
      open
      loading={loading}
      onClose={hideModal}
      title='Delete Task'
      submitText='Delete Task'
      message='Are you sure you want to delete the task?'
      variant='negative'
      onSubmit={handleSubmit}
      operationVariables={{
        nodeId: taskId,
        nodeType: NodeType.TASK,
        operationName: 'cancelTask'
      }}
      testIds={{
        submitButton: 'delete-task-prompt-submit-button'
      }}
      data-testid='delete-task-prompt'
    />
  )
}

export default CancelTaskModal
