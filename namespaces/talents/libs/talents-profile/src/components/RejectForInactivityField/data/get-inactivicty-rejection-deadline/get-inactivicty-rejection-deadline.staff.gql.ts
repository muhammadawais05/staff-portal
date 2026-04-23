import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetInactivityRejectionDeadline($inactivityRejectionDeadlineId: ID!) {
    node(id: $inactivityRejectionDeadlineId) {
      ... on InactivityRejectionDeadline {
        id
        date
      }
    }
  }
`
