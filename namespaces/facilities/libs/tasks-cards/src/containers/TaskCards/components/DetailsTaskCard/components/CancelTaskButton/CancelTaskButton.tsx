import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'
import { Button } from '@toptal/picasso'
import React from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { REFETCH_TASKS, CLOSE_EXPANDED_TASK } from '@staff-portal/tasks'

import CancelTaskModal from '../CancelTaskModal'

export interface Props {
  taskId: string
  operation: OperationType
}

const CancelTaskButton = ({ taskId, operation }: Props) => {
  const emitMessage = useMessageEmitter()

  const { showModal } = useModal(CancelTaskModal, {
    taskId,
    onCancelTask: () => {
      emitMessage(CLOSE_EXPANDED_TASK)
      emitMessage(REFETCH_TASKS)
    }
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='negative'
          disabled={disabled}
          onClick={showModal}
          data-testid='delete-task-button'
        >
          Delete
        </Button>
      )}
    />
  )
}

export default CancelTaskButton
