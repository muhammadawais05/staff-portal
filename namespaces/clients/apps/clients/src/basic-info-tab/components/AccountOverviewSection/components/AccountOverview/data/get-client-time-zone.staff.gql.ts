import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientTimeZone($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        timeZone {
          name
        }
      }
    }
  }
`
