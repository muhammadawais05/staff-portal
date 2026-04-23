import { gql } from '@staff-portal/data-layer-service'
import { TASK_FRAGMENT, TASK_METADATA_FRAGMENT } from '@staff-portal/tasks'
import { TASK_ACTIVITY_SUBJECT_FRAGMENT } from '@staff-portal/tasks-list-item'

export default gql`
  query GetTask($taskId: ID!) {
    node(id: $taskId) {
      ... on Task {
        ...TaskFragment
        ...TaskMetadataFragment
        activity {
          ...TaskActivitySubjectFragment
        }
      }
    }
  }

  ${TASK_FRAGMENT}
  ${TASK_METADATA_FRAGMENT}
  ${TASK_ACTIVITY_SUBJECT_FRAGMENT}
`
