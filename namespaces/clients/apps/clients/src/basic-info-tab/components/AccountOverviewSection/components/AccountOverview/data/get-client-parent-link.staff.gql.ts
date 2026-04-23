import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetCompanyParentLink($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        parent {
          id
          fullName
        }
      }
    }
  }
`
