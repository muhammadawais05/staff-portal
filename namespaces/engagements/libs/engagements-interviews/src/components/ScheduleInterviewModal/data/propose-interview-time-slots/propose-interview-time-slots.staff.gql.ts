import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const PROPOSE_INTERVIEW_TIME_SLOTS = gql`
  mutation ProposeInterviewTimeSlots($input: ProposeInterviewTimeSlotsInput!) {
    proposeInterviewTimeSlots(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
