import { gql } from '@staff-portal/data-layer-service'
import { STATUS_MESSAGE_FRAGMENT } from '@staff-portal/status-messages'

export const GET_TALENT_STATUS_MESSAGES = gql`
  query GetTalentStatusMessages($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        statusMessages {
          nodes {
            ...StatusMessageFragment
          }
        }
      }
    }
  }
  ${STATUS_MESSAGE_FRAGMENT}
`
