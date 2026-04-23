import { gql } from '@staff-portal/data-layer-service'

import { OPPORTUNITY_DETAILS_FRAGMENT } from './opportunity-details-fragment.staff.gql'

export default gql`
  query GetOpportunityDetails($opportunityId: ID!) {
    node(id: $opportunityId) {
      ... on Opportunity {
        ...OpportunityDetailsFragment
      }
    }
  }

  ${OPPORTUNITY_DETAILS_FRAGMENT}
`
