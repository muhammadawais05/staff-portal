import { gql } from '@staff-portal/data-layer-service'

import { TOP_SHIELD_APPLICATION_QUARTER_FRAGMENT } from '../top-shield-application-quarter-fragment/top-shield-application-quarter-fragment.staff.gql'

export const GET_TOP_SHIELD_QUARTER = gql`
  query GetTopShieldQuarter($quarterId: ID!) {
    node(id: $quarterId) {
      ...TopShieldApplicationQuarterFragment
    }
  }

  ${TOP_SHIELD_APPLICATION_QUARTER_FRAGMENT}
`
