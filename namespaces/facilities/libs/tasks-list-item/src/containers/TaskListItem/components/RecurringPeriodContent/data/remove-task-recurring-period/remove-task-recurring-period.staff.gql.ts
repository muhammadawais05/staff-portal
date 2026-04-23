import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { TASK_FRAGMENT, TASK_METADATA_FRAGMENT } from '@staff-portal/tasks'

import {
  RemoveTaskRecurringPeriodDocument,
  RemoveTaskRecurringPeriodMutation
} from './remove-task-recurring-period.staff.gql.types'

export const REMOVE_TASK_RECURRING_PERIOD: typeof RemoveTaskRecurringPeriodDocument = gql`
  mutation RemoveTaskRecurringPeriod($taskId: ID!) {
    removeTaskRecurringPeriod(input: { taskId: $taskId }) {
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

export const useRemoveTaskRecurringPeriod = ({
  taskId,
  onCompleted,
  onError
}: {
  taskId: string
  onCompleted?: (data: RemoveTaskRecurringPeriodMutation) => void
  onError?: (error: Error) => void
}) => {
  const [removeTaskRecurringPeriod, mutationResult] = useMutation(
    REMOVE_TASK_RECURRING_PERIOD,
    {
      variables: {
        taskId
      },
      onCompleted,
      onError,
      ignoreResults: true
    }
  )

  return {
    ...mutationResult,
    removeTaskRecurringPeriod
  }
}
