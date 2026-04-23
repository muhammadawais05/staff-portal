import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { TASK_FRAGMENT, TASK_METADATA_FRAGMENT } from '@staff-portal/tasks'

import {
  ChangeTaskRecurringPeriodDocument,
  ChangeTaskRecurringPeriodMutation
} from './change-task-recurring-period.staff.gql.types'

export const CHANGE_TASK_RECURRING_PERIOD: typeof ChangeTaskRecurringPeriodDocument = gql`
  mutation ChangeTaskRecurringPeriod($taskId: ID!, $recurringPeriod: Int!) {
    changeTaskRecurringPeriod(
      input: { taskId: $taskId, recurringPeriod: $recurringPeriod }
    ) {
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

export const useChangeTaskRecurringPeriod = ({
  taskId,
  onCompleted,
  onError
}: {
  taskId: string
  onCompleted?: (data: ChangeTaskRecurringPeriodMutation) => void
  onError?: (error: Error) => void
}) => {
  const [changeTaskRecurringPeriod, mutationResult] = useMutation(
    CHANGE_TASK_RECURRING_PERIOD,
    {
      onCompleted,
      onError,
      ignoreResults: true
    }
  )

  return {
    ...mutationResult,
    changeTaskRecurringPeriod: (recurringPeriod: number) =>
      changeTaskRecurringPeriod({
        variables: {
          taskId,
          recurringPeriod
        }
      })
  }
}
