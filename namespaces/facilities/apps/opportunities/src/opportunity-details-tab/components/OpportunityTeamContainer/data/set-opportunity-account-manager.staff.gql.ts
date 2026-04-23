import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetOpportunityAccountManager(
    $input: UpdateOpportunityAccountManagerInput!
  ) {
    updateOpportunityAccountManager(input: $input) {
      opportunity {
        id
        accountManager {
          ...StaffUserFragment
        }
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
