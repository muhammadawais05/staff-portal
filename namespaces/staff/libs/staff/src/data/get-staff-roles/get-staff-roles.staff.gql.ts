import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetStaffRoles($filter: RoleV2Filter!) {
    roles: rolesV2(
      filter: $filter
      order: { field: FULL_NAME, direction: ASC }
    ) {
      nodes {
        id
        fullName
        type
      }
    }
  }
`
