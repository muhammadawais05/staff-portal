import { useMemo } from 'react'
import { gql, useGetData, BATCH } from '@staff-portal/data-layer-service'
import { TASK_LIST_ITEM_FRAGMENT } from '@staff-portal/tasks-list-item'

import {
  GetTasksListQueryVariables,
  GetTasksListDocument
} from './get-tasks-list.staff.gql.types'
import { groupTasks } from '../../../../utils'

export const GET_TASKS_LIST = gql`
  query GetTasksList(
    $filter: TaskFilter!
    $pagination: OffsetPagination!
    $order: TaskOrder
    $loadDisputeOperations: Boolean!
    $loadCounters: Boolean!
  ) {
    tasks(filter: $filter, pagination: $pagination, order: $order) {
      counters @include(if: $loadCounters) {
        ...TaskCountersFragment
      }
      edges {
        node {
          ...TaskListItemFragment
        }
        group {
          ...TaskGroupFragment
        }
      }
      totalCount
    }
  }

  fragment TaskCountersFragment on TaskConnectionCounters {
    total
    pending
    today
    thisWeek
    playbook
  }

  fragment TaskGroupFragment on TaskGroup {
    id
    name
  }

  ${TASK_LIST_ITEM_FRAGMENT}
`

export const useGetTasksList = (
  variables: GetTasksListQueryVariables,
  skip?: boolean
) => {
  const { data, ...restOptions } = useGetData(GetTasksListDocument, 'tasks')(
    variables,
    {
      skip,
      throwOnError: true,
      context: { [BATCH]: false }
    }
  )

  return {
    ...restOptions,
    data: useMemo(
      () =>
        data && {
          counters: data.counters,
          totalCount: data.totalCount,
          taskGroups: groupTasks(data.edges)
        },
      [data]
    )
  }
}
