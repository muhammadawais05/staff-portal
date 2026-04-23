import { Table } from '@toptal/picasso'
import React, { memo, useEffect, useState } from 'react'
import { NoSearchResultsMessage, TableSkeleton } from '@staff-portal/ui'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import {
  CLOSE_EXPANDED_TASK,
  TASKS_DEFAULT_PAGE_SIZE
} from '@staff-portal/tasks'
import {
  taskColumns,
  TaskListItem,
  TaskListItemFragment,
  TasksTableHeader
} from '@staff-portal/tasks-list-item'

import { TaskGroup } from '../../types'
import TaskGroupHeader from '../TaskGroupHeader'

const NO_RESULTS_MESSAGE = 'There are no tasks for this search criteria'

export interface Props {
  data: TaskGroup[]
  loading?: boolean
  showDisputeActions?: boolean
  defaultExpandedTaskId?: string | null
}

const TaskGroupList = ({
  title,
  tasks,
  expandedTaskId,
  expandTask,
  showDisputeActions
}: {
  title: string
  tasks: TaskListItemFragment[]
  expandedTaskId: string | null
  expandTask: (taskId: string | null) => void
  showDisputeActions?: boolean
}) => (
  <>
    <TaskGroupHeader title={title} />

    {tasks.map((task: TaskListItemFragment, index: number) => (
      <TaskListItem
        key={task.id}
        task={task}
        index={index}
        isExpanded={expandedTaskId === task.id}
        expandTask={expandTask}
        showDisputeActions={showDisputeActions}
      />
    ))}
  </>
)

const GroupedTasksTable = ({
  data: taskGroups,
  loading = false,
  showDisputeActions,
  defaultExpandedTaskId = null
}: Props) => {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(
    defaultExpandedTaskId
  )

  useMessageListener(CLOSE_EXPANDED_TASK, () => setExpandedTaskId(null))

  useEffect(() => {
    setExpandedTaskId(defaultExpandedTaskId)
  }, [defaultExpandedTaskId])

  useEffect(() => {
    const shouldCleanup =
      expandedTaskId &&
      taskGroups.every(taskOrGroup => {
        return taskOrGroup.tasks.every(
          ({ id }: TaskListItemFragment) => expandedTaskId !== id
        )
      })

    // cleans-up expanded task when is not present
    // inside the task list due to filter or pagination changes
    if (shouldCleanup) {
      setExpandedTaskId(defaultExpandedTaskId)
    }
  }, [taskGroups, expandedTaskId, defaultExpandedTaskId])

  if (!loading && !taskGroups.length) {
    return <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
  }

  if (loading) {
    return <TableSkeleton rows={TASKS_DEFAULT_PAGE_SIZE} cols={taskColumns} />
  }

  return (
    <Table data-testid='grouped-tasks-table'>
      <TasksTableHeader />
      <Table.Body>
        {taskGroups.map(({ group, tasks }) => (
          <TaskGroupList
            key={group.id}
            title={group.name}
            tasks={tasks}
            expandedTaskId={expandedTaskId}
            expandTask={setExpandedTaskId}
            showDisputeActions={showDisputeActions}
          />
        ))}
      </Table.Body>
    </Table>
  )
}

export default memo(GroupedTasksTable)
