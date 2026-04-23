import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { TALENT_ENGAGEMENT_RATES_FRAGMENT } from '@staff-portal/talents'
import { JOB_POSITION_ANSWER_FRAGMENT } from '@staff-portal/jobs'

export default gql`
  query GetJobApplication($jobApplicationId: ID!) {
    node(id: $jobApplicationId) {
      ...JobApplicationFragment
    }
  }

  fragment JobApplicationFragment on JobApplication {
    id
    approveUrl
    approveUrlTooltip
    createdAt
    emailMessaging {
      id
    }
    job {
      id
      client {
        id
        enterprise
        fullName
        webResource {
          url
          text
        }
      }
      commitment
      hoursOverlapEnum
      title
      timeZonePreference {
        ...TimeZoneFragment
      }
      hasPreferredHours
      webResource {
        url
        text
      }
    }
    jobPositionAnswers {
      nodes {
        ...JobPositionAnswerFragment
      }
      totalCount
    }
    operations {
      rejectJobApplicant {
        ...OperationFragment
      }
      emailJobApplicant {
        ...OperationFragment
      }
    }
    status
    talent {
      id
      allocatedHours
      type
      fullName
      deltaWaitingDays
      lastClosedEngagementEndDate
      lastAvailabilityIncreaseDate
      webResource {
        url
      }
      timeZone {
        ...TimeZoneFragment
      }
      ...TalentEngagementRatesFragment
    }
    talentPitch {
      id
      pitchText
    }
  }

  ${TALENT_ENGAGEMENT_RATES_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${TIME_ZONE_FRAGMENT}
  ${JOB_POSITION_ANSWER_FRAGMENT}
`
