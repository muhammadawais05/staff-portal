import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const SCHEDULE_SINGLE_COMMIT_INTERVIEW = gql`
  mutation ScheduleSingleCommitInterview(
    $input: ScheduleSingleCommitInterviewInput!
  ) {
    scheduleSingleCommitInterview(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
