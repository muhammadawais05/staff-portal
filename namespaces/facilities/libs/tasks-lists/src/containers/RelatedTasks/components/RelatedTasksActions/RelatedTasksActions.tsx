import React from 'react'
import { Button } from '@toptal/picasso'
import { RelatedTasksFilter, TaskSource } from '@staff-portal/graphql/staff'
import { OperationFragment } from '@staff-portal/operations'
import { AddNewTaskButton } from '@staff-portal/tasks'

interface Props {
  primaryTaskSubjectId: string
  source: TaskSource
  filter: RelatedTasksFilter
  loading: boolean
  completedCount?: number
  createTaskOperation?: OperationFragment
  onFilterChange: (filter: RelatedTasksFilter) => void
  onTaskCreated: () => void
}

const RelatedTasksActions = ({
  primaryTaskSubjectId,
  source,
  filter: { completed },
  loading,
  completedCount = 0,
  createTaskOperation,
  onFilterChange,
  onTaskCreated
}: Props) => {
  return (
    <>
      {createTaskOperation && (
        <AddNewTaskButton
          primaryTaskSubjectId={primaryTaskSubjectId}
          source={source}
          createTaskOperation={createTaskOperation}
          onTaskCreated={onTaskCreated}
        />
      )}

      <Button
        data-testid='related-tasks-toggle-completed'
        size='small'
        variant='secondary'
        loading={loading}
        disabled={!completedCount}
        onClick={() => onFilterChange({ completed: !completed })}
      >
        {completed ? 'Hide completed' : `Show completed (${completedCount})`}
      </Button>
    </>
  )
}

export default RelatedTasksActions
