import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import {
  SCHEDULE_ENGAGEMENT_FRAGMENT,
  SCHEDULE_INTERVIEW_FRAGMENT
} from '../../../../data'

export const GET_SCHEDULE_INTERVIEW_DATA = gql`
  query GetScheduleInterviewData($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        ...ScheduleEngagementFragment

        newExternalInterview {
          id
          ...ScheduleInterviewFragment

          operations {
            scheduleSingleCommitInterview {
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
