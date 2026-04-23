import { EngagementStatus } from '@staff-portal/graphql/staff'

import { isShowBillingEngagement } from './is-show-billing-engagement'

const emptyCases = [undefined, null]

const falsyCases = [
  EngagementStatus.CANCELLED,
  EngagementStatus.DRAFT,
  EngagementStatus.CANCELLED_DRAFT,
  EngagementStatus.EXPIRATION_POSTPONED,
  EngagementStatus.EXPIRED,
  EngagementStatus.PENDING,
  EngagementStatus.PENDING_APPROVAL,
  EngagementStatus.PENDING_EXPIRATION,
  EngagementStatus.READY_TO_SEND,
  EngagementStatus.REJECTED_DRAFT,
  EngagementStatus.REJECTED_INTERVIEW,
  EngagementStatus.REVIEWED
]
const truthyCases = [
  EngagementStatus.PENDING_LEGAL,
  EngagementStatus.SCHEDULED,
  EngagementStatus.ON_TRIAL,
  EngagementStatus.ON_HOLD,
  EngagementStatus.ACTIVE,
  EngagementStatus.ON_BREAK,
  EngagementStatus.END_SCHEDULED,
  EngagementStatus.CLOSED,
  EngagementStatus.REJECTED_TRIAL
]

describe('#isShowBillingEngagement', () => {
  describe('returns false if engagement status is empty', () => {
    it.each(emptyCases)('%s: return false', condition => {
      expect(isShowBillingEngagement(condition)).toBe(false)
    })
  })

  describe('returns true for some statuses', () => {
    it.each(truthyCases)('%s: return true', condition => {
      expect(isShowBillingEngagement(condition)).toBe(true)
    })
  })

  describe('returns false for some statuses', () => {
    it.each(falsyCases)('%s: return false', condition => {
      expect(isShowBillingEngagement(condition)).toBe(false)
    })
  })
})
