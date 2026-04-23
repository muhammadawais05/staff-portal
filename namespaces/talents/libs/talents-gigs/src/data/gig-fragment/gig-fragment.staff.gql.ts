import { gql } from '@staff-portal/data-layer-service'

import { ROLE_FRAGMENT } from '../role-fragment'
import { SLACK_WORKSPACE_FRAGMENT } from '../slack-workspace-fragment'

export const GIG_FRAGMENT = gql`
  fragment GigFragment on PublicationGig {
    id
    approvedAt
    createdAt
    createdBy {
      id
      role {
        ...RoleFragment
      }
    }
    claimedAt
    claimedBy {
      id
      role {
        ...RoleFragment
      }
    }
    reachOuts: workspaces(filter: { type: { oneOf: PublicationReachOut } }) {
      totalCount
    }
    slackConversations: workspaces(
      filter: { type: { oneOf: SlackWorkspace } }
    ) {
      nodes {
        ...SlackWorkspaceFragment
      }
      totalCount
    }
    description
    matchedAt
    skills
    status
    title
    updatedAt
  }

  ${ROLE_FRAGMENT}
  ${SLACK_WORKSPACE_FRAGMENT}
`
