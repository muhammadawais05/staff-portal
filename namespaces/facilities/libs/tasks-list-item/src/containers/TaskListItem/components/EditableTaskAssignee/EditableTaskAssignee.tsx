import {
  Button,
  Pencil16,
  Tooltip,
  Typography,
  Dropdown,
  Container
} from '@toptal/picasso'
import { getNameInitials, useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { LinkWrapper } from '@staff-portal/ui'
import { RoleOrClientFragment } from '@staff-portal/facilities'
import { TaskStaffAutocomplete, TaskStaffFragment } from '@staff-portal/tasks'

import { useReassignTask } from './data'

const ERROR_MESSAGE = `An error occurred, the task was not reassigned.`
const CONTENT_OFFSET = { top: 'xsmall' as const }

const EditAssigneeDropdown = ({
  assigneeName,
  onAssigneeChange
}: {
  assigneeName: string
  onAssigneeChange: (id: string) => void
}) => {
  const { close: closeDropdown } = Dropdown.useContext()

  const handleOnSelect = ({ id }: TaskStaffFragment) => {
    onAssigneeChange(id)
    closeDropdown()
  }

  return (
    <TaskStaffAutocomplete
      autoFocus
      initialDisplayValue={assigneeName}
      onSelect={handleOnSelect}
    />
  )
}

const EditAssignee = ({
  assigneeId,
  taskId,
  assigneeName
}: {
  assigneeId: string
  assigneeName: string
  taskId: string
}) => {
  const { showError } = useNotifications()

  const { reassignTask, loading } = useReassignTask({
    taskId,
    onCompleted: ({ reassignTask: result }) => {
      if (!result?.success && result?.errors) {
        showError(concatMutationErrors(result?.errors))
      }
    },
    onError: () => {
      showError(ERROR_MESSAGE)
    }
  })

  const onAssigneeChange = (newAssigneeId: string) => {
    if (newAssigneeId !== assigneeId) {
      reassignTask(newAssigneeId)
    }
  }

  return (
    <Dropdown
      disablePortal
      disableAutoClose
      offset={CONTENT_OFFSET}
      content={
        <EditAssigneeDropdown
          assigneeName={assigneeName}
          onAssigneeChange={onAssigneeChange}
        />
      }
    >
      <Button.Circular
        variant='flat'
        icon={<Pencil16 />}
        aria-label='Edit task assignee'
        data-testid='task-edit-assignee'
        loading={loading}
      />
    </Dropdown>
  )
}

export interface Props {
  taskId: string
  assignee: RoleOrClientFragment
  disabled?: boolean
  lineThrough?: boolean
}

const EditableTaskAssignee = ({
  taskId,
  assignee: {
    id,
    fullName,
    webResource: { url }
  },
  disabled = false,
  lineThrough = false
}: Props) => {
  return (
    <Container flex alignItems='center' data-testid='assignee'>
      <LinkWrapper wrapWhen={Boolean(url)} href={url as string}>
        <Tooltip
          interactive
          delay='long'
          placement='top'
          content={fullName}
          data-testid='assignee-fullname'
        >
          <Typography
            inline
            noWrap
            color='inherit'
            lineThrough={lineThrough}
            className='focused-link'
          >
            {getNameInitials(fullName)}
          </Typography>
        </Tooltip>
      </LinkWrapper>

      {!disabled && (
        <EditAssignee assigneeId={id} assigneeName={fullName} taskId={taskId} />
      )}
    </Container>
  )
}

export default EditableTaskAssignee
