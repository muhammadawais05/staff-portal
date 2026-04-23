import React from 'react'
import { Container } from '@toptal/picasso'
import { GenericTaskList } from '@staff-portal/tasks-lists'
import { TaskListItemFragment } from '@staff-portal/tasks-list-item'

interface Props {
  tasks: TaskListItemFragment[]
  refetch: () => void
}

const TasksTab = ({ tasks, refetch }: Props) => {
  return (
    <Container top='small'>
      <GenericTaskList
        tasks={tasks}
        showDisputeActions
        loading={false}
        refreshTaskList={refetch}
      />
    </Container>
  )
}

export default TasksTab
