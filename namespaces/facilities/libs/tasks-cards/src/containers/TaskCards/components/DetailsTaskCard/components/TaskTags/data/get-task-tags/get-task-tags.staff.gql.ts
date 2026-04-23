import {
  gql,
  DataProxy,
  useQuery,
  BATCH_KEY
} from '@staff-portal/data-layer-service'
import { TASK_TAG_FRAGMENT } from '@staff-portal/tasks'

import { TASK_DETAILS_BATCH_KEY } from '../../../../config'
import {
  GetTaskTagsDocument,
  GetTaskTagsQuery
} from './get-task-tags.staff.gql.types'

export const GET_TASK_TAGS: typeof GetTaskTagsDocument = gql`
  query GetTaskTags($taskId: ID!) {
    node(id: $taskId) {
      ... on Task {
        id
        tags {
          nodes {
            ...TaskTagFragment
          }
        }
      }
    }
  }

  ${TASK_TAG_FRAGMENT}
`

export const useGetTaskTags = (taskId: string) => {
  const { data, ...restOptions } = useQuery(GET_TASK_TAGS, {
    throwOnError: true,
    variables: { taskId },
    context: { [BATCH_KEY]: TASK_DETAILS_BATCH_KEY }
  })

  return {
    data: data?.node?.tags.nodes,
    ...restOptions
  }
}

export const readTaskTagsFromCache = (cacheProxy: DataProxy, taskId: string) =>
  cacheProxy.readQuery<GetTaskTagsQuery>({
    query: GET_TASK_TAGS,
    variables: { taskId }
  })

export const writeTaskTagsToCache = (
  cacheProxy: DataProxy,
  taskId: string,
  data: GetTaskTagsQuery
) =>
  cacheProxy.writeQuery({
    query: GET_TASK_TAGS,
    variables: { taskId },
    data
  })
