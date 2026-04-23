import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetUpdateClientLikelihoodToClose(
    $input: UpdateClientLikelihoodToCloseInput!
  ) {
    updateClientLikelihoodToClose(input: $input) {
      client {
        id
        likelihoodToClose
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
