import { TaskPriorityLevel } from '@staff-portal/graphql/staff'
import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { TASK_FRAGMENT, TASK_METADATA_FRAGMENT } from '@staff-portal/tasks'

import {
  ChangeTaskPriorityDocument,
  ChangeTaskPriorityMutation
} from './change-task-priority.staff.gql.types'

export const CHANGE_TASK_PRIORITY: typeof ChangeTaskPriorityDocument = gql`
  mutation ChangeTaskPriority($taskId: ID!, $priority: TaskPriorityLevel!) {
    changeTaskPriority(input: { taskId: $taskId, priority: $priority }) {
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

export const useChangeTaskPriority = ({
  taskId,
  onCompleted,
  onError
}: {
  taskId: string
  onCompleted?: (data: ChangeTaskPriorityMutation) => void
  onError?: (error: Error) => void
}) => {
  const [changeTaskPriority, mutationResult] = useMutation(
    CHANGE_TASK_PRIORITY,
    {
      onCompleted,
      onError
    }
  )

  return {
    ...mutationResult,
    changeTaskPriority: (priority: TaskPriorityLevel) =>
      changeTaskPriority({
        variables: {
          taskId,
          priority
        }
      })
  }
}
