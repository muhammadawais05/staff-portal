import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientFoundingYear($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        foundingYear
      }
    }
  }
`
