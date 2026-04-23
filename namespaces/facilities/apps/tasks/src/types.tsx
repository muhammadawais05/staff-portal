import { TaskListItemFragment } from '@staff-portal/tasks-list-item'

import { TaskGroupFragment } from './pages/TasksList/data/get-tasks-list'

export interface TaskGroup {
  group: TaskGroupFragment
  tasks: TaskListItemFragment[]
}
