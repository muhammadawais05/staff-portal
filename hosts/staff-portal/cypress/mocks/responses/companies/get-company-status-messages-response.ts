import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getCompanyStatusMessagesResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      statusMessages: {
        nodes: [],
        __typename: 'StatusMessageConnection'
      },
      __typename: 'Client'
    }
  }
})
