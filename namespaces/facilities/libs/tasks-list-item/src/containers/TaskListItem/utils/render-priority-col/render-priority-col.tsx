import React from 'react'
import { isOperationEnabled } from '@staff-portal/operations'

import EditableTaskPriority from '../../components/EditableTaskPriority'
import { TaskColRenderProps } from '../../types'

export const renderPriorityCol = ({
  task: { id, priority },
  taskMetadata,
  isExpandedVisible
}: TaskColRenderProps) => {
  const changeTaskPriority = taskMetadata?.operations.changeTaskPriority
  const isPriorityDisabled = !(
    isExpandedVisible &&
    changeTaskPriority &&
    isOperationEnabled(changeTaskPriority)
  )

  return (
    <EditableTaskPriority
      taskId={id}
      priority={priority}
      disabled={isPriorityDisabled}
    />
  )
}
