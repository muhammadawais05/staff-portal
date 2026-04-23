import { EngagementStatus } from '@staff-portal/graphql/staff'

import { isEndDateRequired } from './is-end-date-required'

const TRUTHY_CASES = [
  EngagementStatus.SCHEDULED,
  EngagementStatus.ON_TRIAL,
  EngagementStatus.ON_HOLD
]

const FALSY_CASES = [
  EngagementStatus.ACTIVE,
  EngagementStatus.CANCELLED,
  EngagementStatus.CANCELLED_DRAFT,
  EngagementStatus.CLOSED,
  EngagementStatus.DRAFT,
  EngagementStatus.END_SCHEDULED,
  EngagementStatus.EXPIRATION_POSTPONED,
  EngagementStatus.EXPIRED,
  EngagementStatus.ON_BREAK,
  EngagementStatus.PENDING,
  EngagementStatus.PENDING_APPROVAL,
  EngagementStatus.PENDING_EXPIRATION,
  EngagementStatus.PENDING_LEGAL,
  EngagementStatus.READY_TO_SEND,
  EngagementStatus.REJECTED_DRAFT,
  EngagementStatus.REJECTED_INTERVIEW,
  EngagementStatus.REJECTED_TRIAL,
  EngagementStatus.REVIEWED
]

describe('#isEndDateRequired', () => {
  it('returns false for empty status', () => {
    expect(isEndDateRequired(undefined)).toBe(false)
    expect(isEndDateRequired(null)).toBe(false)
  })

  it.each(TRUTHY_CASES)('%s: returns true', status => {
    expect(isEndDateRequired(status)).toBe(true)
  })

  it.each(FALSY_CASES)('%s: returns false', status => {
    expect(isEndDateRequired(status)).toBe(false)
  })
})
