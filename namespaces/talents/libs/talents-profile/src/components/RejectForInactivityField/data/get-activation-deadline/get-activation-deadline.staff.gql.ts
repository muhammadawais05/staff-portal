import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetActivationStepDeadline($activationStepId: ID!) {
    node(id: $activationStepId) {
      ... on ActivationStep {
        id
        deadlineAt
      }
    }
  }
`
