import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const STAFF_OPERATION_RESULT_FRAGMENT = gql`
  fragment StaffOperationResultFragment on Staff {
    id
    cumulativeStatusV2
    updatedAt
    operations {
      deactivateStaff {
        ...OperationFragment
      }
      reactivateStaff {
        ...OperationFragment
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
