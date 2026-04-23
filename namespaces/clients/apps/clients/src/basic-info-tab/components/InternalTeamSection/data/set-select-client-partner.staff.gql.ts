import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'

export default gql`
  mutation SetSelectClientClientPartner(
    $input: SelectClientClientPartnerInput!
  ) {
    selectClientClientPartner(input: $input) {
      client {
        id
        clientPartner {
          ...StaffUserFragment
        }
      }
      cascadeUpdateInfo {
        clientsToUpdateCount
        opportunitiesToUpdateCount
      }
      ...MutationResultFragment
    }
  }

  ${OPERATION_FRAGMENT}
  ${STAFF_USER_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
