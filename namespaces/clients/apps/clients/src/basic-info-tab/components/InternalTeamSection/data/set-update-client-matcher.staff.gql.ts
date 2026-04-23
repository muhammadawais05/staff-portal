import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { INTERNAL_TEAM_MATCHER_FRAGMENT } from '@staff-portal/clients'

export default gql`
  mutation SetUpdateClientMatcher($input: UpdateClientMatcherInput!) {
    updateClientMatcher(input: $input) {
      client {
        id
        matchers {
          edges {
            ...InternalTeamMatcherFragment
          }
        }
      }
      ...MutationResultFragment
    }
  }
  ${INTERNAL_TEAM_MATCHER_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
