import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import {
  SCHEDULE_ENGAGEMENT_FRAGMENT,
  SCHEDULE_INTERVIEW_FRAGMENT
} from '../../../../data'

export const GET_RESCHEDULE_INTERNAL_INTERVIEW_DATA = gql`
  query GetRescheduleInternalInterviewData($interviewId: ID!) {
    node(id: $interviewId) {
      ... on Interview {
        id
        ...ScheduleInterviewFragment

        engagement {
          id
          ...ScheduleEngagementFragment
        }

        operations {
          clearAndRescheduleInternalSingleCommitInterview {
            ...OperationFragment
          }
        }
      }
    }
    experiments {
      clientTalentZoomSupport {
        enabled
      }
    }
  }

  ${SCHEDULE_ENGAGEMENT_FRAGMENT}
  ${SCHEDULE_INTERVIEW_FRAGMENT}
  ${OPERATION_FRAGMENT}
`
