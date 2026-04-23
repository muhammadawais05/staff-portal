import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { STAFF_OPERATION_RESULT_FRAGMENT } from '@staff-portal/staff'

export default gql`
  mutation DeactivateStaff($input: DeactivateStaffInput!) {
    deactivateStaff(input: $input) {
      staff {
        id
        ...StaffOperationResultFragment
      }
      ...MutationResultFragment
    }
  }
  ${STAFF_OPERATION_RESULT_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
