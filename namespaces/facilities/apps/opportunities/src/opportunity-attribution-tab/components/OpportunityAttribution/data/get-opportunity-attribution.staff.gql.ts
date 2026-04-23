import { gql } from '@staff-portal/data-layer-service'

import { OPPORTUNITY_ATTRIBUTION_FRAGMENT } from './opportunity-attribution-fragment.staff.gql'

export default gql`
  query GetOpportunityAttribution($opportunityId: ID!) {
    node(id: $opportunityId) {
      ... on Opportunity {
        ...OpportunityAttributionFragment
      }
    }
  }

  ${OPPORTUNITY_ATTRIBUTION_FRAGMENT}
`
