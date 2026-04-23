import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetStaffAbilities {
    staffAbilities(
      filter: {}
      pagination: { offset: 0, limit: 9999 }
      order: { field: ABILITY, direction: ASC }
    ) {
      totalCount
      nodes {
        id
        name
      }
    }
  }
`
