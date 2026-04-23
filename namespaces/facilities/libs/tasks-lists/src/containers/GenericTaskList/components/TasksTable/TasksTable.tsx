import { Container, Table } from '@toptal/picasso'
import React, { memo, useEffect, useState } from 'react'
import { NoSearchResultsMessage, CenteredLoader } from '@staff-portal/ui'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { CLOSE_EXPANDED_TASK } from '@staff-portal/tasks'
import {
  TaskListItem,
  TaskListItemFragment,
  TaskColumnKeysType,
  TasksTableHeader
} from '@staff-portal/tasks-list-item'

import * as TableStyles from './styles'

const NO_RESULTS_MESSAGE = 'There are no tasks for this search criteria'

export interface Props {
  data: TaskListItemFragment[]
  loading?: boolean
  showDisputeActions?: boolean
  defaultExpandedTaskId?: string | null
  onCollapse?: () => void
  hiddenColumns?: TaskColumnKeysType[]
}

const TasksTable = ({
  data: tasks,
  loading = false,
  showDisputeActions = false,
  defaultExpandedTaskId = null,
  onCollapse,
  hiddenColumns
}: Props) => {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(
    defaultExpandedTaskId
  )

  useMessageListener(CLOSE_EXPANDED_TASK, () => setExpandedTaskId(null))

  useEffect(() => {
    setExpandedTaskId(defaultExpandedTaskId)
  }, [defaultExpandedTaskId])

  useEffect(() => {
    const shouldCleanUp =
      expandedTaskId &&
      tasks.every(({ id }: TaskListItemFragment) => expandedTaskId !== id)

    // cleans-up expanded task when is not present
    // inside the task list due to filter or pagination changes
    if (shouldCleanUp) {
      setExpandedTaskId(defaultExpandedTaskId)
    }
  }, [tasks, expandedTaskId, defaultExpandedTaskId])

  if (!loading && !tasks.length) {
    return <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
  }

  const handleExpandTask = (taskId: string | null) => {
    setExpandedTaskId(taskId)

    if (!taskId) {
      onCollapse?.()
    }
  }

  return (
    <CenteredLoader loading={loading}>
      <Container css={[loading && TableStyles.disabledTableWrapper]}>
        <Table>
          <TasksTableHeader hiddenColumns={hiddenColumns} />
          <Table.Body>
            {tasks.map((task: TaskListItemFragment, index: number) => (
              <TaskListItem
                key={task.id}
                task={task}
                index={index}
                isExpanded={expandedTaskId === task.id}
                expandTask={handleExpandTask}
                showDisputeActions={showDisputeActions}
                hiddenColumns={hiddenColumns}
              />
            ))}
          </Table.Body>
        </Table>
      </Container>
    </CenteredLoader>
  )
}

export default memo(TasksTable)
