import { gql } from '@staff-portal/data-layer-service'

import { ROLE_FRAGMENT } from '../role-fragment'

export const SLACK_WORKSPACE_FRAGMENT = gql`
  fragment SlackWorkspaceFragment on SlackWorkspace {
    ... on SlackWorkspace {
      id
      channelUrl
      participations(filter: { type: { oneOf: FULFILLER } }) {
        nodes {
          id
          participationType
          role {
            ...RoleFragment
          }
        }
      }
    }
  }

  ${ROLE_FRAGMENT}
`
