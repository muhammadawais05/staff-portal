import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientLeadSource($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        leadSource
      }
    }
  }
`
