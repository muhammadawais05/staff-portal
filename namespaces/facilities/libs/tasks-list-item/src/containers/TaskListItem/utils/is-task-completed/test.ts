import { TaskStatus } from '@staff-portal/tasks'

import { isTaskCompleted } from './is-task-completed'

describe('is task completed', () => {
  it('should check if task is completed', () => {
    expect(isTaskCompleted(TaskStatus.FINISHED)).toBe(true)
    expect(isTaskCompleted(TaskStatus.CANCELLED)).toBe(true)
    expect(isTaskCompleted(TaskStatus.PENDING)).toBe(false)
  })
})
