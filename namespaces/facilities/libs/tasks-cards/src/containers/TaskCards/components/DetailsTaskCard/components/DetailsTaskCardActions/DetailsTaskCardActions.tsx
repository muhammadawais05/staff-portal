import React from 'react'
import { TaskCardLayout } from '@staff-portal/tasks'

import { TaskWithMetadata } from '../../../../types'
import CancelTaskButton from '../CancelTaskButton'
import DisputeTaskButton from '../DisputeTaskButton'
import ScheduleTaskNextCheckButton from '../ScheduleTaskNextCheckButton'

export interface Props {
  task: TaskWithMetadata
  onScheduleTaskNextCheck: () => void
}

const DetailsTaskCardActions = ({
  task: {
    id: taskId,
    operations: {
      disputeTask: disputeTaskOperation,
      cancelTask: cancelTaskOperation,
      scheduleTaskNextCheck: scheduleTaskNextCheckOperation
    }
  },
  onScheduleTaskNextCheck
}: Props) => (
  <TaskCardLayout.Actions>
    <ScheduleTaskNextCheckButton
      taskId={taskId}
      operation={scheduleTaskNextCheckOperation}
      onScheduleTaskNextCheck={onScheduleTaskNextCheck}
    />
    <DisputeTaskButton taskId={taskId} operation={disputeTaskOperation} />
    <CancelTaskButton taskId={taskId} operation={cancelTaskOperation} />
  </TaskCardLayout.Actions>
)

export default DetailsTaskCardActions
