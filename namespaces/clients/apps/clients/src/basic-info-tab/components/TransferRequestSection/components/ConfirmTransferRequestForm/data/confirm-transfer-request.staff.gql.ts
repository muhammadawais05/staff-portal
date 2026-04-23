import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation ConfirmClientTransferRoleRequest(
    $input: ConfirmClientTransferRoleRequestInput!
  ) {
    confirmClientTransferRoleRequest(input: $input) {
      clientTransferRoleRequest {
        id
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
