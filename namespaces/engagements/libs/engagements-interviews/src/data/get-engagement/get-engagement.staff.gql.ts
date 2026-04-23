import { gql } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import {
  ENGAGEMENT_OPERATIONS_FRAGMENT,
  ENGAGEMENT_COMMON_ACTIONS_FRAGMENT,
  ENGAGEMENT_COMMON_ACTIONS_OPERATIONS_FRAGMENT
} from '@staff-portal/engagements'

import {
  ENGAGEMENT_RESCHEDULE_FRAGMENT,
  ENGAGEMENT_RESCHEDULE_INTERNAL_FRAGMENT,
  ENGAGEMENT_SCHEDULE_FRAGMENT,
  ENGAGEMENT_SCHEDULE_INTERNAL_FRAGMENT
} from '../fragments'

export const GET_ENGAGEMENT = gql`
  query GetEngagement($engagementId: ID!) {
    node(id: $engagementId) {
      ...EngagementFragment
    }
  }

  fragment EngagementFragment on Engagement {
    id
    interview {
      id
      ...EngagementInterviewOperationsFragment
    }
    operations {
      ...EngagementOperationsFragment
    }
    ...EngagementCommonActionsFragment
    ...EngagementScheduleFragment
    ...EngagementRescheduleFragment
    ...EngagementScheduleInternalFragment
    ...EngagementRescheduleInternalFragment
    resumeUrl
  }

  fragment EngagementInterviewOperationsFragment on Interview {
    id
    operations {
      scheduleSingleCommitInterview {
        ...OperationFragment
      }
      proposeInterviewTimeSlots {
        ...OperationFragment
      }
      updateInterviewGoogleCalendarEvent {
        ...OperationFragment
      }
    }
  }

  ${ENGAGEMENT_OPERATIONS_FRAGMENT}
  ${ENGAGEMENT_COMMON_ACTIONS_FRAGMENT}
  ${ENGAGEMENT_COMMON_ACTIONS_OPERATIONS_FRAGMENT}
  ${ENGAGEMENT_SCHEDULE_FRAGMENT}
  ${ENGAGEMENT_RESCHEDULE_FRAGMENT}
  ${ENGAGEMENT_SCHEDULE_INTERNAL_FRAGMENT}
  ${ENGAGEMENT_RESCHEDULE_INTERNAL_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
  ${OPERATION_FRAGMENT}
`
