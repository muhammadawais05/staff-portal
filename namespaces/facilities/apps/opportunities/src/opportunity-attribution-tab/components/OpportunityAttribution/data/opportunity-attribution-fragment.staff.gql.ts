import { gql } from '@staff-portal/data-layer-service'

export const OPPORTUNITY_ATTRIBUTION_FRAGMENT = gql`
  fragment OpportunityAttributionFragment on Opportunity {
    id
    partner
    offering
    source
    event
    marketingCampaign

    operations {
      ...OpportunityAttributionOperationsFragment
    }
  }

  fragment OpportunityAttributionOperationsFragment on OpportunityOperations {
    updateOpportunity {
      ...OperationFragment
    }
  }
`
