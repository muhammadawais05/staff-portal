import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getClientPurchaseOrdersResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      netTerms: 10,
      availableNetTerms: [0, 10, 15, 20, 30, 45, 60],
      purchaseOrders: {
        nodes: [],
        totalCount: 0,
        __typename: 'PurchaseOrderConnection'
      },
      __typename: 'Client'
    }
  }
})
