import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { TASK_FRAGMENT } from '@staff-portal/tasks'

export const FINISH_TASK = gql`
  mutation FinishTask($taskId: ID!) {
    finishTask(input: { taskId: $taskId }) {
      ...MutationResultFragment
      task {
        ...TaskFragment
      }
      __typename
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${TASK_FRAGMENT}
`
