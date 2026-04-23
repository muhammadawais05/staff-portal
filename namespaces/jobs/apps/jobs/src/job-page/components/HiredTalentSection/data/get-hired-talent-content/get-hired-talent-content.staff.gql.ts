import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'
import { TALENT_PARTNER_FRAGMENT } from '@staff-portal/talents'
import { ENGAGEMENT_TALENT_DETAILS_FRAGMENT } from '@staff-portal/engagements'

export default gql`
  query GetHiredTalentContent($engagementId: ID!) {
    viewer {
      maxEngagementTrialLength
    }
    node(id: $engagementId) {
      ... on Engagement {
        id
        ...EngagementTalentDetailsFragment
        talent {
          id
          type
          fullName
          resumeUrl
          photo {
            default
          }
          ...TalentPartnerFragment
          ...WebResourceFragment
        }
        weeklyHours
        billingCycles(sort: { order: DESC, target: START_DATE }) {
          nodes {
            ...HiredTalentBillingCycleFragment
          }
        }
        operations {
          changeEngagementTrialLength {
            ...OperationFragment
          }
          updateEngagementExtraHoursEnabled {
            ...OperationFragment
          }
          updateEngagementWeeklyHours {
            ...OperationFragment
          }
          editEngagementCommitment {
            ...OperationFragment
          }
        }
        resumeUrl
      }
    }
  }

  fragment HiredTalentBillingCycleFragment on BillingCycle {
    id
    startDate
    endDate
  }

  ${WEB_RESOURCE_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${ENGAGEMENT_TALENT_DETAILS_FRAGMENT}
  ${TALENT_PARTNER_FRAGMENT}
`
