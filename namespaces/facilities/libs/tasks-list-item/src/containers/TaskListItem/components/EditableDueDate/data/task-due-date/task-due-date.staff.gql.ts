import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetTaskDueDate($taskId: ID!) {
    node(id: $taskId) {
      ... on Task {
        id
        dueDate
      }
    }
  }
`
