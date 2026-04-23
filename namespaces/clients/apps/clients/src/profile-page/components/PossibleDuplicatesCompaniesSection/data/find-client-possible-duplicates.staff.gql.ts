import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { UNRESOLVED_CLIENT_POSSIBLE_DUPLICATES_FRAGMENT } from './unresolved-client-possbile-duplicates-fragment.staff.gql'

export default gql`
  mutation FindPossibleClientDuplicates($clientId: ID!) {
    findPossibleClientDuplicates(input: { clientId: $clientId }) {
      ...MutationResultFragment
      client {
        id
        ...unresolvedClientPossibleDuplicatesFragment
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
  ${UNRESOLVED_CLIENT_POSSIBLE_DUPLICATES_FRAGMENT}
`
