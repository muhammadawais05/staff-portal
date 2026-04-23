import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientProjectSalesSpecialist($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        projectSalesSpecialist {
          id
          fullName
        }
      }
    }
  }
`
