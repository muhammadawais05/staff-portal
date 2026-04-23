import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation RestoreClientFromBlackFlag($clientId: ID!, $comment: String!) {
    restoreClientFromBlackFlag(
      input: { clientId: $clientId, comment: $comment }
    ) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
