import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { TASK_FRAGMENT, TASK_METADATA_FRAGMENT } from '@staff-portal/tasks'

import {
  ReassignTaskDocument,
  ReassignTaskMutation
} from './reassign-task.staff.gql.types'

export const REASSIGN_TASK: typeof ReassignTaskDocument = gql`
  mutation ReassignTask($taskId: ID!, $roleId: ID!) {
    reassignTask(input: { taskId: $taskId, roleId: $roleId }) {
      ...MutationResultFragment
      task {
        ...TaskFragment
        ...TaskMetadataFragment
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
  ${TASK_FRAGMENT}
  ${TASK_METADATA_FRAGMENT}
`

export const useReassignTask = ({
  taskId,
  onCompleted,
  onError
}: {
  taskId: string
  onCompleted?: (data: ReassignTaskMutation) => void
  onError?: (error: Error) => void
}) => {
  const [reassignTask, mutationResult] = useMutation(REASSIGN_TASK, {
    onCompleted,
    onError
  })

  return {
    ...mutationResult,
    reassignTask: (roleId: string) =>
      reassignTask({
        variables: {
          taskId,
          roleId
        }
      })
  }
}
