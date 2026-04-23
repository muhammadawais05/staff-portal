import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getClientRevenueRangeResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      revenueRange: null,
      __typename: 'Client'
    }
  }
})
