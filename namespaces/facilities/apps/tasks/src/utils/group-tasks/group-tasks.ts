import { TaskListItemFragment } from '@staff-portal/tasks-list-item'

import { TaskGroupFragment } from '../../pages/TasksList/data/get-tasks-list'
import { TaskGroup } from '../../types'

export interface TaskWithGroup {
  node: TaskListItemFragment
  group: TaskGroupFragment
}

export const groupTasks = (groupedTasks: TaskWithGroup[]): TaskGroup[] => {
  // We need to use a Map because the order matters
  const taskGroupsById = new Map<string, TaskGroup>()

  groupedTasks.forEach(taskWithGroup => {
    const { group, node: task } = taskWithGroup
    const { id: groupId } = group
    const { tasks = [] } = taskGroupsById.get(groupId) ?? {}

    return taskGroupsById.set(groupId, {
      group,
      tasks: [...tasks, task]
    })
  })

  return Array.from(taskGroupsById.values())
}
