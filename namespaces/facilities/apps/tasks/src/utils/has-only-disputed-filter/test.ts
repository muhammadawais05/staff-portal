import { TaskFilterStatus } from '@staff-portal/graphql/staff'

import { hasOnlyDisputedFilter } from './has-only-disputed-filter'

describe('hasOnlyDisputedFilter', () => {
  it('should return true if called with only disputed filter status', () => {
    expect(hasOnlyDisputedFilter([TaskFilterStatus.DISPUTED])).toBe(true)
  })

  it('should return false if called with more than one statuses or status is not disputed', () => {
    expect(
      hasOnlyDisputedFilter([
        TaskFilterStatus.DISPUTED,
        TaskFilterStatus.COMPLETED_TODAY
      ])
    ).toBe(false)
    expect(hasOnlyDisputedFilter([TaskFilterStatus.COMPLETED])).toBe(false)
  })
})
