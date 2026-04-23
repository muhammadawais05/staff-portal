import React from 'react'
import {
  Button,
  Container,
  Dropdown,
  Indicator,
  Menu,
  Pencil16,
  Tooltip,
  Typography
} from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { TaskPriorityLevel } from '@staff-portal/graphql/staff'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import {
  TASK_PRIORITY_OPTIONS,
  TASK_PRIORITY_TEXT_MAPPING,
  TASK_PRIORITY_COLOR_MAPPING
} from '@staff-portal/tasks'

import { useChangeTaskPriority } from './data'

interface EditPriorityProps {
  taskId: string
  priority: TaskPriorityLevel
}

const EditPriority = ({ taskId, priority }: EditPriorityProps) => {
  const { showError } = useNotifications()

  const { changeTaskPriority, loading } = useChangeTaskPriority({
    taskId,
    onCompleted: ({ changeTaskPriority: result }) => {
      if (!result?.success && result?.errors) {
        showError(concatMutationErrors(result?.errors))
      }
    },
    onError: () => {
      showError(`An error occurred, the task priority was not changed.`)
    }
  })

  const renderMenuItems = () =>
    [...TASK_PRIORITY_OPTIONS].reverse().map(({ value: priorityLevel }) => {
      const color =
        TASK_PRIORITY_COLOR_MAPPING[priorityLevel as TaskPriorityLevel]
      const label =
        TASK_PRIORITY_TEXT_MAPPING[priorityLevel as TaskPriorityLevel]

      return (
        <Menu.Item
          key={priorityLevel}
          onClick={() => {
            if (priorityLevel !== priority) {
              changeTaskPriority(priorityLevel)
            }
          }}
        >
          <Container inline right='xsmall'>
            <Indicator color={color} aria-label={label} />
          </Container>
          <Typography size='xsmall' inline>
            {label}
          </Typography>
        </Menu.Item>
      )
    })

  return (
    <Dropdown
      disablePortal
      placement='bottom'
      content={<Menu>{renderMenuItems()}</Menu>}
    >
      <Button.Circular
        variant='flat'
        icon={<Pencil16 />}
        aria-label='Change task priority'
        loading={loading}
      />
    </Dropdown>
  )
}

export interface Props {
  taskId: string
  priority: TaskPriorityLevel
  disabled?: boolean
}

const EditableTaskPriority = ({
  taskId,
  priority,
  disabled = false
}: Props) => {
  return (
    <Container
      flex
      alignItems='center'
      data-testid={`priority-${priority.toLowerCase()}`}
    >
      <Tooltip
        interactive
        delay='long'
        content={TASK_PRIORITY_TEXT_MAPPING[priority]}
        disableListeners={!disabled}
      >
        <Indicator
          color={TASK_PRIORITY_COLOR_MAPPING[priority]}
          aria-label={TASK_PRIORITY_TEXT_MAPPING[priority]}
        />
      </Tooltip>

      {!disabled && <EditPriority taskId={taskId} priority={priority} />}
    </Container>
  )
}

export default EditableTaskPriority
