import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientBusinessType($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        businessType: businessTypeV2
      }
    }
  }
`
