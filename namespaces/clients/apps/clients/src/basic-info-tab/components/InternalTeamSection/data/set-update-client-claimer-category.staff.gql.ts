import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetUpdateClientClaimerCategory(
    $input: UpdateClientClaimerCategoryInput!
  ) {
    updateClientClaimerCategory(input: $input) {
      client {
        id
        claimerCategory
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
