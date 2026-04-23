import { gql } from '@staff-portal/data-layer-service'

import { COMMUNITY_LEADER_NOTES_FRAGMENT } from './community-leader-notes-fragment.staff.gql'

export const COMMUNITY_LEADER_NODE_WITH_NOTES_FRAGMENT = gql`
  fragment CommunityLeaderNodeWithNotesFragment on CommunityLeader {
    id
    featuredOrder
    createdAt
    requestedAt
    reviewedAt
    leaderStatus
    about
    memos
    type
    ...CommunityLeaderNotesFragment
  }

  ${COMMUNITY_LEADER_NOTES_FRAGMENT}
`
