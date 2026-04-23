import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'


export const UPDATE_TOP_SHIELD_APPLICATION_INTERVIEW_COMPLETED_DATE = gql`
  mutation UpdateTopShieldApplicationInterviewCompletedDate(
    $input: UpdateTopShieldApplicationInterviewCompletedDateInput!
  ) {
    updateTopShieldApplicationInterviewCompletedDate(input: $input) {
      ...MutationResultFragment
      topShieldApplication {
        id
        interviewCompletedDate
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
