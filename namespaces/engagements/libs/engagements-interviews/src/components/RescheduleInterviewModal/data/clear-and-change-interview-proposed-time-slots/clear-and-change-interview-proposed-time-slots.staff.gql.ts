import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const CLEAR_AND_CHANGE_INTERVIEW_PROPOSED_TIME_SLOTS = gql`
  mutation ClearAndChangeInterviewProposedTimeSlots(
    $input: ClearAndChangeInterviewProposedTimeSlotsInput!
  ) {
    clearAndChangeInterviewProposedTimeSlots(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
