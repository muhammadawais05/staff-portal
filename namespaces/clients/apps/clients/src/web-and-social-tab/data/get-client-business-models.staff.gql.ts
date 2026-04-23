import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientBusinessModels($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        businessModels
      }
    }
  }
`
