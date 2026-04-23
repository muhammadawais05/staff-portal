import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { JobEngagementCandidateFragment } from './components/JobCandidatesSection/data/get-job-candidates.staff.gql.types'

export const getTalentLink = (engagement: JobEngagementCandidateFragment) => {
  if (engagement.talent?.webResource.url) {
    return engagement.talent.webResource.url
  }

  return engagement.talent?.resumeUrl
}

const TALENT_SENT_ON_STATUSES = [
  EngagementCumulativeStatus.INTERVIEW_TIME_ACCEPTED,
  EngagementCumulativeStatus.INTERVIEW_PENDING,
  EngagementCumulativeStatus.INTERVIEW_SCHEDULED,
  EngagementCumulativeStatus.INTERVIEW_OCCURRED,
  EngagementCumulativeStatus.INTERVIEW_OCCURRED_VERIFIED_BY_STAFF,
  EngagementCumulativeStatus.PENDING_EXPIRATION,
  EngagementCumulativeStatus.EXPIRATION_POSTPONED
]

export const buildTalentSentOn = (
  formatDateTime: (date?: string | null) => string,
  cumulativeStatus?: string | null,
  talentSentAt?: string | null
) => {
  if (
    !talentSentAt ||
    !cumulativeStatus ||
    !TALENT_SENT_ON_STATUSES.includes(
      cumulativeStatus as EngagementCumulativeStatus
    )
  ) {
    return
  }

  const formattedDate = formatDateTime(talentSentAt)
  const dateDistance = getDateDistanceFromNow(talentSentAt)

  return `Talent sent on ${formattedDate} (${dateDistance})`
}
