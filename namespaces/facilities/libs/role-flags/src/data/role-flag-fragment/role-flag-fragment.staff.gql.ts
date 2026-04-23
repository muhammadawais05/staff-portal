import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const ROLE_FLAG_FRAGMENT = gql`
  fragment RoleFlagFragment on RoleFlag {
    id
    comment
    flaggedBy {
      id
      fullName
    }
    createdAt
    updatedAt
    flag {
      id
      color
      title
    }
    operations {
      removeRoleFlag {
        ...OperationFragment
      }
      updateRoleFlag {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`
