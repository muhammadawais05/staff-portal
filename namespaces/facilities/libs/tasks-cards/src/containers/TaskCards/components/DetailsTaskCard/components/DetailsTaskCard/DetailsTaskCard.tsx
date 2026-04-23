import React from 'react'
import { isOperationHidden } from '@staff-portal/operations'
import { useHistoryPolling } from '@staff-portal/chronicles'
import { TaskCardLayout, TaskWithOptionalMetadata } from '@staff-portal/tasks'

import { TaskCardProps, TaskWithMetadata } from '../../../../types'
import DetailsTaskCardActions from '../DetailsTaskCardActions'
import DetailsTaskCardContent from '../DetailsTaskCardContent'
import {
  TASK_HISTORY_POLL_INTERVAL,
  TASK_HISTORY_POLL_DURATION
} from './constants'

const isTaskCardActionsVisible = (
  task: TaskWithOptionalMetadata
): task is TaskWithMetadata => {
  if (!task.operations) {
    return false
  }

  const {
    disputeTask: disputeTaskOperation,
    cancelTask: cancelTaskOperation,
    scheduleTaskNextCheck: scheduleTaskNextCheckOperation
  } = task.operations

  return (
    !isOperationHidden(disputeTaskOperation) ||
    !isOperationHidden(cancelTaskOperation) ||
    !isOperationHidden(scheduleTaskNextCheckOperation)
  )
}

const DetailsTaskCard = ({ task }: TaskCardProps) => {
  const [historyPollInterval, startHistoryPooling] = useHistoryPolling(
    TASK_HISTORY_POLL_INTERVAL,
    TASK_HISTORY_POLL_DURATION
  )

  return (
    <TaskCardLayout>
      {isTaskCardActionsVisible(task) && (
        <TaskCardLayout.Header flex justifyContent='flex-end'>
          <DetailsTaskCardActions
            task={task}
            onScheduleTaskNextCheck={startHistoryPooling}
          />
        </TaskCardLayout.Header>
      )}

      <DetailsTaskCardContent
        task={task}
        historyPollInterval={historyPollInterval}
        onCommentAdd={startHistoryPooling}
      />
    </TaskCardLayout>
  )
}

export default DetailsTaskCard
