import { gql, useQuery } from '@staff-portal/data-layer-service'
import { ENGAGEMENT_DETAILED_STATUS_FRAGMENT } from '@staff-portal/engagements'

import { GetCandidateCardDocument } from './get-candidate-card.staff.gql.types'

export const GET_CANDIDATE_CARD = gql`
  query GetCandidateCard($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        ...CandidateCardFragment
      }
    }
  }

  fragment CandidateCardFragment on Engagement {
    id
    ...EngagementDetailedStatusFragment
    commitment
    billCycle
    client {
      id
      enterprise
      netTerms
      preferredBillingOption {
        id
        discountable
        billingMethod
      }
    }
    currentCommitment {
      availability
      canBeDiscounted
      adjustedTalentRate {
        availability
        value
      }
      availability
      adjustedRevenueRate {
        availability
        value
      }
      adjustedCompanyRate {
        availability
        value
      }
    }
    discountMultiplier
    operations {
      changeEngagementTrialLength {
        ...OperationFragment
      }
    }
    interview {
      id
      cumulativeStatus
    }
    job {
      id
    }
    webResource {
      url
    }
    talent {
      id
      type
      photo {
        small
      }
      fullName
      resumeUrl
      webResource {
        url
      }
      talentPartner {
        id
        webResource {
          text
          url
        }
      }
    }
  }
  ${ENGAGEMENT_DETAILED_STATUS_FRAGMENT}
`

export const useGetCandidateCard = (engagementId: string) => {
  const { data, ...restOptions } = useQuery(GetCandidateCardDocument, {
    variables: { engagementId },
    throwOnError: true
  })

  return {
    ...restOptions,
    engagement: data?.node
  }
}
