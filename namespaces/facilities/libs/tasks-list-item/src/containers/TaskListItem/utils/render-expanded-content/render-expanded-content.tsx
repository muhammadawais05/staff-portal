import React from 'react'
import {
  TaskMetadataFragment,
  TaskWithOptionalMetadata
} from '@staff-portal/tasks'
import {
  TaskCards,
  TaskCardType,
  TaskCardConfigGroupOrItem
} from '@staff-portal/tasks-cards'

import { TaskListItemFragment } from '../../data/task-list-item-fragment'

interface TaskExpandedContentRenderProps {
  task: TaskListItemFragment
  taskMetadata?: TaskMetadataFragment
  taskCards: TaskCardConfigGroupOrItem[]
  defaultTaskCardType?: TaskCardType | null
}

const mergeTaskWithMetadata = (
  task: TaskListItemFragment,
  taskMetadata?: TaskMetadataFragment
): TaskWithOptionalMetadata => {
  return {
    ...task,
    operations: taskMetadata?.operations
  }
}

export const renderExpandedContent = ({
  task,
  taskMetadata,
  taskCards,
  defaultTaskCardType
}: TaskExpandedContentRenderProps) => (
  <TaskCards
    defaultTaskCardType={defaultTaskCardType}
    task={mergeTaskWithMetadata(task, taskMetadata)}
    taskCards={taskCards}
  />
)
