import { TaskStatus } from '../../enums'
import { getTaskStatusColor } from './get-task-status-color'

describe('getTaskStatusColor', () => {
  it.each([
    [TaskStatus.PENDING, 'yellow'],
    [TaskStatus.FINISHED, 'green'],
    [TaskStatus.CANCELLED, 'inherit'],
    [TaskStatus.INACTIVE, 'inherit'],
    [TaskStatus.PAUSED, 'inherit']
  ])('shows %s task status color - %s', (input, expected) => {
    expect(getTaskStatusColor(input)).toBe(expected)
  })
})
