import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTaskWatchersResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Task'),
      watchers: {
        nodes: [
          {
            id: encodeEntityId('123', 'Staff'),
            webResource: {
              text: 'Emmie Feil',
              url: 'https://staging.toptal.net/platform/staff/staff/100077',
              __typename: 'Link'
            },
            __typename: 'Staff',
            fullName: 'Emmie Feil'
          }
        ],
        __typename: 'RoleOrClientConnection'
      },
      __typename: 'Task'
    }
  }
})
