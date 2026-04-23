import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientSecondaryIndustry($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        secondaryIndustry
      }
    }
  }
`
