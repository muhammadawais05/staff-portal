import React, { ReactNode } from 'react'
import { Unavailable16, Pause16 } from '@toptal/picasso/index'
import { TaskSource } from '@staff-portal/graphql/staff'
import { TaskStatus } from '@staff-portal/tasks'

import { TaskListItemFragment } from '../../../../data/task-list-item-fragment'

export interface TaskCompleteOptions {
  completed: boolean
  icon?: ReactNode
  tooltipContent?: string
}

const getFinishedTaskOptions = (
  hasCompleter: boolean,
  finishedWithChildTask: boolean
): TaskCompleteOptions => {
  if (!hasCompleter) {
    return {
      completed: true,
      tooltipContent: 'You cannot restart a task completed by system'
    }
  }

  if (finishedWithChildTask) {
    return {
      completed: true,
      tooltipContent: 'You cannot restart recurring task'
    }
  }

  return { completed: true }
}

const getPendingTaskOptions = (
  finishDisabled: boolean
): TaskCompleteOptions => ({
  completed: false,
  tooltipContent: finishDisabled
    ? 'This task can only be completed by completing the underlying action'
    : undefined
})

export const getTaskCompleteOptions = ({
  status,
  finishedWithChildTask,
  completer,
  playbookTemplate,
  source
}: TaskListItemFragment): TaskCompleteOptions | null => {
  if (source == TaskSource.SALESFORCE) {
    switch (status) {
      case TaskStatus.FINISHED:
      case TaskStatus.CANCELLED:
        return {
          completed: true,
          tooltipContent: 'You cannot restart a salesforce task.'
        }
      default:
        return {
          completed: false,
          tooltipContent: 'This task can only be completed from salesforce.'
        }
    }
  } else {
    switch (status) {
      case TaskStatus.PAUSED:
        return {
          completed: false,
          icon: <Pause16 color='dark-grey' data-testid='icon-pause' />,
          tooltipContent: 'This task is paused.'
        }

      case TaskStatus.CANCELLED:
        return {
          completed: true,
          icon: <Unavailable16 color='grey' />,
          tooltipContent: 'This task was cancelled.'
        }

      case TaskStatus.FINISHED:
        return getFinishedTaskOptions(Boolean(completer), finishedWithChildTask)

      case TaskStatus.PENDING:
        return getPendingTaskOptions(Boolean(playbookTemplate?.finishDisabled))

      default:
        return null
    }
  }
}
