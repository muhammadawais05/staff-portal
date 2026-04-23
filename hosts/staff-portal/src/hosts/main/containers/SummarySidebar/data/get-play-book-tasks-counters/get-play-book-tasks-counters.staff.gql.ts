import { gql, useGetData, BATCH_KEY } from '@staff-portal/data-layer-service'

import { GetPlayBookTasksCountersDocument } from './get-play-book-tasks-counters.staff.gql.types'
import { SUMMARY_SIDEBAR_BATCH_KEY } from '../../config'

export const GET_PLAYBOOK_TASKS_COUNTERS = gql`
  query GetPlayBookTasksCounters {
    viewer {
      me {
        id
      }
      playbookTasksCounters {
        overdue
        pending
        today
        __typename
      }
      __typename
    }
  }
`

export const useGetPlaybookTasksCounters = () => {
  const { data, ...restOptions } = useGetData(
    GetPlayBookTasksCountersDocument,
    'viewer'
  )(undefined, {
    throwOnError: true,
    context: { [BATCH_KEY]: SUMMARY_SIDEBAR_BATCH_KEY }
  })

  return {
    ...restOptions,
    data: data?.playbookTasksCounters
  }
}
