import { gql, DataProxy } from '@staff-portal/data-layer-service'

import { GetTaskCommentCountQuery } from './get-task-comment-count.staff.gql.types'

export const GET_TASK_COMMENT_COUNT = gql`
  query GetTaskCommentCount($taskId: ID!) {
    node(id: $taskId) {
      ... on Task {
        id
        commentCount
      }
    }
  }
`

export const readTaskCommentCountFromCache = (
  cacheProxy: DataProxy,
  taskId: string
) =>
  cacheProxy.readQuery<GetTaskCommentCountQuery>({
    query: GET_TASK_COMMENT_COUNT,
    variables: { taskId }
  })

export const writeTaskCommentCountToCache = (
  cacheProxy: DataProxy,
  taskId: string,
  data: GetTaskCommentCountQuery
) =>
  cacheProxy.writeQuery({
    query: GET_TASK_COMMENT_COUNT,
    variables: { taskId },
    data
  })
