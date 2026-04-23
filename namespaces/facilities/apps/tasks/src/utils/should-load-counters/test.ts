import {
  TaskFilterStatus,
  TaskOrderField,
  OrderDirection
} from '@staff-portal/graphql/staff'

import { shouldLoadCounters } from './should-load-counters'

describe('shouldLoadCounters', () => {
  it('should load counters', () => {
    expect(
      shouldLoadCounters(['test-id'], [TaskFilterStatus.PENDING], {
        field: TaskOrderField.DUE_DATE,
        direction: OrderDirection.ASC
      })
    ).toBe(true)
    expect(
      shouldLoadCounters(
        ['test-id-1', 'test-id-2'],
        [TaskFilterStatus.COMPLETED_TODAY, TaskFilterStatus.PENDING]
      )
    ).toBe(true)
  })

  it('should not load counters', () => {
    expect(
      shouldLoadCounters(['test-id'], [TaskFilterStatus.DISPUTED], {
        field: TaskOrderField.DUE_DATE,
        direction: OrderDirection.ASC
      })
    ).toBe(false)
    expect(shouldLoadCounters([], [TaskFilterStatus.DISPUTED])).toBe(false)
  })
})
