import { getRoleTypeText } from '@staff-portal/facilities'
import {
  EngagementStatus,
  Maybe,
  TalentCurrentInterviewsInterviewStatus
} from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

import { statusOrderingMap } from '../config'

export const getStatusOrdering = (
  engagementStatus: EngagementStatus,
  interviewStatus?: TalentCurrentInterviewsInterviewStatus | null
) =>
  statusOrderingMap[
    `${engagementStatus}${interviewStatus ? `_${interviewStatus}` : ''}`
  ] || 0

export const getEngagementStatusText = (engagementStatus: EngagementStatus) => {
  switch (engagementStatus) {
    case EngagementStatus.REVIEWED:
      return 'Waiting for Confirmation'
    case EngagementStatus.PENDING:
      return 'Pending Review'
    default:
      return titleize(engagementStatus)
  }
}

export const getInterviewStatusText = ({
  interviewStatus,
  talentType
}: {
  interviewStatus?: Maybe<TalentCurrentInterviewsInterviewStatus>
  talentType: string
}) => {
  switch (interviewStatus) {
    case TalentCurrentInterviewsInterviewStatus.ACCEPTED:
      return `${getRoleTypeText(talentType)} Accepted`
    case TalentCurrentInterviewsInterviewStatus.MISSED:
      return 'Missed'
    case TalentCurrentInterviewsInterviewStatus.OCCURRED:
      return 'Interview Occurred'
    case TalentCurrentInterviewsInterviewStatus.REJECTED:
      return `${getRoleTypeText(talentType)} Rejected`
    case TalentCurrentInterviewsInterviewStatus.SCHEDULED:
      return 'Waiting for Confirmation'
    case TalentCurrentInterviewsInterviewStatus.TIME_ACCEPTED:
      return 'Interview time confirmed'
    case TalentCurrentInterviewsInterviewStatus.TIME_REJECTED:
      return 'Interview time rejected'
    case TalentCurrentInterviewsInterviewStatus.PENDING:
    default:
      return 'Not scheduled'
  }
}

export const getStatusText = ({
  engagementStatus,
  interviewStatus,
  talentType
}: {
  engagementStatus: EngagementStatus
  interviewStatus?: Maybe<TalentCurrentInterviewsInterviewStatus>
  talentType: string
}) => {
  if (engagementStatus === EngagementStatus.REVIEWED) {
    return getInterviewStatusText({ interviewStatus, talentType })
  }

  return getEngagementStatusText(engagementStatus)
}
