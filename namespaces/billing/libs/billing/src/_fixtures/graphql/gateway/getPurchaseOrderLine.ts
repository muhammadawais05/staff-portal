import { OperationCallableTypes } from '@staff-portal/graphql/staff'

export default {
  data: {
    node: {
      archived: false,
      client: {
        id: 'VjEtQ2xpZW50LTI0OTc2OQ',
        webResource: {
          text: 'Jacobs, Nikolaus and Leuschke',
          url: 'https://staging.toptal.net/platform/staff/companies/1202102',
          __typename: 'Link'
        },
        __typename: 'Client'
      },
      draftedAmount: '0',
      expiryDate: null,
      id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMQ',
      invoicedAmount: '0',
      operations: {
        archivePurchaseOrderLine: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        unarchivePurchaseOrderLine: {
          callable: OperationCallableTypes.HIDDEN,
          messages: [],
          __typename: 'Operation'
        },
        updatePurchaseOrderLine: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        __typename: 'PurchaseOrderLineOperations'
      },
      poLineNumber: 'Line-1522-1',
      purchaseOrder: {
        id: 'VjEtUHVyY2hhc2VPcmRlci0xNTIy',
        poNumber: 'FAKEPO-1522',
        webResource: {
          text: 'FAKEPO-1522',
          url: 'https://staging.toptal.net/platform/staff/purchase_orders/1522',
          __typename: 'Link'
        },
        __typename: 'PurchaseOrder'
      },
      shared: false,
      threshold: null,
      totalAmount: '3000.0',
      webResource: {
        text: 'Line-1522-1',
        url: 'https://staging.toptal.net/platform/staff/purchase_order_lines/1',
        __typename: 'Link'
      },
      __typename: 'PurchaseOrderLine'
    }
  }
}
