/* eslint-disable max-lines */
import { pick } from 'lodash-es'
import { InvoiceKind } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'

import staffPortalComponentsDefault from './staffPortalComponentsDefault'
import invoiceMutations from './invoiceMutations'
import basePageQueries from './basePageQueries'

export default {
  ...basePageQueries,
  ...staffPortalComponentsDefault,
  ...invoiceMutations,
  // Queries
  GetExperiments: {
    data: {
      experiments: {
        poLines: {
          enabled: false
        }
      }
    }
  },
  GetCommercialDocumentUpdateDueDate: {
    data: {
      node: fixtures.MockInvoice
    }
  },
  GetMemorandum: {
    data: {
      node: fixtures.MockMemorandum
    }
  },
  GetOperations: {
    data: {
      node: fixtures.MockMemorandum
    }
  },
  GetNotification: {
    data: {
      node: {
        __typename: 'Invoice',
        id: fixtures.MockInvoice.id,
        ...fixtures.MockNotifications
      }
    }
  },
  GetNote: {
    data: {
      node: fixtures.MockNotes.notes.nodes[0]
    }
  },
  GetNotes: {
    data: {
      node: {
        ...fixtures.MockNotes,
        id: fixtures.MockInvoice.id,
        __typename: 'Invoice'
      }
    }
  },
  GetInvoiceDetailsTable: {
    data: {
      node: {
        ...fixtures.MockInvoice,
        purchaseOrderLine: {
          id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMTUyMg',
          poLineNumber: 'FAKEPO-1522-L-1522',
          budgetLeft: null,
          client: {
            fullName: 'Jacobs, Nikolaus and Leuschke',
            __typename: 'Client'
          },
          webResource: {
            text: 'FAKEPO-1522-L-1522',
            url: 'https://staging.toptal.net/platform/staff/purchase_orders/1522/lines/1522',
            __typename: 'Link'
          },
          purchaseOrder: {
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNTIy',
            poNumber: 'FAKEPO-1522',
            budgetLeft: null,
            webResource: {
              text: 'FAKEPO-1522',
              url: 'https://staging.toptal.net/platform/staff/purchase_orders/1522',
              __typename: 'Link'
            },
            __typename: 'PurchaseOrder'
          },
          __typename: 'PurchaseOrderLine'
        }
      }
    }
  },
  GetDisputeResolve: {
    data: { node: fixtures.MockInvoice }
  },
  InvoiceNotes: {
    data: {
      nodes: [fixtures.MockStaffInvoiceNotes]
    }
  },
  Invoice: {
    data: {
      nodes: [
        {
          ...fixtures.MockInvoice,
          originalInvoices: {
            __typename: 'InvoiceConnection',
            nodes: [fixtures.MockInvoice]
          }
        }
      ]
    }
  },
  GetInvoiceDetailsHeader: {
    data: {
      node: pick(fixtures.MockInvoice, [
        '__typename',
        'cleanAmountToPay',
        'historyLink',
        'consolidatedInvoice',
        'downloadHtmlUrl',
        'downloadPdfUrl',
        'documentNumber',
        'id',
        'gid',
        'operations',
        'status',
        'webResource'
      ])
    }
  },
  Memorandum: {
    data: {
      nodes: [fixtures.MockMemorandum]
    }
  },
  GetAddMemorandum: {
    data: {
      node: {
        ...fixtures.MockInvoice,
        invoiceKind: InvoiceKind.COMPANY_DEPOSIT
      }
    }
  },
  GetRevertMemorandum: {
    data: {
      node: {
        ...fixtures.MockInvoice,
        invoiceKind: InvoiceKind.COMPANY_DEPOSIT
      }
    }
  },
  Note: {
    data: {
      nodes: [fixtures.MockInvoice.notes.nodes[0]]
    }
  },
  GetCommercialDocumentMemorandums: {
    data: {
      node: {
        __typename: 'Invoice',
        id: fixtures.MockInvoice.id,
        // use same memorandums due to fields missmatch
        // i.e.associatedMemorandums does not include downloadPdfUrl but cypress will complain that is missing
        associatedMemorandums:
          fixtures.MockGetCommercialDocumentMemorandums.node.memorandums,
        memorandums:
          fixtures.MockGetCommercialDocumentMemorandums.node.memorandums
      }
    }
  },
  GetApplyUnallocatedMemorandumsToCommercialDocument: {
    data: {
      node: {
        ...fixtures.MockInvoice,
        operations: {
          ...fixtures.MockInvoice.operations,
          applyUnallocatedMemorandumsToCommercialDocument: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          }
        },
        status: 'OVERDUE',
        subjectObject: {
          ...fixtures.MockInvoice.subjectObject,
          availablePrepaymentBalanceNullable: '1500.0'
        }
      }
    }
  },
  GetConsolidatedInvoices: {
    data: {
      node: {
        __typename: 'Invoice',
        id: fixtures.MockInvoice.id,
        originalInvoices: {
          __typename: 'InvoiceConnection',
          nodes: [
            {
              ...fixtures.MockInvoice,
              // id should not be the same
              id: 'abc'
            }
          ]
        }
      }
    }
  },
  GetPurchaseOrderInvoices: {
    data: {
      node: {
        __typename: 'PurchaseOrder',
        draftedAmount: '0.0',
        id: 'VjEtUHVyY2hhc2VPcmRlci0xNzIy',
        invoices: {
          __typename: 'InvoiceConnection',
          nodes: [fixtures.MockInvoice]
        }
      }
    }
  },
  GetTransfer: {
    data: {
      node: fixtures.MockTransfer
    }
  },
  GetTransfers: {
    data: {
      node: {
        __typename: 'Invoice',
        id: fixtures.MockInvoice.id,
        transfers: fixtures.MockTransfers
      }
    }
  },
  Transfers: {
    data: {
      nodes: [fixtures.MockTransfer]
    }
  },
  // Mutations
  SetApplyUnallocatedMemorandumsToCommercialDocument: {
    data: {
      applyUnallocatedMemorandumsToCommercialDocument: {
        __typename: 'SetApplyUnallocatedMemorandumsToCommercialDocumentPayload',
        errors: [],
        commercialDocument: fixtures.MockInvoice,
        notice: '',
        success: true
      }
    }
  },
  UpdateInvoicePurchaseOrder: {
    data: {
      assignPurchaseOrder: {
        __typename: 'AssignPurchaseOrderPayload',
        errors: [],
        invoice: fixtures.MockInvoice,
        notice: '',
        success: true
      }
    }
  },
  AssignPurchaseOrderLineToInvoice: {
    data: {
      assignPurchaseOrderLine: {
        __typename: 'AssignPurchaseOrderLinePayload',
        errors: [],
        invoice: fixtures.MockInvoice,
        success: true
      }
    }
  },
  CreateTransferInvoice: {
    data: {
      createTransferInvoice: {
        __typename: 'CreateTransferInvoicePayload',
        errors: [],
        invoice: fixtures.MockInvoice,
        notice: '',
        success: true
      }
    }
  },
  RevertCommercialDocumentMemorandum: {
    data: {
      revertCommercialDocumentMemorandum: {
        __typename: 'RevertCommercialDocumentMemorandumPayload',
        revertingMemorandum: {
          id: 'VjEtTWVtb3JhbmR1bS0xODM0MDc',
          __typename: 'Memorandum',
          balance: 'CREDIT',
          amount: '36.48',
          operations: {
            revertCommercialDocumentMemorandum: {
              callable: 'DISABLED',
              messages: ['The memorandum has already been reverted.'],
              __typename: 'Operation'
            },
            __typename: 'MemorandumOperations'
          }
        },
        notice: null,
        success: true,
        errors: []
      }
    }
  },
  RevertRoleMemorandum: {
    data: {
      revertRoleMemorandum: {
        __typename: 'RevertRoleMemorandumPayload',
        commercialDocument: {
          __typename: 'Invoice',
          id: 'VjEtSW52b2ljZS00NDM3MDA',
          memorandums: {
            nodes: [
              {
                id: 'VjEtTWVtb3JhbmR1bS0xODM0MDc',
                __typename: 'Memorandum',
                balance: 'CREDIT',
                amount: '36.48',
                operations: {
                  revertRoleMemorandum: {
                    callable: 'DISABLED',
                    messages: ['The memorandum has already been reverted.'],
                    __typename: 'Operation'
                  },
                  __typename: 'MemorandumOperations'
                }
              }
            ]
          }
        },
        notice: null,
        success: true,
        errors: []
      }
    }
  },
  GetDisputeCommercialDocument: {
    data: {
      node: pick(fixtures.MockInvoice, [
        '__typename',
        'documentNumber',
        'id',
        'pendingTalentPayments'
      ])
    }
  },
  RevertInvoicePrepayments: {
    data: {
      revertInvoicePrepayments: {
        __typename: 'RevertPrepaymentsPayload',
        errors: null,
        notice: null,
        invoice: fixtures.MockInvoice,
        success: true
      }
    }
  },
  // Legacy named mutations
  invoiceAssignPurchaseOrder: {
    data: {
      assignPurchaseOrder: {
        __typename: 'AssignPurchaseOrderPayload',
        errors: [],
        invoice: {
          __typename: 'Invoice',
          actionDueOn: '2019-08-20',
          id: 'VjEtSW52b2ljZS0zODA2MDA'
        },
        success: true
      }
    }
  },
  // Legacy named mutations
  UpdateNote: {
    data: {
      updateNote: {
        __typename: 'UpdateNotePayload',
        errors: [],
        note: fixtures.MockInvoice.notes.nodes[0],
        success: true
      }
    }
  },
  payTransfer: {
    data: {
      payTransfer: {
        __typename: 'PayTransferPayload',
        errors: [],
        invoice: fixtures.MockInvoice,
        success: true
      }
    }
  },
  postponeInvoiceTransfer: {
    data: {
      postponeInvoiceTransfer: {
        __typename: 'PostponeTransferPayload',
        errors: [],
        invoice: fixtures.MockInvoice,
        success: true
      }
    }
  },
  revertCommercialDocumentMemorandum: {
    data: {
      revertCommercialDocumentMemorandum: {
        __typename: 'RevertMemorandumPayload',
        errors: [],
        invoice: fixtures.MockInvoice,
        notice: '',
        success: true
      }
    }
  },
  revertInvoicePrepayments: {
    data: {
      revertInvoicePrepayments: {
        __typename: 'RevertInvoicePrepaymentsPayload',
        errors: [],
        invoice: fixtures.MockInvoice,
        notice: '',
        success: true
      }
    }
  },
  AddDocumentNote: {
    data: {
      addDocumentNote: {
        __typename: 'EditDocumentNotePayload',
        errors: [],
        commercialDocument: fixtures.MockInvoice,
        notice: '',
        success: true
      }
    }
  },
  GetMemorandumCategories: {
    data: {
      memorandumCategories: fixtures.MockMemorandumCategories
    }
  },
  GetPurchaseOrderLinesForInvoice: {
    data: {
      node: {
        id: 'VjEtSW52b2ljZS00MjAwNDY',
        job: {
          purchaseOrderLine: {
            id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMzQ2Ng',
            poLineNumber: 'FAKEPO-1522-L-2',
            __typename: 'PurchaseOrderLine'
          },
          nextPurchaseOrderLine: {
            id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMzQ2OA',
            poLineNumber: 'FAKEPO-1523-L-3',
            __typename: 'PurchaseOrderLine'
          },
          __typename: 'Job'
        },
        purchaseOrder: {
          id: 'VjEtUHVyY2hhc2VPcmRlci0xNTIy',
          __typename: 'PurchaseOrder'
        },
        purchaseOrderLine: {
          id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMTUyMg',
          purchaseOrder: {
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNTIy',
            __typename: 'PurchaseOrder'
          },
          __typename: 'PurchaseOrderLine'
        },
        subjectObject: {
          id: 'VjEtQ2xpZW50LTI0OTc2OQ',
          purchaseOrdersNullable: {
            nodes: [
              {
                id: 'VjEtUHVyY2hhc2VPcmRlci0zMzE1',
                poNumber: 'FAKEPO-3315',
                budgetLeft: '222400.0',
                webResource: {
                  text: 'FAKEPO-3315',
                  url: 'https://staging.toptal.net/platform/staff/purchase_orders/3315',
                  __typename: 'Link'
                },
                purchaseOrderLines: {
                  nodes: [
                    {
                      id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMzMxNQ',
                      poLineNumber: 'FAKEPO-3315-L-3315',
                      budgetLeft: '222400.0',
                      webResource: {
                        text: 'FAKEPO-3315-L-3315',
                        url: 'https://staging.toptal.net/platform/staff/purchase_orders/3315/lines/3315',
                        __typename: 'Link'
                      },
                      __typename: 'PurchaseOrderLine'
                    }
                  ],
                  __typename: 'PurchaseOrderLineConnection'
                },
                __typename: 'PurchaseOrder'
              },
              {
                id: 'VjEtUHVyY2hhc2VPcmRlci0yNDg5',
                poNumber: 'FAKEPO-2489',
                budgetLeft: null,
                webResource: {
                  text: 'FAKEPO-2489',
                  url: 'https://staging.toptal.net/platform/staff/purchase_orders/2489',
                  __typename: 'Link'
                },
                purchaseOrderLines: {
                  nodes: [
                    {
                      id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMjQ4OQ',
                      poLineNumber: 'FAKEPO-2489-L-2489',
                      budgetLeft: null,
                      webResource: {
                        text: 'FAKEPO-2489-L-2489',
                        url: 'https://staging.toptal.net/platform/staff/purchase_orders/2489/lines/2489',
                        __typename: 'Link'
                      },
                      __typename: 'PurchaseOrderLine'
                    }
                  ],
                  __typename: 'PurchaseOrderLineConnection'
                },
                __typename: 'PurchaseOrder'
              },
              {
                id: 'VjEtUHVyY2hhc2VPcmRlci0yMjM5',
                poNumber: 'FAKEPO-2239',
                budgetLeft: null,
                webResource: {
                  text: 'FAKEPO-2239',
                  url: 'https://staging.toptal.net/platform/staff/purchase_orders/2239',
                  __typename: 'Link'
                },
                purchaseOrderLines: {
                  nodes: [
                    {
                      id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMjIzOQ',
                      poLineNumber: 'FAKEPO-2239-L-2239',
                      budgetLeft: null,
                      webResource: {
                        text: 'FAKEPO-2239-L-2239',
                        url: 'https://staging.toptal.net/platform/staff/purchase_orders/2239/lines/2239',
                        __typename: 'Link'
                      },
                      __typename: 'PurchaseOrderLine'
                    }
                  ],
                  __typename: 'PurchaseOrderLineConnection'
                },
                __typename: 'PurchaseOrder'
              },
              {
                id: 'VjEtUHVyY2hhc2VPcmRlci0xNTcw',
                poNumber: 'FAKEPO-1570',
                budgetLeft: null,
                webResource: {
                  text: 'FAKEPO-1570',
                  url: 'https://staging.toptal.net/platform/staff/purchase_orders/1570',
                  __typename: 'Link'
                },
                purchaseOrderLines: {
                  nodes: [
                    {
                      id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMTU3MA',
                      poLineNumber: 'FAKEPO-1570-L-1570',
                      budgetLeft: null,
                      webResource: {
                        text: 'FAKEPO-1570-L-1570',
                        url: 'https://staging.toptal.net/platform/staff/purchase_orders/1570/lines/1570',
                        __typename: 'Link'
                      },
                      __typename: 'PurchaseOrderLine'
                    }
                  ],
                  __typename: 'PurchaseOrderLineConnection'
                },
                __typename: 'PurchaseOrder'
              },
              {
                id: 'VjEtUHVyY2hhc2VPcmRlci0xNTY5',
                poNumber: 'FAKEPO-1569',
                budgetLeft: null,
                webResource: {
                  text: 'FAKEPO-1569',
                  url: 'https://staging.toptal.net/platform/staff/purchase_orders/1569',
                  __typename: 'Link'
                },
                purchaseOrderLines: {
                  nodes: [
                    {
                      id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMTU2OQ',
                      poLineNumber: 'FAKEPO-1569-L-1569',
                      budgetLeft: null,
                      webResource: {
                        text: 'FAKEPO-1569-L-1569',
                        url: 'https://staging.toptal.net/platform/staff/purchase_orders/1569/lines/1569',
                        __typename: 'Link'
                      },
                      __typename: 'PurchaseOrderLine'
                    }
                  ],
                  __typename: 'PurchaseOrderLineConnection'
                },
                __typename: 'PurchaseOrder'
              },
              {
                id: 'VjEtUHVyY2hhc2VPcmRlci0xNTIz',
                poNumber: 'FAKEPO-1523',
                budgetLeft: null,
                webResource: {
                  text: 'FAKEPO-1523',
                  url: 'https://staging.toptal.net/platform/staff/purchase_orders/1523',
                  __typename: 'Link'
                },
                purchaseOrderLines: {
                  nodes: [
                    {
                      id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMTUyMw',
                      poLineNumber: 'FAKEPO-1523-L-1523',
                      budgetLeft: null,
                      webResource: {
                        text: 'FAKEPO-1523-L-1523',
                        url: 'https://staging.toptal.net/platform/staff/purchase_orders/1523/lines/1523',
                        __typename: 'Link'
                      },
                      __typename: 'PurchaseOrderLine'
                    },
                    {
                      id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMzQ2Nw',
                      poLineNumber: 'FAKEPO-1523-L-2',
                      budgetLeft: '3000.0',
                      webResource: {
                        text: 'FAKEPO-1523-L-2',
                        url: 'https://staging.toptal.net/platform/staff/purchase_orders/1523/lines/3467',
                        __typename: 'Link'
                      },
                      __typename: 'PurchaseOrderLine'
                    },
                    {
                      id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMzQ2OA',
                      poLineNumber: 'FAKEPO-1523-L-3',
                      budgetLeft: '150000.0',
                      webResource: {
                        text: 'FAKEPO-1523-L-3',
                        url: 'https://staging.toptal.net/platform/staff/purchase_orders/1523/lines/3468',
                        __typename: 'Link'
                      },
                      __typename: 'PurchaseOrderLine'
                    }
                  ],
                  __typename: 'PurchaseOrderLineConnection'
                },
                __typename: 'PurchaseOrder'
              },
              {
                id: 'VjEtUHVyY2hhc2VPcmRlci0xNTIy',
                poNumber: 'FAKEPO-1522',
                budgetLeft: null,
                webResource: {
                  text: 'FAKEPO-1522',
                  url: 'https://staging.toptal.net/platform/staff/purchase_orders/1522',
                  __typename: 'Link'
                },
                purchaseOrderLines: {
                  nodes: [
                    {
                      id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMTUyMg',
                      poLineNumber: 'FAKEPO-1522-L-1522',
                      budgetLeft: null,
                      webResource: {
                        text: 'FAKEPO-1522-L-1522',
                        url: 'https://staging.toptal.net/platform/staff/purchase_orders/1522/lines/1522',
                        __typename: 'Link'
                      },
                      __typename: 'PurchaseOrderLine'
                    },
                    {
                      id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMzQ2Ng',
                      poLineNumber: 'FAKEPO-1522-Line-2',
                      budgetLeft: '1000.0',
                      webResource: {
                        text: 'FAKEPO-1522-Line-2',
                        url: 'https://staging.toptal.net/platform/staff/purchase_orders/1522/lines/3466',
                        __typename: 'Link'
                      },
                      __typename: 'PurchaseOrderLine'
                    }
                  ],
                  __typename: 'PurchaseOrderLineConnection'
                },
                __typename: 'PurchaseOrder'
              }
            ],
            __typename: 'PurchaseOrderConnection'
          },
          __typename: 'Client'
        },
        __typename: 'Invoice'
      }
    }
  }
}
