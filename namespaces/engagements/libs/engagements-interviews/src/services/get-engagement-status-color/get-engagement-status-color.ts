import {
  EngagementStatus,
  InterviewCumulativeStatus
} from '@staff-portal/graphql/staff'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { getInterviewStatusColor } from '../../utils/get-interview-status-color'

type EngagementWithStatus = {
  status: EngagementStatus
  cumulativeStatus: string
  interview?: {
    cumulativeStatus: InterviewCumulativeStatus
  } | null
}

// TODO: Check with BE team if we still need for handle `EngagementStatus.REVIEWED`
//
// def cumulative_status
//   reviewed? ? :"interview_#{external_interview.status}" : status
// end

// eslint-disable-next-line complexity
export const getEngagementStatusColor = (engagement: EngagementWithStatus) => {
  if (engagement.status === EngagementStatus.REVIEWED && engagement.interview) {
    return getInterviewStatusColor(engagement.interview)
  }
  switch (engagement.cumulativeStatus) {
    case EngagementCumulativeStatus.PENDING_EXPIRATION:
    case EngagementCumulativeStatus.REJECTED_TRIAL:
    case EngagementCumulativeStatus.REJECTED_INTERVIEW:
    case EngagementCumulativeStatus.EXPIRED:
    case EngagementCumulativeStatus.ON_HOLD:
    case EngagementCumulativeStatus.REJECTED_DRAFT:
    case EngagementCumulativeStatus.INTERVIEW_TIME_REJECTED:
    case EngagementCumulativeStatus.INTERVIEW_MISSED:
    case EngagementCumulativeStatus.INTERVIEW_REJECTED:
    case EngagementCumulativeStatus.INTERVIEW_NOT_OCCURRED:
    case EngagementCumulativeStatus.INTERVIEW_NOT_OCCURRED_VERIFIED_BY_STAFF:
      return 'red'
    case EngagementCumulativeStatus.DRAFT:
    case EngagementCumulativeStatus.PENDING_APPROVAL:
    case EngagementCumulativeStatus.PENDING:
    case EngagementCumulativeStatus.END_SCHEDULED:
    case EngagementCumulativeStatus.ON_BREAK:
    case EngagementCumulativeStatus.EXPIRATION_POSTPONED:
    case EngagementCumulativeStatus.PENDING_LEGAL:
    case EngagementCumulativeStatus.INTERVIEW_SCHEDULED:
      return 'yellow'
    case EngagementCumulativeStatus.ACTIVE:
    case EngagementCumulativeStatus.ON_TRIAL:
    case EngagementCumulativeStatus.SCHEDULED:
    case EngagementCumulativeStatus.INTERVIEW_TIME_ACCEPTED:
    case EngagementCumulativeStatus.INTERVIEW_ACCEPTED:
    case EngagementCumulativeStatus.INTERVIEW_OCCURRED:
    case EngagementCumulativeStatus.INTERVIEW_OCCURRED_VERIFIED_BY_STAFF:
      return 'green'
  }
}
