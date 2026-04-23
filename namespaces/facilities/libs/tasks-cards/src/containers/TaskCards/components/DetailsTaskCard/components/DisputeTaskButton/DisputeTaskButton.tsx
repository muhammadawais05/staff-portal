import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { REFETCH_TASKS, CLOSE_EXPANDED_TASK } from '@staff-portal/tasks'

import DisputeTaskModal from '../DisputeTaskModal'

export interface Props {
  taskId: string
  operation: OperationType
}

const DisputeTaskButton = ({ taskId, operation }: Props) => {
  const emitMessage = useMessageEmitter()
  const { showModal } = useModal(DisputeTaskModal, {
    taskId,
    onDisputeTask: () => {
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
          data-testid='dispute-task-button'
        >
          Dispute
        </Button>
      )}
    />
  )
}

export default DisputeTaskButton
