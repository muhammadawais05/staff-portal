import React from 'react'
import { TaskStatus } from '@staff-portal/tasks'

import RelatedToTime from '../../components/RelatedToTime'
import { isTaskCompleted } from '../is-task-completed'
import { TaskColRenderProps } from '../../types'

export const renderRelatedTimeCol = ({
  task: {
    id: taskId,
    relatedTime,
    status,
    engagedSubjects: { totalCount }
  }
}: TaskColRenderProps) => {
  if (!relatedTime) {
    return
  }

  return (
    <RelatedToTime
      taskId={taskId}
      dateTime={relatedTime}
      isCompleted={isTaskCompleted(status as TaskStatus)}
      hasEngagedSubjects={Boolean(totalCount)}
    />
  )
}
