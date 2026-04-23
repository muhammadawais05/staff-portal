import { gql } from '@staff-portal/data-layer-service'
import { INTERNAL_TEAM_MATCHER_FRAGMENT } from '@staff-portal/clients'

export default gql`
  query GetClientMatchers($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        matchers {
          edges {
            ...InternalTeamMatcherFragment
          }
        }
      }
    }
  }
  ${INTERNAL_TEAM_MATCHER_FRAGMENT}
`
