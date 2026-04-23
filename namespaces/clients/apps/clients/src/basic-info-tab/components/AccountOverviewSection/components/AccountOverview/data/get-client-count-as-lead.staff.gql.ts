import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientCountAsLead($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        countAsLead
      }
    }
  }
`
