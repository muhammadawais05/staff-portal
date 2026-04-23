import React from 'react'
import {
  Container,
  Typography,
  Table,
  Indicator,
  Tooltip,
  Update16
} from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { TaskPriorityLevel } from '@staff-portal/graphql/staff'
import { ItemsTable } from '@staff-portal/ui'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import * as S from './styles'
import { PendingCommunicationsTaskFragment } from '../../data/fragments'
import { useSendEmailContext } from '../../context/send-email-context'

const PENDING_COMMUNICATION_TASKS_ID = 'pending-communication-tasks-id'

const renderHeader = () => (
  <Table.Row>
    <Table.Cell css={S.checkboxColumn} />
    <Table.Cell>Task</Table.Cell>
    <Table.Cell css={S.dueDateColumn}>Due date</Table.Cell>
  </Table.Row>
)

const renderPriority = (priority: TaskPriorityLevel) => {
  let color: 'red' | 'yellow' | 'blue'
  let text: string

  switch (priority) {
    case TaskPriorityLevel.HIGH:
      color = 'red'
      text = 'High priority'
      break
    case TaskPriorityLevel.MEDIUM:
      color = 'yellow'
      text = 'Medium priority'
      break
    case TaskPriorityLevel.LOW:
      color = 'blue'
      text = 'Low priority'
      break
  }

  return (
    <Container inline right='xsmall'>
      <Tooltip content={text}>
        <div>
          <Indicator color={color} aria-label={text} />
        </div>
      </Tooltip>
    </Container>
  )
}

const renderRow = ({
  id,
  priority,
  description,
  dueDate,
  recurringPeriod
}: PendingCommunicationsTaskFragment) => {
  return (
    <Table.Row key={id}>
      <Table.Cell css={S.checkboxColumn}>
        <Form.Checkbox
          value={id}
          name='pendingTasks'
          data-testid='pending-tasks-checkbox'
        />
      </Table.Cell>
      <Table.Cell>
        {renderPriority(priority)}
        {description}
      </Table.Cell>
      <Table.Cell css={S.dueDateColumn}>
        {dueDate && parseAndFormatDate(dueDate)}{' '}
        {!!recurringPeriod && (
          <Tooltip content={`Recurring period: ${recurringPeriod}`}>
            <Container
              as='span'
              left='medium'
              data-testid={`pending-task-${id}-recurring-tooltip`}
            >
              <Update16 css={S.recurringIcon} />
            </Container>
          </Tooltip>
        )}
      </Table.Cell>
    </Table.Row>
  )
}

const SendEmailPendingTasks = () => {
  const {
    emailContext: { fullName, viewerPendingCommunications }
  } = useSendEmailContext()

  if (!viewerPendingCommunications) {
    return null
  }
  const tasks = viewerPendingCommunications.nodes
  // API always returns pending tasks. But status can be updated in cache after mutation.
  const pendingTasks = tasks.filter(({ status }) => status === 'pending')

  if (!pendingTasks.length) {
    return null
  }

  return (
    <Container top='small'>
      <Typography size='medium' id={PENDING_COMMUNICATION_TASKS_ID}>
        Would you like to review {fullName}'s pending tasks?
      </Typography>
      <Form.CheckboxGroup name='pendingTasks'>
        <ItemsTable
          renderHeader={renderHeader}
          renderRow={renderRow}
          data={pendingTasks}
          aria-labelledby={PENDING_COMMUNICATION_TASKS_ID}
        />
      </Form.CheckboxGroup>
    </Container>
  )
}

export default SendEmailPendingTasks
