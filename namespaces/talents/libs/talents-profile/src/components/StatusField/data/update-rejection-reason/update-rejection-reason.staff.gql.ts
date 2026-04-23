import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation UpdateSpecializationApplicationRejectionReason(
    $input: UpdateSpecializationApplicationRejectionReasonInput!
  ) {
    updateSpecializationApplicationRejectionReason(input: $input) {
      specializationApplicationRejectionReason {
        id
        reason
        place
        comment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
