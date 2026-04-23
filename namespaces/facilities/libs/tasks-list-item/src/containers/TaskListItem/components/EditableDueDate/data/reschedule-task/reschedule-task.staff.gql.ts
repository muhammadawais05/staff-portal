import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const RESCHEDULE_TASK = gql`
  mutation RescheduleTask($input: RescheduleTaskInput!) {
    rescheduleTask(input: $input) {
      ...MutationResultFragment
      task {
        id
        dueDate
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
