import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetApprovePaymentData($roleStepId: ID!) {
    node(id: $roleStepId) {
      ... on RoleStep {
        id
        claimer {
          id
          fullName
        }
      }
    }
  }
`
