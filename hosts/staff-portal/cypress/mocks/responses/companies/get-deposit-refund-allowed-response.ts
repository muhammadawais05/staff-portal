import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getDepositRefundAllowed = () => ({
  data: {
    node: {
      __typename: 'Client',
      id: encodeEntityId('123', 'Client'),
      depositRefundAllowed: false
    }
  }
})
