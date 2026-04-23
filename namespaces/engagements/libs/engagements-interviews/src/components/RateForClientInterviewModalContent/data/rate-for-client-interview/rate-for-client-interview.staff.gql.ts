import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation RateForClientInterview($input: RateForClientInterviewInput!) {
    rateForClientInterview(input: $input) {
      ...MutationResultFragment
      interview {
        id
        rating
        ratingComment
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
