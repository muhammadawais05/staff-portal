import { gql } from '@staff-portal/data-layer-service'

import { EVENT_FRAGMENT } from './event-fragment.staff.gql'

export const COMMUNITY_LEADER_EVENTS = gql`
  fragment CommunityEvents on CommunityLeaderAccount {
    communityEvents {
      nodes {
        ...Event
      }
    }
  }
  ${EVENT_FRAGMENT}
`
