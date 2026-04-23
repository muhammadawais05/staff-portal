import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetRequestClientAccountManagerTransfer(
    $input: RequestClientAccountManagerTransferInput!
  ) {
    requestClientAccountManagerTransfer(input: $input) {
      client {
        id
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
