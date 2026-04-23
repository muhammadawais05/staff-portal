import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation RemoveJobAvailabilityRequestsRestriction(
    $input: RemoveJobAvailabilityRequestsRestrictionInput!
  ) {
    removeJobAvailabilityRequestsRestriction(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
