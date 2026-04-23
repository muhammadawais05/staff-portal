import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetPayFrequency($staffId: ID!) {
    node(id: $staffId) {
      ... on Staff {
        id
        paymentsFrequency
      }
    }
  }
`

