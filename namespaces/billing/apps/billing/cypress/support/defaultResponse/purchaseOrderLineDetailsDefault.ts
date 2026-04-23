/* eslint-disable max-lines */
import fixtures from '@staff-portal/billing/src/_fixtures'
import { times } from 'lodash-es'

const invoice = {
  amount: '7600.0',
  listedAmount: '7600.0',
  actionDueOn: null,
  cleanOutstandingAmount: '0.0',
  description: 'This part was obfuscated, some content was here.',
  longDescription: null,
  consolidatedDocument: null,
  discountApplied: false,
  discountedAmount: '7600.0',
  statusComment: null,
  documentNumber: 420046,
  id: 'VjEtSW52b2ljZS00MjAwNDY',
  invoiceKind: 'COMPANY_BILL',
  unconsolidated: false,
  issueDate: '2020-06-15',
  dueDate: '2020-08-14',
  creditedAmount: '0',
  status: 'PAID',
  paidAmount: '7600.0',
  paidAt: '2020-07-23T17:25:25+03:00',
  processingDate: null,
  partiallyPaid: false,
  hasPendingCharges: false,
  operations: {
    createTransferInvoice: {
      callable: 'DISABLED',
      messages: ['You can only add payment to pending invoices.'],
      __typename: 'Operation'
    },
    __typename: 'InvoiceOperations'
  },
  range: null,
  reason: {
    id: 'VjEtRW5nYWdlbWVudC0xODk3MTY',
    placementFees: {
      totalCount: 0,
      __typename: 'PlacementFeeConnection'
    },
    __typename: 'Engagement'
  },
  webResource: {
    url: 'https://url.com',
    text: 'Invoice #420046',
    __typename: 'Link'
  },
  subjectObject: {
    id: 'VjEtQ2xpZW50LTI0OTc2OQ',
    webResource: {
      url: 'https://url.com',
      text: 'Jacobs, Nikolaus and Leuschke',
      __typename: 'Link'
    },
    preferredBillingOption: null,
    __typename: 'Client'
  },
  originalBillingCycle: {
    endDate: '2020-06-12',
    startDate: '2020-06-01',
    __typename: 'OriginalBillingCycle'
  },
  talent: {
    id: 'VjEtVGFsZW50LTUxMjM4NA',
    webResource: {
      text: 'Hye Stracke',
      url: 'https://url.com',
      __typename: 'Link'
    },
    __typename: 'Talent'
  },
  job: {
    id: 'VjEtSm9iLTE2OTM4Ng',
    webResource: {
      url: 'https://url.com',
      text: 'Supreme Chief Digital Imaging Developer (169386)',
      __typename: 'Link'
    },
    __typename: 'Job'
  },
  __typename: 'Invoice'
}

export default {
  GetPurchaseOrderLineDetailsAttributes: {
    data: {
      node: {
        draftedAmount: '0',
        expiryDate: null,
        id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtOQ',
        invoicedAmount: '170938.8',
        __typename: 'PurchaseOrderLine'
      }
    }
  },
  GetPurchaseOrderLineArchiveState: {
    data: {
      node: {
        id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtOQ',
        archived: false,
        operations: {
          archivePurchaseOrderLine: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          unarchivePurchaseOrderLine: {
            callable: 'HIDDEN',
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'PurchaseOrderLineOperations'
        },
        __typename: 'PurchaseOrderLine'
      }
    }
  },
  GetPurchaseOrderLineDetails: {
    data: {
      node: {
        archived: false,
        client: {
          id: 'VjEtQ2xpZW50LTEwNDk4Mg',
          webResource: {
            url: 'https://url.com',
            text: 'Pacocha, Brekke and Howell',
            __typename: 'Link'
          },
          __typename: 'Client'
        },
        draftedAmount: '0',
        expiryDate: '2022-05-05',
        id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtOQ',
        invoicedAmount: '170938.8',
        operations: {
          archivePurchaseOrderLine: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          unarchivePurchaseOrderLine: {
            callable: 'HIDDEN',
            messages: [],
            __typename: 'Operation'
          },
          updatePurchaseOrderLine: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'PurchaseOrderLineOperations'
        },
        poLineNumber: 'FAKEPO-9-L-9',
        purchaseOrder: {
          id: 'VjEtUHVyY2hhc2VPcmRlci05',
          poNumber: 'FAKEPO-9',
          webResource: {
            url: 'https://url.com',
            text: 'FAKEPO-9',
            __typename: 'Link'
          },
          __typename: 'PurchaseOrder'
        },
        shared: false,
        threshold: '10',
        totalAmount: '100.0',
        webResource: {
          url: 'https://url.com',
          text: 'FAKEPO-9-L-9',
          __typename: 'Link'
        },
        __typename: 'PurchaseOrderLine'
      }
    }
  },
  GetPurchaseOrdersList: {
    data: fixtures.MockGetPurchaseOrdersList
  },
  GetPurchaseOrderLineJobs: {
    data: {
      node: {
        id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMzE3Nw',
        jobs: {
          nodes: [
            {
              id: 'VjEtSm9iLTI1MDIzMQ',
              currentInvestigation: null,
              hiredCount: 1,
              matcherCallScheduled: false,
              talentCount: 1,
              engagements: {
                nodes: [
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNjQ1MDA',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Kunze-Balistreri PO → Lead Marketing Developer (250231)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/264500',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNjM5NjU',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Kunze-Balistreri PO → Lead Marketing Developer (250231)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/263965',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  }
                ],
                totalCount: 2,
                __typename: 'JobEngagementConnection'
              },
              title: 'Lead Marketing Developer (250231)',
              status: 'ACTIVE',
              cumulativeStatus: 'ACTIVE',
              purchaseOrder: {
                id: 'VjEtUHVyY2hhc2VPcmRlci0zMTc3',
                __typename: 'PurchaseOrder'
              },
              purchaseOrderLine: {
                id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMzE3Nw',
                __typename: 'PurchaseOrderLine'
              },
              webResource: {
                text: 'Lead Marketing Developer (250231)',
                url: 'https://staging.toptal.net/platform/staff/jobs/250231',
                __typename: 'Link'
              },
              __typename: 'Job'
            },
            {
              id: 'VjEtSm9iLTI0ODM3MA',
              currentInvestigation: null,
              hiredCount: 4,
              matcherCallScheduled: false,
              talentCount: 4,
              engagements: {
                nodes: [
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNzkxNDc',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/279147',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNzc2MDU',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/277605',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNzcwMDM',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/277003',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNzU2OTA',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/275690',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNzQxODY',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/274186',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNzI5MDE',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/272901',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNzE0NTM',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/271453',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNzEwNjg',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/271068',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNzAzMDU',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/270305',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNzAzMDM',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/270303',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNjc0MjY',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/267426',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNjY5MzU',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/266935',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNjY1OTY',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/266596',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNjY1ODY',
                    purchaseOrder: {
                      id: 'VjEtUHVyY2hhc2VPcmRlci0zMTc1',
                      __typename: 'PurchaseOrder'
                    },
                    purchaseOrderLine: {
                      id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMzE3NQ',
                      __typename: 'PurchaseOrderLine'
                    },
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/266586',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNjUxMDI',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/265102',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNjQ4NTY',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/264856',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNjQ1MDQ',
                    purchaseOrder: {
                      id: 'VjEtUHVyY2hhc2VPcmRlci0zMTc3',
                      __typename: 'PurchaseOrder'
                    },
                    purchaseOrderLine: {
                      id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMzE3Nw',
                      __typename: 'PurchaseOrderLine'
                    },
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/264504',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNjM4NzE',
                    purchaseOrder: {
                      id: 'VjEtUHVyY2hhc2VPcmRlci0zMTc1',
                      __typename: 'PurchaseOrder'
                    },
                    purchaseOrderLine: {
                      id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMzE3NQ',
                      __typename: 'PurchaseOrderLine'
                    },
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/263871',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNjI2NzE',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/262671',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNjIzNzU',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/262375',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNjIxNjM',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/262163',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  },
                  {
                    id: 'VjEtRW5nYWdlbWVudC0yNjE5ODI',
                    purchaseOrder: null,
                    purchaseOrderLine: null,
                    webResource: {
                      text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                      url: 'https://staging.toptal.net/platform/staff/engagements/261982',
                      __typename: 'Link'
                    },
                    __typename: 'Engagement'
                  }
                ],
                totalCount: 22,
                __typename: 'JobEngagementConnection'
              },
              title: 'Lead Marketing Developer (248370)',
              status: 'ACTIVE',
              cumulativeStatus: 'ACTIVE',
              purchaseOrder: null,
              purchaseOrderLine: {
                id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMzE3Nw',
                __typename: 'PurchaseOrderLine'
              },
              webResource: {
                text: 'Lead Marketing Developer (248370)',
                url: 'https://staging.toptal.net/platform/staff/jobs/248370',
                __typename: 'Link'
              },
              __typename: 'Job'
            }
          ],
          __typename: 'PurchaseOrderLineJobConnection'
        },
        engagements: {
          nodes: [
            {
              id: 'VjEtRW5nYWdlbWVudC0yNjQ1MDQ',
              purchaseOrder: {
                id: 'VjEtUHVyY2hhc2VPcmRlci0zMTc3',
                __typename: 'PurchaseOrder'
              },
              purchaseOrderLine: {
                id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMzE3Nw',
                __typename: 'PurchaseOrderLine'
              },
              webResource: {
                text: 'Donnelly-Treutel YF → Lead Marketing Developer (248370)',
                url: 'https://staging.toptal.net/platform/staff/engagements/264504',
                __typename: 'Link'
              },
              job: null,
              __typename: 'Engagement'
            },
            {
              id: 'VjEtRW5nYWdlbWVudC0yNjIxNTg',
              purchaseOrder: null,
              purchaseOrderLine: {
                id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMzE3Nw',
                __typename: 'PurchaseOrderLine'
              },
              webResource: {
                text: 'Kunze-Balistreri PO → Senior Marketing Developer (248444)',
                url: 'https://staging.toptal.net/platform/staff/engagements/262158',
                __typename: 'Link'
              },
              job: {
                id: 'VjEtSm9iLTI0ODQ0NA',
                currentInvestigation: null,
                hiredCount: 1,
                matcherCallScheduled: false,
                talentCount: 1,
                engagements: {
                  nodes: [
                    {
                      id: 'VjEtRW5nYWdlbWVudC0yNjI5NDY',
                      purchaseOrder: null,
                      purchaseOrderLine: null,
                      webResource: {
                        text: 'Kunze-Balistreri PO → Senior Marketing Developer (248444)',
                        url: 'https://staging.toptal.net/platform/staff/engagements/262946',
                        __typename: 'Link'
                      },
                      __typename: 'Engagement'
                    },
                    {
                      id: 'VjEtRW5nYWdlbWVudC0yNjIxNTg',
                      purchaseOrder: null,
                      purchaseOrderLine: {
                        id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMzE3Nw',
                        __typename: 'PurchaseOrderLine'
                      },
                      webResource: {
                        text: 'Kunze-Balistreri PO → Senior Marketing Developer (248444)',
                        url: 'https://staging.toptal.net/platform/staff/engagements/262158',
                        __typename: 'Link'
                      },
                      __typename: 'Engagement'
                    }
                  ],
                  totalCount: 2,
                  __typename: 'JobEngagementConnection'
                },
                title: 'Senior Marketing Developer (248444)',
                status: 'ACTIVE',
                cumulativeStatus: 'ACTIVE',
                purchaseOrder: {
                  id: 'VjEtUHVyY2hhc2VPcmRlci0zMTc3',
                  __typename: 'PurchaseOrder'
                },
                purchaseOrderLine: {
                  id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMzE3Nw',
                  __typename: 'PurchaseOrderLine'
                },
                webResource: {
                  text: 'Senior Marketing Developer (248444)',
                  url: 'https://staging.toptal.net/platform/staff/jobs/248444',
                  __typename: 'Link'
                },
                __typename: 'Job'
              },
              __typename: 'Engagement'
            }
          ],
          __typename: 'PurchaseOrderLineEngagementConnection'
        },
        __typename: 'PurchaseOrderLine'
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
        draftedAmount: '0.0',
        id: 'VjEtUHVyY2hhc2VPcmRlci0yMDAz',
        __typename: 'PurchaseOrderLine'
      }
    }
  },
  GetPurchaseOrderInvoices: {
    data: {
      node: {
        id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMTUyMg',
        invoices: {
          totalCount: 49,
          nodes: times(25, id => ({ ...invoice, id })),
          __typename: 'InvoiceConnection'
        },
        __typename: 'PurchaseOrderLine'
      }
    }
  },
  SetArchivePurchaseOrderLine: {
    data: {
      archivePurchaseOrderLine: {
        purchaseOrderLine: {},
        notice: null,
        success: true,
        errors: [],
        __typename: 'UpdatePurchaseOrderPayload'
      }
    }
  },
  SetUnarchivePurchaseOrderLine: {
    data: {
      unarchivePurchaseOrderLine: {
        purchaseOrderLine: {},
        notice: null,
        success: true,
        errors: [],
        __typename: 'UpdatePurchaseOrderPayload'
      }
    }
  },
  SetUpdatePurchaseOrderLine: {
    data: {
      updatePurchaseOrderLine: {
        purchaseOrderLine: {
          id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtOQ'
        },
        notice: null,
        success: true,
        errors: [],
        __typename: 'UpdatePurchaseOrderPayload'
      }
    }
  }
}
