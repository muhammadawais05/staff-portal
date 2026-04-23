import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation ActivateTopscreenPosition($input: ActivateTopscreenPositionInput!) {
    activateTopscreenPosition(input: $input) {
      ...MutationResultFragment
      clientMutationId
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
