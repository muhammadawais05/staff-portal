import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import { RelatedTasksFilter } from '@staff-portal/graphql/staff'
import { TASK_LIST_GQL_BATCH_KEY } from '@staff-portal/tasks'
import { TASK_LIST_ITEM_FRAGMENT } from '@staff-portal/tasks-list-item'

import { GetRelatedTasksDocument } from './get-related-tasks.staff.gql.types'

export const GET_RELATED_TASKS: typeof GetRelatedTasksDocument = gql`
  query GetRelatedTasks(
    $nodeId: ID!
    $filter: RelatedTasksFilter!
    $loadDisputeOperations: Boolean!
  ) {
    staffNode(id: $nodeId) {
      ... on RelatedTasksHolder {
        ... on Node {
          id
        }

        relatedTasks(filter: $filter, pagination: { offset: 0, limit: 9999 }) {
          completedCount
          nodes {
            ...TaskListItemFragment
          }
        }
      }
    }
  }

  ${TASK_LIST_ITEM_FRAGMENT}
`

export const useGetRelatedTasks = (
  nodeId: string,
  filter: RelatedTasksFilter,
  loadDisputeOperations: boolean
) => {
  const { data, ...restOptions } = useQuery(GET_RELATED_TASKS, {
    variables: { nodeId, filter, loadDisputeOperations },
    context: { [BATCH_KEY]: TASK_LIST_GQL_BATCH_KEY }
  })

  return { ...restOptions, data: data?.staffNode?.relatedTasks }
}
