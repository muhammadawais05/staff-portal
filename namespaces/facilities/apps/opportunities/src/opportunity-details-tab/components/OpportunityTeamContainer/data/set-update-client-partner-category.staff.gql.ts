import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetUpdateClientPartnerCategory(
    $input: UpdateClientPartnerCategoryInput!
  ) {
    updateClientPartnerCategory(input: $input) {
      client {
        id
        clientPartnerCategory
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
