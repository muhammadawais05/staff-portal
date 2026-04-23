import { TaskStatus } from '@staff-portal/tasks'

export const isTaskCompleted = (status: TaskStatus) =>
  [TaskStatus.FINISHED, TaskStatus.CANCELLED].includes(status)
