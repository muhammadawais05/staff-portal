import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback
} from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Checkbox, Container } from '@toptal/picasso'
import { useNotifications } from '@staff-portal/error-handling'
import {
  concatMutationErrors,
  useMutation
} from '@staff-portal/data-layer-service'
import { WrapWithTooltip } from '@staff-portal/ui'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { TaskStatus, TASK_UPDATED } from '@staff-portal/tasks'

import { TaskListItemFragment } from '../../data/task-list-item-fragment'
import { FinishTaskDocument } from './data/finish-task/finish-task.staff.gql.types'
import { RestartTaskDocument } from './data/restart-task/restart-task.staff.gql.types'
import * as S from './styles'
import { TaskCompleteOptions } from './utils'

const DEBOUNCE_LIMIT = 500

export interface Props {
  task: TaskListItemFragment
  setCachedTask: Dispatch<SetStateAction<TaskListItemFragment>>
  taskCompleteOptions: TaskCompleteOptions | null
  taskDefaultCompleted?: boolean
}

const CompleteTaskCheckbox = ({
  task,
  setCachedTask,
  taskCompleteOptions,
  taskDefaultCompleted
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: taskId, activity, subjects, operations, ...restTask } = task
  const taskFragment = { id: taskId, ...restTask }
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()

  const [finishTask] = useMutation(FinishTaskDocument, {
    onCompleted: ({ finishTask: result }) => {
      if (result?.success) {
        emitMessage(TASK_UPDATED, { taskId })
      } else if (result?.errors) {
        showError(concatMutationErrors(result?.errors))
      }
    },
    onError: () =>
      showError('An error occurred, the task has not been marked as finished.'),
    variables: { taskId },
    optimisticResponse: {
      finishTask: {
        success: true,
        errors: [],
        task: {
          ...taskFragment,
          status: TaskStatus.FINISHED
        },
        __typename: 'FinishTaskPayload'
      }
    }
  })
  const [restartTask] = useMutation(RestartTaskDocument, {
    onCompleted: ({ restartTask: result }) => {
      if (result?.success) {
        emitMessage(TASK_UPDATED, { taskId })
      } else if (result?.errors) {
        showError(concatMutationErrors(result?.errors))
      }
    },
    onError: () =>
      showError('An error occurred, the task has not been restarted.'),
    variables: { taskId },
    optimisticResponse: {
      restartTask: {
        success: true,
        errors: [],
        task: {
          ...taskFragment,
          status: TaskStatus.PENDING
        },
        __typename: 'RestartTaskPayload'
      }
    }
  })

  const debouncedUpdateTask = useDebouncedCallback(
    (checked?: boolean, taskCompleted?: boolean) => {
      if (checked && !taskCompleted) {
        finishTask()
      } else if (!checked && taskCompleted) {
        restartTask()
      }
    },
    DEBOUNCE_LIMIT
  )
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target

      setCachedTask({
        ...task,
        status: checked ? TaskStatus.FINISHED : TaskStatus.PENDING
      })
      debouncedUpdateTask(checked, taskDefaultCompleted)
    },
    [setCachedTask, taskDefaultCompleted, debouncedUpdateTask, task]
  )

  if (!taskCompleteOptions) {
    return null
  }

  const { icon, tooltipContent, completed } = taskCompleteOptions

  return (
    <WrapWithTooltip
      delay='long'
      enableTooltip={Boolean(tooltipContent)}
      content={tooltipContent}
    >
      <Container>
        {icon ? (
          <Container inline css={S.icon}>
            {icon}
          </Container>
        ) : (
          <Checkbox
            css={S.noMargin}
            checked={completed}
            onChange={handleOnChange}
            disabled={!!tooltipContent}
            data-testid='complete-task'
            data-pendoid='complete-task'
          />
        )}
      </Container>
    </WrapWithTooltip>
  )
}

export default CompleteTaskCheckbox
