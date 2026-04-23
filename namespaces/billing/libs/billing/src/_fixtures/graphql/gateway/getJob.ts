import { OperationCallableTypes } from '@staff-portal/graphql/staff'

export default {
  data: {
    node: {
      id: 'VjEtSm9iLTE2OTM4Ng',
      title: 'Chief Solutions Developer (169386)',
      invoiceNote: 'Some note here',
      attachTimesheetsToInvoices: true,
      autoConsolidationEnabled: true,
      webResource: {
        text: 'Chief Solutions Developer (169386)',
        url: 'https://staging.toptal.net/platform/staff/jobs/169386',
        __typename: 'Link'
      },
      operations: {
        assignPurchaseOrderLine: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        assignPurchaseOrder: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        assignNextPurchaseOrder: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        updateAttachTimesheetsToInvoices: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        editJobInvoiceNote: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        __typename: 'JobOperations'
      },
      client: {
        __typename: 'Client',
        purchaseOrdersNullable: {
          __typename: 'PurchaseOrderConnection',
          nodes: [
            {
              id: 'VjEtUHVyY2hhc2VPcmRlci0yNDg5',
              __typename: 'PurchaseOrder',
              client: {
                fullName: 'Jacobs, Nikolaus and Leuschke',
                __typename: 'Client'
              },
              webResource: {
                text: 'FAKEPO-2489',
                url: 'https://staging.toptal.net/platform/staff/purchase_orders/2489',
                __typename: 'Link'
              },
              purchaseOrderLines: {
                nodes: []
              }
            },
            {
              id: 'VjEtUHVyY2hhc2VPcmRlci0yMjM5',
              __typename: 'PurchaseOrder',
              client: {
                fullName: 'Jacobs, Nikolaus and Leuschke',
                __typename: 'Client'
              },
              webResource: {
                text: 'FAKEPO-2239',
                url: 'https://staging.toptal.net/platform/staff/purchase_orders/2239',
                __typename: 'Link'
              },
              purchaseOrderLines: {
                nodes: []
              }
            },
            {
              id: 'VjEtUHVyY2hhc2VPcmRlci0xNTcw',
              __typename: 'PurchaseOrder',
              client: {
                fullName: 'Jacobs, Nikolaus and Leuschke',
                __typename: 'Client'
              },
              webResource: {
                text: 'FAKEPO-1570',
                url: 'https://staging.toptal.net/platform/staff/purchase_orders/1570',
                __typename: 'Link'
              },
              purchaseOrderLines: {
                nodes: []
              }
            },
            {
              id: 'VjEtUHVyY2hhc2VPcmRlci0xNTY5',
              __typename: 'PurchaseOrder',
              client: {
                fullName: 'Jacobs, Nikolaus and Leuschke',
                __typename: 'Client'
              },
              webResource: {
                text: 'FAKEPO-1569',
                url: 'https://staging.toptal.net/platform/staff/purchase_orders/1569',
                __typename: 'Link'
              },
              purchaseOrderLines: {
                nodes: []
              }
            },
            {
              id: 'VjEtUHVyY2hhc2VPcmRlci0xNTIz',
              __typename: 'PurchaseOrder',
              client: {
                fullName: 'Jacobs, Nikolaus and Leuschke',
                __typename: 'Client'
              },
              webResource: {
                text: 'FAKEPO-0000',
                url: 'https://staging.toptal.net/platform/staff/purchase_orders/0000',
                __typename: 'Link'
              },
              purchaseOrderLines: {
                nodes: [
                  {
                    __typename: 'PurchaseOrderLine',
                    id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMw',
                    poLineNumber: 'FAKE-0000-L-0000',
                    client: {
                      fullName: 'Jacobs, Nikolaus and Leuschke',
                      __typename: 'Client'
                    },
                    webResource: {
                      text: 'FAKE-0000-L-0000',
                      url: 'https://staff-portal.toptal.net/purchase_orders/0000/lines/0000',
                      __typename: 'Link'
                    }
                  }
                ]
              }
            },
            {
              id: 'VjEtUHVyY2hhc2VPcmRlci0xNTIy',
              __typename: 'PurchaseOrder',
              client: {
                fullName: 'Jacobs, Nikolaus and Leuschke',
                __typename: 'Client'
              },
              webResource: {
                text: 'FAKEPO-1523',
                url: 'https://staging.toptal.net/platform/staff/purchase_orders/1523',
                __typename: 'Link'
              },
              purchaseOrderLines: {
                nodes: [
                  {
                    __typename: 'PurchaseOrderLine',
                    id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtNA',
                    poLineNumber: 'FAKE-1523-L-1523',
                    client: {
                      fullName: 'Jacobs, Nikolaus and Leuschke',
                      __typename: 'Client'
                    },
                    webResource: {
                      text: 'FAKE-1523-L-1523',
                      url: 'https://staging.toptal.net/platform/staff/purchase_order_lines/4',
                      __typename: 'Link'
                    }
                  },
                  {
                    __typename: 'PurchaseOrderLine',
                    id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMg',
                    poLineNumber: 'FAKE-1522-L-1522',
                    client: {
                      fullName: 'Jacobs, Nikolaus and Leuschke',
                      __typename: 'Client'
                    },
                    webResource: {
                      text: 'FAKE-1522-L-1522',
                      url: 'https://staging.toptal.net/platform/staff/purchase_order_lines/2',
                      __typename: 'Link'
                    }
                  },
                  {
                    __typename: 'PurchaseOrderLine',
                    id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMQ',
                    poLineNumber: 'FAKE-1521-L-1521',
                    client: {
                      fullName: 'Jacobs, Nikolaus and Leuschke',
                      __typename: 'Client'
                    },
                    webResource: {
                      text: 'FAKE-1521-L-1521',
                      url: 'https://staging.toptal.net/platform/staff/purchase_order_lines/1',
                      __typename: 'Link'
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      purchaseOrderLine: null,
      nextPurchaseOrderLine: null,
      purchaseOrder: {
        id: 'VjEtUHVyY2hhc2VPcmRlci0xNTIy',
        poNumber: 'FAKEPO-0000',
        webResource: {
          text: 'FAKEPO-0000',
          url: 'https://staging.toptal.net/platform/staff/purchase_orders/0000',
          __typename: 'Link'
        },
        __typename: 'PurchaseOrder'
      },
      nextPurchaseOrder: {
        id: 'VjEtUHVyY2hhc2VPcmRlci0yMjM5',
        poNumber: 'NEXT-FAKEPO-0000',
        webResource: {
          text: 'NEXT-FAKEPO-0000',
          url: 'https://staging.toptal.net/platform/staff/purchase_orders/2239',
          __typename: 'Link'
        },
        __typename: 'PurchaseOrder'
      },
      commitment: 'full_time',
      engagements: {
        nodes: [
          {
            id: 'VjEtRW5nYWdlbWVudC0xOTAwMjc',
            talent: {
              fullName: 'Clorinda Lehner',
              __typename: 'Talent'
            },
            __typename: 'Engagement'
          },
          {
            id: 'VjEtRW5nYWdlbWVudC0xODk3MTY',
            talent: {
              fullName: 'Hye Stracke',
              __typename: 'Talent'
            },
            __typename: 'Engagement'
          },
          {
            id: 'VjEtRW5nYWdlbWVudC0xODgzNTE',
            talent: {
              fullName: 'Neal Pfeffer',
              __typename: 'Talent'
            },
            __typename: 'Engagement'
          },
          {
            id: 'VjEtRW5nYWdlbWVudC0xODc0NzI',
            talent: {
              fullName: 'Al Rolfson',
              __typename: 'Talent'
            },
            __typename: 'Engagement'
          },
          {
            id: 'VjEtRW5nYWdlbWVudC0xODcxOTE',
            talent: {
              fullName: 'Tristan Treutel',
              __typename: 'Talent'
            },
            __typename: 'Engagement'
          },
          {
            id: 'VjEtRW5nYWdlbWVudC0xODcwOTk',
            talent: {
              fullName: 'Azzie Schmitt',
              __typename: 'Talent'
            },
            __typename: 'Engagement'
          },
          {
            id: 'VjEtRW5nYWdlbWVudC0xODcwOTg',
            talent: {
              fullName: 'Tom Farrell',
              __typename: 'Talent'
            },
            __typename: 'Engagement'
          },
          {
            id: 'VjEtRW5nYWdlbWVudC0xODY4MzI',
            talent: {
              fullName: 'Julene Pfannerstill',
              __typename: 'Talent'
            },
            __typename: 'Engagement'
          },
          {
            id: 'VjEtRW5nYWdlbWVudC0xODY4MzE',
            talent: {
              fullName: 'Dong Botsford',
              __typename: 'Talent'
            },
            __typename: 'Engagement'
          },
          {
            id: 'VjEtRW5nYWdlbWVudC0xODY4MzA',
            talent: {
              fullName: 'Jalisa Goodwin',
              __typename: 'Talent'
            },
            __typename: 'Engagement'
          }
        ],
        __typename: 'JobEngagementConnection'
      },
      __typename: 'Job'
    }
  }
}
