import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTaskTagsResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Task'),
      tags: {
        nodes: [],
        __typename: 'TaskTagConnection'
      },
      __typename: 'Task'
    }
  }
})
