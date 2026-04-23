import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'
import {
  ENGAGEMENT_TALENT_DETAILS_FRAGMENT,
  ENGAGEMENT_COMMON_ACTIONS_FRAGMENT
} from '@staff-portal/engagements'

export default gql`
  query GetHiredTalent($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        engagements(filter: { state: ASSIGNED_TALENT }) {
          nodes {
            ...HiredTalentEngagementFragment
          }
        }
      }
    }
  }

  fragment HiredTalentEngagementFragment on Engagement {
    id
    tooltipStatus
    engagementEndedFeedbackReason {
      id
      name
    }
    postponedPerformedAction {
      comment
    }
    ...EngagementDetailedStatusFragment
    ...EngagementCommonActionsFragment
    ...WebResourceFragment
    operations {
      sendSemiMonthlyEngagementPaymentsAgreement {
        ...OperationFragment
      }
    }
    talent {
      slackContacts: contacts(filter: { type: COMMUNITY_SLACK }) {
        nodes {
          id
          webResource {
            url
          }
        }
      }
    }
  }

  ${ENGAGEMENT_COMMON_ACTIONS_FRAGMENT}
  ${ENGAGEMENT_TALENT_DETAILS_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
  ${TIME_ZONE_FRAGMENT}
  ${OPERATION_FRAGMENT}
`
