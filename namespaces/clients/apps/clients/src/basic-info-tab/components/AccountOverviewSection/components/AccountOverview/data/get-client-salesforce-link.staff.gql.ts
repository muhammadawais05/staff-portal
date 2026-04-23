import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientSalesforceLink($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        salesforceLink {
          text
          url
        }
      }
    }
  }
`
