import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const CLEAR_AND_RESCHEDULE_SINGLE_COMMIT_INTERVIEW = gql`
  mutation ClearAndRescheduleSingleCommitInterview(
    $input: ClearAndRescheduleSingleCommitInterviewInput!
  ) {
    clearAndRescheduleSingleCommitInterview(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
