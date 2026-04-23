import { gql } from '@staff-portal/data-layer-service'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'

export const ENGAGEMENT_DETAILED_STATUS_FRAGMENT = gql`
  fragment EngagementDetailedStatusFragment on Engagement {
    id
    status
    cumulativeStatus

    trialLength
    trialEndDate

    startDate
    rejectDate

    endDate
    onHoldStartDate

    restoredAt
    createdAt

    talent {
      id
      type
    }

    timeZone {
      ...TimeZoneFragment
    }

    interviews(filter: { scope: EXTERNAL }) {
      totalCount
    }

    currentEngagementBreak {
      id
      startDate
      endDate
    }

    interview {
      id
      cumulativeStatus

      scheduledAtTimes
      interviewTime
      verifierName

      meeting {
        id
        attendeeName
        topSchedulerMeeting
      }
    }
    internalInterview {
      id
      interviewTime
    }
  }
  ${TIME_ZONE_FRAGMENT}
`
