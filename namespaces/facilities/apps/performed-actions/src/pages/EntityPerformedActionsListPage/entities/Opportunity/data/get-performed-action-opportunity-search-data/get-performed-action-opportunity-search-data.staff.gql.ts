import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetPerformedActionOpportunitySearchData($entityId: ID!) {
    node(id: $entityId) {
      ... on Opportunity {
        id
        type
      }
    }
  }
`
