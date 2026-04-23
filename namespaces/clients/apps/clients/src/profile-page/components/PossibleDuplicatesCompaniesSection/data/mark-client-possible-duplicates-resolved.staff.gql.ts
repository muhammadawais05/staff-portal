import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation MarkClientPossibleRoleDuplicatesResolved($clientId: ID!) {
    markClientPossibleRoleDuplicatesResolved(input: { clientId: $clientId }) {
      ...MutationResultFragment
      client {
        id
        unresolvedPossibleDuplicates {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
