import React from 'react'
import { TableSkeleton } from '@staff-portal/ui'
import { TASKS_DEFAULT_PAGE_SIZE } from '@staff-portal/tasks'
import { TaskColumnKeysType, taskColumns } from '@staff-portal/tasks-list-item'

import FilterLoader from '../FilterLoader'
import SummaryBarLoader from '../SummaryBarLoader'

export interface TasksPageLoaderProps {
  showSummaryBarLoader?: boolean
  hiddenColumns?: TaskColumnKeysType[]
}

const TasksPageLoader = ({
  showSummaryBarLoader = false,
  hiddenColumns
}: TasksPageLoaderProps) => {
  return (
    <>
      <FilterLoader />

      {showSummaryBarLoader && <SummaryBarLoader />}

      <TableSkeleton
        cols={taskColumns.filter(
          column => !hiddenColumns?.includes(column.key)
        )}
        rows={TASKS_DEFAULT_PAGE_SIZE}
      />
    </>
  )
}

export default TasksPageLoader
