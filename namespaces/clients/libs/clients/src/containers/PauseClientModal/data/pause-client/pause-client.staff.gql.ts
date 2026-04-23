import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation PauseClient($input: PauseClientInput!) {
    pauseClient(input: $input) {
      client {
        id
        cumulativeStatus
        operations {
          pauseClient {
            ...OperationFragment
          }
        }
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${OPERATION_FRAGMENT}
`
