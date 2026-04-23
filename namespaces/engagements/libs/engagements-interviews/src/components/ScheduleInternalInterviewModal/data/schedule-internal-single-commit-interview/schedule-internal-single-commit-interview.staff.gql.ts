import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const SCHEDULE_INTERNAL_SINGLE_COMMIT_INTERVIEW = gql`
  mutation ScheduleInternalSingleCommitInterview(
    $input: ScheduleInternalSingleCommitInterviewInput!
  ) {
    scheduleInternalSingleCommitInterview(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
