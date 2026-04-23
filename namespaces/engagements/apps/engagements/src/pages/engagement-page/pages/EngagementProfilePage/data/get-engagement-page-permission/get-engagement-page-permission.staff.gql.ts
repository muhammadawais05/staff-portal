import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetEngagementProfilePermission {
    viewer {
      permits {
        canViewEngagements
      }
    }
  }
`
