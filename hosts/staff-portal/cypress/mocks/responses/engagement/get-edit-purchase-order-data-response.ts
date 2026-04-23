import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getEditPurchaseOrderDataResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Engagement'),
      purchaseOrder: null,
      purchaseOrderLine: null,
      job: {
        id: encodeEntityId('123', 'Job'),
        title: 'Junior Security Developer (220096)',
        purchaseOrder: null,
        __typename: 'Job'
      },
      selectablePurchaseOrders: {
        nodes: [],
        __typename: 'PurchaseOrderConnection'
      },
      __typename: 'Engagement'
    }
  }
})
