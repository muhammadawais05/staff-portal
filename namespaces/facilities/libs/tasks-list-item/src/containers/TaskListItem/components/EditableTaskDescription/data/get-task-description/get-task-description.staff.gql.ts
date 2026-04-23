import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetTaskDescription($taskId: ID!) {
    node(id: $taskId) {
      ... on Task {
        id
        description
      }
    }
  }
`
