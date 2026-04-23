import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetSearchableRoles {
    searchableRoles(
      filter: { scope: PERMISSION_CHANGERS }
      order: { direction: ASC, field: FULL_NAME }
    ) {
      edges {
        fullName
        legacyUserId
        roleId
      }
    }
  }
`
