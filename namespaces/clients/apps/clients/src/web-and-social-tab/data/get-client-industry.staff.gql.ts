import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientIndustry($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        industry
      }
    }
  }
`
