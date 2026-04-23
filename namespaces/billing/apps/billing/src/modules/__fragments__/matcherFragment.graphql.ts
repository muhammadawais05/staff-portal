import { gql } from '@apollo/client'

import { staffFragment } from './staffFragment.graphql'

export const matcherFragment = gql`
  fragment MatcherFragment on ClientMatcherConnection {
    nodes {
      id
      role {
        ...StaffFragment
      }
      vertical {
        id
        talentType
      }
    }
  }

  ${staffFragment}
`
