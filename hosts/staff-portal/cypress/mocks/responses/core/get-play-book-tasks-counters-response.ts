import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getPlayBookTasksCountersResponse = () => ({
  data: {
    viewer: {
      me: {
        id: encodeEntityId('123', 'Staff'),
        __typename: 'Staff'
      },
      playbookTasksCounters: {
        overdue: 123,
        pending: 123,
        today: 0,
        __typename: 'TasksCounters'
      },
      __typename: 'Viewer'
    }
  }
})
