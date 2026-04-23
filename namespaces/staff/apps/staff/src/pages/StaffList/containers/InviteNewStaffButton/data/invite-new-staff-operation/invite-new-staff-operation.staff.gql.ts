import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export default gql`
  query InviteNewStaffOperation {
    operations {
      inviteStaff {
        ...OperationFragment
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
