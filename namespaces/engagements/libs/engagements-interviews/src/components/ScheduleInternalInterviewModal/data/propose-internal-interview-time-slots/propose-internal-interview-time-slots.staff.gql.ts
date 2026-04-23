import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const PROPOSE_INTERNAL_INTERVIEW_TIME_SLOTS = gql`
  mutation ProposeInternalInterviewTimeSlots(
    $input: ProposeInternalInterviewTimeSlotsInput!
  ) {
    proposeInternalInterviewTimeSlots(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
