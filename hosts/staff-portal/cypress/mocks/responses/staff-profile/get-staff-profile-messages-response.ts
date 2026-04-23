import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getStaffProfileMessagesResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Staff'),
      statusMessages: {
        nodes: [],
        __typename: 'StatusMessageConnection'
      },
      __typename: 'Staff'
    }
  }
})
