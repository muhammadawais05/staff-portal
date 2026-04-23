import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetOpportunityProjectDeliveryManager(
    $input: UpdateOpportunityProjectDeliveryManagerInput!
  ) {
    updateOpportunityProjectDeliveryManager(input: $input) {
      opportunity {
        id
        projectDeliveryManager {
          ...StaffUserFragment
        }
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
