import React from 'react'
import { Container } from '@toptal/picasso'
import { Operation } from '@staff-portal/graphql/staff'
import { TaskStatus } from '@staff-portal/tasks'
import { WrapWithTooltip } from '@staff-portal/ui'
import { isOperationEnabled, OperationFragment } from '@staff-portal/operations'

import EditableDueDate from '../../components/EditableDueDate'
import RecurringPeriodButton from '../../components/RecurringPeriodButton'
import { isTaskCompleted } from '../is-task-completed'
import { TaskColRenderProps } from '../../types'
import * as S from './styles'

const RESCHEDULE_IS_DISABLED =
  'This task can only be completed by completing the action described.'

const isDueDateDisabled = (
  taskStatus: string,
  isExpandedVisible: boolean,
  rescheduleTaskOperation?: Operation
) =>
  isTaskCompleted(taskStatus as TaskStatus) ||
  !(
    isExpandedVisible &&
    rescheduleTaskOperation &&
    isOperationEnabled(rescheduleTaskOperation)
  )

const getRescheduleTooltipMessage = (
  rescheduleTaskOperation?: OperationFragment
) => {
  if (!rescheduleTaskOperation || isOperationEnabled(rescheduleTaskOperation)) {
    return
  }

  const operationMessage = rescheduleTaskOperation.messages
    .filter(message => message)
    .join('. ')

  return operationMessage || RESCHEDULE_IS_DISABLED
}

const renderDueDate = ({
  task: { id, dueDate, status },
  taskMetadata,
  isExpandedVisible
}: TaskColRenderProps) => {
  const rescheduleTask = taskMetadata?.operations.rescheduleTask
  const dueDateTooltipMessage = getRescheduleTooltipMessage(rescheduleTask)
  const isTooltipEnabled = isExpandedVisible && Boolean(dueDateTooltipMessage)
  const isDisabled = isDueDateDisabled(
    status,
    isExpandedVisible,
    rescheduleTask
  )

  return (
    <WrapWithTooltip
      delay='long'
      enableTooltip={isTooltipEnabled}
      content={dueDateTooltipMessage}
    >
      <Container inline data-testid='due-date' css={S.dueDate}>
        <EditableDueDate
          taskId={id}
          disabled={isDisabled}
          dueDate={dueDate}
          lineThrough={isTaskCompleted(status as TaskStatus)}
        />
      </Container>
    </WrapWithTooltip>
  )
}

const renderRecurringPeriod = ({
  task: { id, recurringPeriod, status },
  taskMetadata,
  isExpandedVisible
}: TaskColRenderProps) => {
  const isDisabled = isDueDateDisabled(
    status,
    isExpandedVisible,
    taskMetadata?.operations.rescheduleTask
  )

  return (
    <RecurringPeriodButton
      taskId={id}
      disabled={isDisabled}
      recurringPeriod={recurringPeriod}
    />
  )
}

export const renderDueDateCol = (props: TaskColRenderProps) => (
  <Container
    flex
    direction='row'
    alignItems='center'
    justifyContent='space-between'
    css={S.dueDateWrapper}
  >
    {renderDueDate(props)}
    {renderRecurringPeriod(props)}
  </Container>
)
