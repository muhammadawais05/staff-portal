import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { TaskSource } from '@staff-portal/graphql/staff'
import { Operation, OperationFragment } from '@staff-portal/operations'
import { AddNewTaskModal, TaskCreateData } from '@staff-portal/tasks'

import { TalentCoachingEngagementFragment } from '../../../../data'

export interface Props {
  talentCoachingEngagement?: TalentCoachingEngagementFragment
  createTaskOperation?: OperationFragment
  onTaskCreated?: () => void
}

const AddTaskButton = ({
  talentCoachingEngagement,
  createTaskOperation,
  onTaskCreated
}: Props) => {
  const taskCreateData: TaskCreateData = {
    performer: talentCoachingEngagement?.coach
      ? {
          id: talentCoachingEngagement?.coach.id,
          fullName: talentCoachingEngagement?.coach.fullName
        }
      : undefined,
    primaryTaskSubjectId: talentCoachingEngagement?.id,
    source: TaskSource.RELATED_TASKS_TALENT_COACHING_ENGAGEMENT
  }

  const { showModal } = useModal(AddNewTaskModal, {
    taskCreateData,
    onTaskCreated
  })

  return (
    <Operation
      operation={createTaskOperation}
      render={disabled => (
        <Button
          variant='secondary'
          size='small'
          disabled={disabled}
          onClick={showModal}
          data-testid='add-task-button'
        >
          Add Task
        </Button>
      )}
    />
  )
}

export default AddTaskButton
