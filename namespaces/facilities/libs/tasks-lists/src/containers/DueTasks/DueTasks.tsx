import React, { useCallback } from 'react'
import { Container } from '@toptal/picasso'
import { DashboardItemWrapper } from '@staff-portal/ui'
import { useGetCreateTaskOperation } from '@staff-portal/tasks'

import GenericTaskList from '../GenericTaskList'
import { useGetDueTasks } from './data'
import DueTasksHeaderActions from './components/DueTasksHeaderActions'

export interface Props {
  showDisputeActions?: boolean
}

const DueTasks = ({ showDisputeActions = false }: Props) => {
  const { data, error, loading, refetch } = useGetDueTasks(showDisputeActions)
  const { data: createTaskOperation } = useGetCreateTaskOperation()

  const refreshTaskList = useCallback(() => refetch(), [refetch])

  if (!data && error) {
    return null
  }

  return (
    <Container top='large' data-testid='due-tasks'>
      <DashboardItemWrapper
        hasPaddingTop={false}
        showTitleBorder={false}
        title='Due Tasks'
        gridSize={12}
        actions={
          <DueTasksHeaderActions
            createTaskOperation={createTaskOperation}
            onTaskCreated={refreshTaskList}
          />
        }
      >
        <GenericTaskList
          tasks={data?.nodes}
          showDisputeActions={showDisputeActions}
          loading={loading && !data}
          noResultsMessage="You don't have any tasks for today"
          refreshTaskList={refreshTaskList}
          onCollapse={refreshTaskList}
        />
      </DashboardItemWrapper>
    </Container>
  )
}

export default DueTasks
