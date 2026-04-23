import { EngagementStatus } from '@staff-portal/graphql/staff'

import { isSectionHidden } from './is-section-hidden'

const emptyCases = [undefined, null]

const falsyCases = [
  EngagementStatus.PENDING_LEGAL,
  EngagementStatus.SCHEDULED,
  EngagementStatus.ON_TRIAL,
  EngagementStatus.ON_HOLD,
  EngagementStatus.ACTIVE,
  EngagementStatus.ON_BREAK,
  EngagementStatus.END_SCHEDULED,
  EngagementStatus.CLOSED
]
const truthyCases = [
  EngagementStatus.CANCELLED,
  EngagementStatus.CANCELLED_DRAFT,
  EngagementStatus.DRAFT,
  EngagementStatus.EXPIRATION_POSTPONED,
  EngagementStatus.EXPIRED,
  EngagementStatus.PENDING,
  EngagementStatus.PENDING_APPROVAL,
  EngagementStatus.PENDING_EXPIRATION,
  EngagementStatus.READY_TO_SEND,
  EngagementStatus.REJECTED_DRAFT,
  EngagementStatus.REJECTED_INTERVIEW,
  EngagementStatus.REJECTED_TRIAL,
  EngagementStatus.REVIEWED
]

describe('#isSectionHidden', () => {
  describe('returns true if section is status is empty', () => {
    it.each(emptyCases)('%s: return true', condition => {
      expect(isSectionHidden(condition)).toBe(true)
    })
  })

  describe('returns true for some statues', () => {
    it.each(truthyCases)('%s: return true', condition => {
      expect(isSectionHidden(condition)).toBe(true)
    })
  })

  describe('returns false for some statues', () => {
    it.each(falsyCases)('%s: return false', condition => {
      expect(isSectionHidden(condition)).toBe(false)
    })
  })
})
