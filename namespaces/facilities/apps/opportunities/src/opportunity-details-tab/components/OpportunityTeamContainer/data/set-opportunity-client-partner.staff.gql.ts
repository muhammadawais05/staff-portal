import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetOpportunityClientPartner(
    $input: UpdateOpportunityClientPartnerInput!
  ) {
    updateOpportunityClientPartner(input: $input) {
      opportunity {
        id
        clientPartner {
          ...StaffUserFragment
        }
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
