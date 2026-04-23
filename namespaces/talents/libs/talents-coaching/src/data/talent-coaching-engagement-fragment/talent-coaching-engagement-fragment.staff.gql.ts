import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

import { TALENT_FOR_COACHING_ENGAGEMENT_FRAGMENT } from '../../data/talent-for-coaching-engagement-fragment/talent-fragment.staff.gql'

export const TALENT_COACHING_ENGAGEMENT_FRAGMENT = gql`
  fragment TalentCoachingEngagementFragment on TalentCoachingEngagement {
    id
    claimedAt
    createdAt
    updatedAt
    campaignSlug
    status
    states {
      nodes {
        id
        color
        label
      }
    }
    coach {
      id
      fullName
      ...WebResourceFragment
    }
    operations {
      addCoachActionsNote {
        ...OperationFragment
      }
      addGeneralNote {
        ...OperationFragment
      }
      assignCoach {
        ...OperationFragment
      }
      changeStatus {
        ...OperationFragment
      }
    }
    talent {
      ...TalentForCoachingEngagementFragment
    }
    applicationStatus {
      id
      cancelledInterviewCount
      confirmedAvailabilityRequestCount
      rejectedInterviewCount
      statusRetentionDays
      successfulInterviewCount
      totalAvailabilityRequestCount
      totalEngagementCount
      totalInterviewCount
      totalJobApplicationCount
    }
  }

  ${OPERATION_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
  ${TALENT_FOR_COACHING_ENGAGEMENT_FRAGMENT}
`
