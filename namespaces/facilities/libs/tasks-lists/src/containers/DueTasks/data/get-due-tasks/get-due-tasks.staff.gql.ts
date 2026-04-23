import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import { TASK_LIST_GQL_BATCH_KEY } from '@staff-portal/tasks'
import { TASK_LIST_ITEM_FRAGMENT } from '@staff-portal/tasks-list-item'

import { GetDueTasksDocument } from './get-due-tasks.staff.gql.types'

export const GET_DUE_TASKS: typeof GetDueTasksDocument = gql`
  query GetDueTasks($loadDisputeOperations: Boolean!) {
    viewer {
      me {
        id
      }
      dueTasks {
        nodes {
          ...TaskListItemFragment
        }
      }
    }
  }

  ${TASK_LIST_ITEM_FRAGMENT}
`

export const useGetDueTasks = (loadDisputeOperations: boolean) => {
  const { data, ...restOptions } = useQuery(GET_DUE_TASKS, {
    variables: { loadDisputeOperations },
    context: { [BATCH_KEY]: TASK_LIST_GQL_BATCH_KEY }
  })

  return { ...restOptions, data: data?.viewer.dueTasks }
}
