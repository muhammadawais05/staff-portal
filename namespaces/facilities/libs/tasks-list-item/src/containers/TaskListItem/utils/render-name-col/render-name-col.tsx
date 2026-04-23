import React from 'react'
import { Container } from '@toptal/picasso'
import { isOperationEnabled } from '@staff-portal/operations'
import { TaskStatus } from '@staff-portal/tasks'

import CommentCount from '../../components/CommentCount'
import { isTaskCompleted } from '../is-task-completed'
import EditableTaskDescription from '../../components/EditableTaskDescription'
import { TaskColRenderProps } from '../../types'
import * as S from './styles'

export interface TaskNameColRenderProps extends TaskColRenderProps {
  commentCount?: number
  expandToDetails: () => void
}

export const renderNameCol = ({
  task: { id, description, status, disputed, commentCount },
  taskMetadata,
  isExpandedVisible,
  expandToDetails
}: TaskNameColRenderProps) => {
  const isCompleted = isTaskCompleted(status as TaskStatus)
  const updateTaskDescription = taskMetadata?.operations.updateTaskDescription
  const isDescriptionDisabled =
    isCompleted ||
    !(
      isExpandedVisible &&
      updateTaskDescription &&
      isOperationEnabled(updateTaskDescription)
    )
  const isCommentCountEnabled =
    isDescriptionDisabled && commentCount && commentCount > 0

  return (
    <Container flex justifyContent='space-between' alignItems='center'>
      <Container
        css={S.taskDescriptionContainer}
        right={isDescriptionDisabled ? 'xsmall' : undefined}
        data-testid='task-name'
      >
        <EditableTaskDescription
          taskId={id}
          disabled={isDescriptionDisabled}
          description={description}
          status={status}
          disputed={disputed}
          lineThrough={isCompleted}
        />
      </Container>

      {Boolean(isCommentCountEnabled) && (
        <CommentCount count={commentCount} onClick={expandToDetails} />
      )}
    </Container>
  )
}
