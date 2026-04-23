import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import { TASK_LIST_GQL_BATCH_KEY } from '@staff-portal/tasks'

import { GetPlaybooksDocument } from './get-playbooks.staff.gql.types'

export const GET_PLAYBOOKS: typeof GetPlaybooksDocument = gql`
  query GetPlaybooks {
    playbooks {
      value: identifier
      label
    }
  }
`

export const useGetPlaybooks = () => {
  const { data, ...restOptions } = useQuery(GET_PLAYBOOKS, {
    context: { [BATCH_KEY]: TASK_LIST_GQL_BATCH_KEY },
    fetchPolicy: 'cache-first'
  })

  return { data: data?.playbooks, ...restOptions }
}
