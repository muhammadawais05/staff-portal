import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getDueTasksResponse = () => ({
  data: {
    viewer: {
      me: {
        id: encodeEntityId('123', 'Staff'),
        __typename: 'Staff'
      },
      dueTasks: {
        nodes: [],
        __typename: 'ViewerDueTaskConnection'
      },
      __typename: 'Viewer'
    }
  }
})
