import { gql } from '@staff-portal/data-layer-service'

export const REPRESENTATIVE_OPPORTUNITY_FRAGMENT = gql`
  fragment RepresentativeOpportunity on Opportunity {
    id
    name
    client {
      id
      fullName
    }
    buyer {
      id
    }
    billingContact {
      id
    }
    status
  }
`
