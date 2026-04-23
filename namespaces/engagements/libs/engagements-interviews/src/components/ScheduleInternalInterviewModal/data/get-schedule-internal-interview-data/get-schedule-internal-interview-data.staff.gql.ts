import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import {
  SCHEDULE_ENGAGEMENT_FRAGMENT,
  SCHEDULE_INTERVIEW_FRAGMENT
} from '../../../../data'

export const GET_SCHEDULE_INTERNAL_INTERVIEW_DATA = gql`
  query GetScheduleInternalInterviewData($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        ...ScheduleEngagementFragment

        newInternalInterview {
          id
          ...ScheduleInterviewFragment

          operations {
            scheduleInternalSingleCommitInterview {
              ...OperationFragment
            }
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
