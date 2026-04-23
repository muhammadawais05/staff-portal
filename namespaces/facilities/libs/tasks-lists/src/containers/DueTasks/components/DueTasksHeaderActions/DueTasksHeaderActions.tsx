// eslint-disable-next-line
import { Button, Link as PicassoLink } from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/navigation'
import { TaskFilterStatus, TaskSource } from '@staff-portal/graphql/staff'
import { getTasksPath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { OperationFragment } from '@staff-portal/operations'
import { AddNewTaskButton } from '@staff-portal/tasks'

export interface Props {
  createTaskOperation?: OperationFragment
  onTaskCreated: () => void
}

const DueTasksHeaderActions = ({
  createTaskOperation,
  onTaskCreated
}: Props) => {
  const user = useGetCurrentUser()

  return (
    <>
      <Button
        as={Link as typeof PicassoLink}
        size='small'
        variant='secondary'
        href={getTasksPath({
          performerId: user && decodeEntityId(user.id).id,
          statuses: [TaskFilterStatus.PENDING, TaskFilterStatus.COMPLETED_TODAY]
        })}
      >
        See All
      </Button>

      {createTaskOperation && (
        <AddNewTaskButton
          source={TaskSource.DASHBOARD_DUE_TASKS}
          createTaskOperation={createTaskOperation}
          onTaskCreated={onTaskCreated}
        />
      )}
    </>
  )
}

export default DueTasksHeaderActions
