import { gql } from '@staff-portal/data-layer-service'

import { UNRESOLVED_CLIENT_POSSIBLE_DUPLICATES_FRAGMENT } from './unresolved-client-possbile-duplicates-fragment.staff.gql'

export default gql`
  query GetClientPossibleDuplicates($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        ...unresolvedClientPossibleDuplicatesFragment
      }
    }
  }
  ${UNRESOLVED_CLIENT_POSSIBLE_DUPLICATES_FRAGMENT}
`
