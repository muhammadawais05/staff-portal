import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const CLEAR_AND_CHANGE_INTERNAL_INTERVIEW_PROPOSED_TIME_SLOTS = gql`
  mutation ClearAndChangeInternalInterviewProposedTimeSlots(
    $input: ClearAndChangeInternalInterviewProposedTimeSlotsInput!
  ) {
    clearAndChangeInternalInterviewProposedTimeSlots(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
