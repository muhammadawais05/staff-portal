import { gql } from '@staff-portal/data-layer-service'

export const COMMUNITY_LEADER_APPLICATION_FRAGMENT = gql`
  fragment CommunityLeaderApplicationFragment on CommunityLeaderApplication {
    id
    createdAt
    updatedAt
    commitment
    holdComment
    initialIdeas
    slackChannel
    type
    performerComment
    status
  }
`
