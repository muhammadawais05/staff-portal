import React, { useMemo } from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { TaskSource } from '@staff-portal/graphql/staff'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { Operation, OperationFragment } from '@staff-portal/operations'

import { TaskCreateData } from './../../types'
import AddNewTaskModal from './components/AddNewTaskModal'

export interface Props {
  source: TaskSource
  primaryTaskSubjectId?: string
  createTaskOperation?: OperationFragment
  onTaskCreated: () => void
}

const AddNewTaskButton = ({
  primaryTaskSubjectId,
  source,
  createTaskOperation,
  onTaskCreated
}: Props) => {
  const user = useGetCurrentUser()

  const taskCreateData = useMemo<TaskCreateData>(() => {
    const performer = { id: user?.id || '', fullName: user?.fullName || '' }

    return { performer, primaryTaskSubjectId, source }
  }, [user, primaryTaskSubjectId, source])

  const { showModal } = useModal(AddNewTaskModal, {
    taskCreateData,
    onTaskCreated
  })

  return (
    <Operation
      operation={createTaskOperation}
      render={disabled => (
        <Button
          variant='primary'
          size='small'
          disabled={disabled}
          onClick={showModal}
          data-testid='add-new-task-button'
        >
          Add New Task
        </Button>
      )}
    />
  )
}

export default AddNewTaskButton
