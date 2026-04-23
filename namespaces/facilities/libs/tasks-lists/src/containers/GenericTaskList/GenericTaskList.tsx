import { EmptyState } from '@toptal/picasso'
import React, { ReactNode } from 'react'
import { TableSkeleton } from '@staff-portal/ui'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { REFETCH_TASKS } from '@staff-portal/tasks'
import {
  TaskColumnKeysType,
  taskColumns,
  TaskListItemFragment
} from '@staff-portal/tasks-list-item'

import TaskItemsTable from './components/TasksTable'

export interface GenericTaskListProps {
  loading: boolean
  showDisputeActions: boolean
  tasks?: TaskListItemFragment[]
  noResultsMessage?: string
  refreshTaskList: () => void
  onCollapse?: () => void
  hiddenColumns?: TaskColumnKeysType[]
  footer?: ReactNode
}

const GenericTaskList = ({
  loading,
  tasks,
  showDisputeActions,
  noResultsMessage = 'There are no tasks.',
  refreshTaskList,
  onCollapse,
  hiddenColumns,
  footer
}: GenericTaskListProps) => {
  useMessageListener(REFETCH_TASKS, refreshTaskList)

  if (loading) {
    return (
      <TableSkeleton
        cols={taskColumns.filter(
          column => !hiddenColumns?.includes(column.key)
        )}
        rows={5}
        dataTestId='tasks-table-loader'
      />
    )
  }

  if (!tasks?.length) {
    return (
      <EmptyState.Collection data-testid='GenericTaskList-empty'>
        {noResultsMessage}
      </EmptyState.Collection>
    )
  }

  return (
    <>
      <TaskItemsTable
        data={tasks}
        showDisputeActions={showDisputeActions}
        onCollapse={onCollapse}
        hiddenColumns={hiddenColumns}
      />
      {footer}
    </>
  )
}

export default GenericTaskList
