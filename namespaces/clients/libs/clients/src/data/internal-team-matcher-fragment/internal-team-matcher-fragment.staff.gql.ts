import { gql } from '@staff-portal/data-layer-service'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'

export const INTERNAL_TEAM_MATCHER_FRAGMENT = gql`
  fragment InternalTeamMatcherFragment on ClientMatcherEdge {
    node {
      id
      role {
        ...StaffUserFragment
      }
      vertical {
        id
        talentType
      }
    }
    handoff {
      id
      fullName
    }
  }
  ${STAFF_USER_FRAGMENT}
`
