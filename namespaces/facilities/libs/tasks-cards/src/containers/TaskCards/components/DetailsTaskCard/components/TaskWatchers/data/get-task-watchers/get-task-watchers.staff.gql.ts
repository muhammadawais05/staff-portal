import {
  gql,
  DataProxy,
  useQuery,
  BATCH_KEY
} from '@staff-portal/data-layer-service'
import { ROLE_OR_CLIENT_FRAGMENT } from '@staff-portal/facilities'

import { TASK_DETAILS_BATCH_KEY } from '../../../../config'
import {
  GetTaskWatchersDocument,
  GetTaskWatchersQuery
} from './get-task-watchers.staff.gql.types'

export const GET_TASK_WATCHERS: typeof GetTaskWatchersDocument = gql`
  query GetTaskWatchers($taskId: ID!) {
    node(id: $taskId) {
      ... on Task {
        id
        watchers {
          nodes {
            ...RoleOrClientFragment
          }
        }
      }
    }
  }

  ${ROLE_OR_CLIENT_FRAGMENT}
`

export const useGetTaskWatchers = (taskId: string) => {
  const { data, ...restOptions } = useQuery(GET_TASK_WATCHERS, {
    throwOnError: true,
    variables: { taskId },
    context: { [BATCH_KEY]: TASK_DETAILS_BATCH_KEY }
  })

  return {
    data: data?.node?.watchers.nodes,
    ...restOptions
  }
}

export const readTaskWatchersFromCache = (
  cacheProxy: DataProxy,
  taskId: string
) =>
  cacheProxy.readQuery<GetTaskWatchersQuery>({
    query: GET_TASK_WATCHERS,
    variables: { taskId }
  })

export const writeTaskWatchersToCache = (
  cacheProxy: DataProxy,
  taskId: string,
  data: GetTaskWatchersQuery
) =>
  cacheProxy.writeQuery({
    query: GET_TASK_WATCHERS,
    variables: { taskId },
    data
  })
