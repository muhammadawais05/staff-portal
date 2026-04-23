import MockClient from './client'

export default {
  __typename: 'PurchaseOrderConnection',
  totalAmount: 10,
  nodes: [
    {
      __typename: 'PurchaseOrder',
      draftedAmount: '0.0',
      archived: false,
      budgetLeft: '100.0',
      budgetSpent: false,
      client: MockClient,
      expiryDate: '2020-02-21',
      id: 'VjEtUHVyY2hhc2VPcmRlci0xNzIy',
      invoicedAmount: '123.23',
      notes: null,
      number: '12345',
      operations: {
        __typename: 'PurchaseOrderOperations',
        archivePurchaseOrder: {
          __typename: 'Operation',
          callable: 'ENABLED',
          messages: []
        },
        createPurchaseOrder: {
          __typename: 'Operation',
          callable: 'ENABLED',
          messages: []
        },
        unarchivePurchaseOrder: {
          __typename: 'Operation',
          callable: 'ENABLED',
          messages: []
        },
        updatePurchaseOrder: {
          __typename: 'Operation',
          callable: 'ENABLED',
          messages: []
        }
      },
      poNumber: 'PO-1722',
      threshold: '100.0',
      totalAmount: '15555.0',
      webResource: {
        __typename: 'Link',
        text: 'Invoice #380600',
        url: 'http://localhost:3000/platform/staff/invoices/380600'
      }
    },
    {
      __typename: 'PurchaseOrder',
      draftedAmount: '0.0',
      budgetLeft: '100.0',
      budgetSpent: false,
      expiryDate: '2020-02-22',
      id: '2VPcmRlci0xNzIyVjEtUHVyY2hhc',
      invoicedAmount: '0',
      poNumber: 'PO-1723',
      threshold: '200.0',
      totalAmount: '25555.0',
      webResource: {
        __typename: 'Link',
        text: 'Invoice #380600',
        url: 'http://localhost:3000/platform/staff/invoices/380600'
      }
    },
    {
      __typename: 'PurchaseOrder',
      draftedAmount: '0.0',
      budgetLeft: '100.0',
      budgetSpent: false,
      expiryDate: '2020-02-23',
      id: 'VyY2hhc2VPcmRlci0xNzIyVjEtUH',
      invoicedAmount: '0',
      poNumber: 'PO-1724',
      threshold: '200.0',
      totalAmount: '35555.0',
      webResource: {
        __typename: 'Link',
        text: 'Invoice #380600',
        url: 'http://localhost:3000/platform/staff/invoices/380600'
      }
    },
    {
      __typename: 'PurchaseOrder',
      draftedAmount: '0.0',
      budgetLeft: '100.0',
      budgetSpent: false,
      expiryDate: '2020-02-24',
      id: 'lci0xNzIyVjEtUHVyY2hhc2VPcmR',
      invoicedAmount: '0',
      poNumber: 'PO-1725',
      threshold: '200.0',
      totalAmount: '45555.0',
      webResource: {
        __typename: 'Link',
        text: 'Invoice #380600',
        url: 'http://localhost:3000/platform/staff/invoices/380600'
      }
    },
    {
      __typename: 'PurchaseOrder',
      draftedAmount: '0.0',
      budgetLeft: '100.0',
      budgetSpent: false,
      expiryDate: '2020-02-25',
      id: 'HVyY2hhc2VPcmRlci0xNzIyVjEtU',
      invoicedAmount: '0',
      poNumber: 'PO-1726',
      threshold: '200.0',
      totalAmount: '55555.0',
      webResource: {
        __typename: 'Link',
        text: 'Invoice #380600',
        url: 'http://localhost:3000/platform/staff/invoices/380600'
      }
    }
  ]
}
