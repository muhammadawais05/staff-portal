import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientFullAndLegalName($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        legalName
        fullName
      }
    }
  }
`
