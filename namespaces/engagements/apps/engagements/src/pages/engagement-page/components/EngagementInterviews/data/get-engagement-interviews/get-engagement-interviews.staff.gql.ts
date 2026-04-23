import { gql, useQuery } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { ROLE_OR_CLIENT_FRAGMENT } from '@staff-portal/facilities'

import { GetEngagementInterviewsDocument } from './get-engagement-interviews.staff.gql.types'

export const GET_ENGAGEMENT_INTERVIEWS = gql`
  query GetEngagementInterviews($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        status
        talent {
          id
          type
        }
        interviews(
          filter: { scope: EXTERNAL }
          order: { direction: DESC, field: CREATED_AT }
        ) {
          nodes {
            ...EngagementInterviewFragment
          }
        }

        newExternalInterview {
          id
          operations {
            scheduleSingleCommitInterview {
              ...OperationFragment
            }
            proposeInterviewTimeSlots {
              ...OperationFragment
            }
          }
        }
      }
    }
  }

  fragment EngagementInterviewFragment on Interview {
    id
    status
    communication: communicationV2
    cumulativeStatus
    scheduledAtTimes
    warningLevel
    initiator: initiatorV2
    interviewContacts: interviewContactsV3 {
      edges {
        main
        node {
          ...RoleOrClientFragment
        }
      }
    }
    interviewTime
    interviewType
    kind
    statusComment
    webConferenceInfo {
      url
    }
    timeZone {
      ...TimeZoneFragment
    }
    occurred
    bluejeansMeetingHistory {
      startTime
      durationInSeconds
    }
    operations {
      rateForClientInterview {
        ...OperationFragment
      }
      clearAndRescheduleSingleCommitInterview {
        ...OperationFragment
      }
      clearAndChangeInterviewProposedTimeSlots {
        ...OperationFragment
      }
    }
  }

  ${TIME_ZONE_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${ROLE_OR_CLIENT_FRAGMENT}
`

export const useGetEngagementInterviews = (engagementId: string) => {
  const { data, ...restOptions } = useQuery(GetEngagementInterviewsDocument, {
    variables: { engagementId }
  })

  return {
    engagement: data?.node,
    interviews: data?.node?.interviews?.nodes,
    ...restOptions
  }
}
