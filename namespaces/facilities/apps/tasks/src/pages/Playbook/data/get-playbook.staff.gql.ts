import {
  filterUnauthorizedErrors,
  gql,
  useGetData
} from '@staff-portal/data-layer-service'

import { GetPlaybookDocument } from './get-playbook.staff.gql.types'
import { PLAYBOOK_FRAGMENT } from './playbook-fragment.staff.gql'

export default gql`
  query GetPlaybook($identifier: String!) {
    playbook(identifier: $identifier) {
      ... on Playbook {
        ...PlaybookFragment
      }
    }
  }

  ${PLAYBOOK_FRAGMENT}
`

export const useGetPlaybook = (identifier: string) =>
  useGetData(GetPlaybookDocument, 'playbook')(
    { identifier },
    {
      throwOnError: true,
      errorFilters: [filterUnauthorizedErrors],
      fetchPolicy: 'cache-first'
    }
  )
