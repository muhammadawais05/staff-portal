import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'

export default gql`
  mutation SetSelectClientClaimer($input: SelectClientClaimerInput!) {
    selectClientClaimer(input: $input) {
      client {
        id
        claimer {
          ...StaffUserFragment
        }
        operations {
          requestClientClaimerTransfer {
            ...OperationFragment
          }
        }
      }
      ...MutationResultFragment
    }
  }

  ${OPERATION_FRAGMENT}
  ${STAFF_USER_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
