import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { TASK_FRAGMENT, TASK_METADATA_FRAGMENT } from '@staff-portal/tasks'

export default gql`
  mutation ScheduleTaskNextCheck($input: ScheduleTaskNextCheckInput!) {
    scheduleTaskNextCheck(input: $input) {
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
