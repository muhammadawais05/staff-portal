import {
  OperationCallableTypes,
  TaskPriorityLevel
} from '@staff-portal/graphql/staff'

import { TaskListItemFragment } from './task-list-item-fragment.staff.gql.types'

export const createTaskListItemMock = (
  fields: Partial<TaskListItemFragment> = {}
): TaskListItemFragment => ({
  __typename: 'Task',
  id: 'VjEtVGFzay03MjU0MDI',
  operations: {
    cancelTaskDispute: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  priority: TaskPriorityLevel.HIGH,
  description: 'Task description',
  status: 'pending',
  dueDate: '2020-06-03',
  recurringPeriod: null,
  disputed: false,
  starred: false,
  finishedWithChildTask: false,
  source: null,
  performer: {
    id: 'test-id',
    fullName: 'David Mason',
    webResource: {
      text: 'David Mason',
      url: 'https://staging.toptal.net/platform/staff/talents/1830142'
    }
  },
  engagedSubjects: {
    totalCount: 1
  },
  subjects: {
    nodes: []
  },
  ...fields
})
