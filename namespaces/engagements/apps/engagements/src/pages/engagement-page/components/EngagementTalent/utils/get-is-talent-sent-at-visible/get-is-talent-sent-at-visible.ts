import { EngagementCumulativeStatus } from '@staff-portal/engagements'

const TALENT_SENT_AT_VISIBLE_STATUSES = [
  EngagementCumulativeStatus.INTERVIEW_TIME_ACCEPTED,
  EngagementCumulativeStatus.INTERVIEW_PENDING,
  EngagementCumulativeStatus.INTERVIEW_SCHEDULED,
  EngagementCumulativeStatus.INTERVIEW_OCCURRED,
  EngagementCumulativeStatus.INTERVIEW_OCCURRED_VERIFIED_BY_STAFF,
  EngagementCumulativeStatus.PENDING_EXPIRATION,
  EngagementCumulativeStatus.EXPIRATION_POSTPONED
]

export const getIsTalentSentAtVisible = (cumulativeStatus?: string | null) => {
  if (!cumulativeStatus) {
    return false
  }

  return TALENT_SENT_AT_VISIBLE_STATUSES.includes(
    cumulativeStatus as EngagementCumulativeStatus
  )
}
