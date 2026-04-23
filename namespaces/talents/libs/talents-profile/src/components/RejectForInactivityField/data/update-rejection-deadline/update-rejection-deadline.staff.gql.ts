import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation UpdateInactivityRejectionDeadline(
    $input: UpdateInactivityRejectionDeadlineInput!
  ) {
    updateInactivityRejectionDeadline(input: $input) {
      inactivityRejectionDeadline {
        id
        date
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
