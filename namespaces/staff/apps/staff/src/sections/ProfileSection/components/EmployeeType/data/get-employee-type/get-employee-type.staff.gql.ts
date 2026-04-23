import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetEmployeeType($staffId: ID!) {
    node(id: $staffId) {
      ... on Staff {
        id
        paymentsEmployeeType
      }
    }
  }
`
