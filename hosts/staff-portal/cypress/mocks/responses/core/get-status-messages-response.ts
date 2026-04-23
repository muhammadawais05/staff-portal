import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getStatusMessagesResponse = () => ({
  data: {
    viewer: {
      me: {
        id: encodeEntityId('123', 'Staff'),
        __typename: 'Staff'
      },
      statusMessages: {
        nodes: [],
        __typename: 'StatusMessageConnection'
      },
      __typename: 'Viewer'
    }
  }
})
