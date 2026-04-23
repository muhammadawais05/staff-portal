import React from 'react'
import { isOperationEnabled } from '@staff-portal/operations'
import { TaskStatus } from '@staff-portal/tasks'

import { isTaskCompleted } from '../is-task-completed'
import EditableTaskAssignee from '../../components/EditableTaskAssignee'
import { TaskColRenderProps } from '../../types'

export const renderAssigneeCol = ({
  task: { id, performer, status },
  taskMetadata,
  isExpandedVisible
}: TaskColRenderProps) => {
  const isCompleted = isTaskCompleted(status as TaskStatus)
  const reassignTask = taskMetadata?.operations.reassignTask
  const isAssigneeDisabled =
    isCompleted ||
    !(isExpandedVisible && reassignTask && isOperationEnabled(reassignTask))

  return (
    <EditableTaskAssignee
      taskId={id}
      assignee={performer}
      disabled={isAssigneeDisabled}
      lineThrough={isCompleted}
    />
  )
}
