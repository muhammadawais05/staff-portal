import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientCurrentEmployeeCount($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        currentEmployeeCount
        employeeCountEstimation
      }
    }
  }
`
