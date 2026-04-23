import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export default gql`
  query GetRoleProfilePhoto($roleId: ID!) {
    staffNode(id: $roleId) {
      ... on Role {
        id
        fullName
        photo {
          small
          default
          original
        }
        operations {
          updateRolePhoto {
            ...OperationFragment
          }
        }
      }
    }
  }

  ${OPERATION_FRAGMENT}
`
