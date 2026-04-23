import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientAnnualRevenue($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        annualRevenue
        clientopedia {
          revenue
        }
      }
    }
  }
`
