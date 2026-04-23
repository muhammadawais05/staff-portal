import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation LeaveFeedback($input: LeaveFeedbackClientInput!) {
    leaveFeedbackClient(input: $input) {
      ...MutationResultFragment
      client {
        id
        operations {
          leaveFeedbackClient {
            ...OperationFragment
          }
        }
      }
    }
  }
  ${OPERATION_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
