import { GET_PLAYBOOK_TASKS_COUNTERS } from './get-play-book-tasks-counters.staff.gql'
import { GetPlayBookTasksCountersQuery } from './get-play-book-tasks-counters.staff.gql.types'

export const createGetPlaybookTasksCountersMock = (userId = '123') => {
  const data: GetPlayBookTasksCountersQuery & {
    viewer: { me: { __typename: string } }
  } = {
    viewer: {
      me: {
        id: userId,
        __typename: 'Staff'
      },
      playbookTasksCounters: {
        overdue: 1,
        pending: 1,
        today: 1,
        __typename: 'TasksCounters'
      },
      __typename: 'Viewer'
    }
  }

  return {
    request: { query: GET_PLAYBOOK_TASKS_COUNTERS },
    result: { data }
  }
}
