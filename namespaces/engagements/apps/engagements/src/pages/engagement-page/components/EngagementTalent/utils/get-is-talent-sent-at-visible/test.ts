import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { getIsTalentSentAtVisible } from './get-is-talent-sent-at-visible'

describe('#getIsTalentSentAtVisible', () => {
  it.each([
    [EngagementCumulativeStatus.INTERVIEW_PENDING, true],
    [EngagementCumulativeStatus.PENDING_EXPIRATION, true],
    [EngagementCumulativeStatus.INTERVIEW_OCCURRED_VERIFIED_BY_STAFF, true]
  ])('returns true for visible statuses', async (status, isVisible) => {
    expect(getIsTalentSentAtVisible(status)).toBe(isVisible)
  })

  it.each([
    [EngagementCumulativeStatus.DRAFT, false],
    [EngagementCumulativeStatus.READY_TO_SEND, false],
    [EngagementCumulativeStatus.ON_HOLD, false]
  ])('returns false for not visible statuses', async (status, isVisible) => {
    expect(getIsTalentSentAtVisible(status)).toBe(isVisible)
  })
})
