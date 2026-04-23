import { gql } from '@staff-portal/data-layer-service'

export const COMMUNITY_LEADER_NODE_FRAGMENT = gql`
  fragment CommunityLeaderNodeFragment on CommunityLeader {
    id
    featuredOrder
    createdAt
    requestedAt
    reviewedAt
    leaderStatus
    about
    memos
    type
  }
`
