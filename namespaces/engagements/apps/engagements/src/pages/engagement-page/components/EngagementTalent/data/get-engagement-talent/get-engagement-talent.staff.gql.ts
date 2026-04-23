import {
  gql,
  useQuery,
  filterUnauthorizedErrors,
  BATCH_KEY
} from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'
import {
  ENGAGEMENT_TALENT_DETAILS_FRAGMENT,
  ENGAGEMENT_DETAILED_STATUS_FRAGMENT
} from '@staff-portal/engagements'

import { GetEngagementTalentDocument } from './get-engagement-talent.staff.gql.types'

export const GET_ENGAGEMENT_TALENT = gql`
  query GetEngagementTalent($engagementId: ID!) {
    experiments {
      poLines {
        enabled
      }
    }
    node(id: $engagementId) {
      ... on Engagement {
        id
        ...EngagementTalentDetailsFragment
        ...EngagementDetailedStatusFragment
        onboardingPlanUrl
        purchaseOrder {
          ...PurchaseOrderBaseFragment
        }
        purchaseOrderLine {
          id
          poLineNumber
          webResource {
            url
          }
          purchaseOrder {
            ...PurchaseOrderBaseFragment
          }
        }
        talentSentAt
        operations {
          changeEngagementTrialLength {
            ...OperationFragment
          }
          assignEngagementPurchaseOrder {
            ...OperationFragment
          }
          updateEngagementExtraHoursEnabled {
            ...OperationFragment
          }
          editEngagementCommitment {
            ...OperationFragment
          }
        }
        talent {
          ...EngagementTalentFragment
        }
      }
    }
  }

  fragment PurchaseOrderBaseFragment on PurchaseOrder {
    id
    poNumber
    webResource {
      url
    }
  }
  fragment EngagementTalentFragment on Talent {
    id
    type
    fullName
    photo {
      default
    }
    profileLink {
      url
      newTab
    }
    timeZone {
      name
    }
    email
    skype
    additionalSkypeIds(order: { field: RECENCY, direction: DESC }) {
      nodes
    }
    contacts(filter: { type: [PHONE, SKYPE, EMAIL] }) {
      nodes {
        id
        type
        value
      }
    }
    talentPartner {
      id
      fullName
      ...WebResourceFragment
    }
  }

  ${OPERATION_FRAGMENT}
  ${ENGAGEMENT_TALENT_DETAILS_FRAGMENT}
  ${ENGAGEMENT_DETAILED_STATUS_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
`

export const useGetEngagementTalent = (engagementId: string) => {
  const { data, ...restOptions } = useQuery(GetEngagementTalentDocument, {
    variables: { engagementId },
    throwOnError: true,
    errorFilters: [filterUnauthorizedErrors],
    context: { [BATCH_KEY]: 'engagement-above-the-fold-data' }
  })

  return {
    engagement: data?.node,
    experiments: data?.experiments,
    ...restOptions
  }
}
