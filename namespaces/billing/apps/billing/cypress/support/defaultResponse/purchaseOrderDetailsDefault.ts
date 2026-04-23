/* eslint-disable max-lines */
import fixtures from '@staff-portal/billing/src/_fixtures'

import staffPortalComponentsDefault from './staffPortalComponentsDefault'
import basePageQueries from './basePageQueries'

const GetPurchaseOrderDetails = {
  data: {
    node: {
      client: {
        id: 'VjEtQ2xpZW50LTI0NDM4OA',
        webResource: {
          text: "Abbott, O'Reilly and Watsica",
          url: 'https: //staging.toptal.net/platform/staff/companies/1179599',
          __typename: 'Link'
        },
        __typename: 'Client'
      },
      draftedAmount: '0.0',
      expiryDate: null,
      id: 'VjEtUHVyY2hhc2VPcmRlci0yMDAz',
      invoicedAmount: '13200.0',
      budgetLeft: null,
      budgetSpent: false,
      archived: false,
      operations: {
        archivePurchaseOrder: {
          callable: 'ENABLED',
          messages: [],
          __typename: 'Operation'
        },
        createPurchaseOrder: {
          callable: 'ENABLED',
          messages: [],
          __typename: 'Operation'
        },
        unarchivePurchaseOrder: {
          callable: 'HIDDEN',
          messages: [],
          __typename: 'Operation'
        },
        updatePurchaseOrder: {
          callable: 'ENABLED',
          messages: [],
          __typename: 'Operation'
        },
        __typename: 'PurchaseOrderOperations'
      },
      poNumber: 'US-4885',
      shared: false,
      threshold: '74.0',
      totalAmount: '114400.0',
      webResource: {
        text: 'US-4885',
        url: 'https://staging.toptal.net/platform/staff/purchase_orders/2003',
        __typename: 'Link'
      },
      __typename: 'PurchaseOrder'
    }
  }
}

export default {
  ...basePageQueries,
  ...staffPortalComponentsDefault,
  // Queries
  GetPurchaseOrderArchiveState: {
    data: {
      node: {
        id: 'VjEtUHVyY2hhc2VPcmRlci0yMDAz',
        archived: false,
        draftedAmount: '0.0',
        operations: {
          archivePurchaseOrder: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          },
          unarchivePurchaseOrder: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          },
          __typename: 'PurchaseOrderOperations'
        },
        __typename: 'PurchaseOrder'
      }
    }
  },
  GetPurchaseOrderDetails: GetPurchaseOrderDetails,
  GetJobList: {
    data: {
      nodes: [
        {
          draftedAmount: '0.0',
          id: 'VjEtUHVyY2hhc2VPcmRlci0yMDAz',
          jobs: {
            nodes: [
              {
                id: 'VjEtSm9iLTIwNzM2Nw',
                engagements: {
                  nodes: [
                    {
                      id: 'VjEtRW5nYWdlbWVudC0yMjA3NDU',
                      purchaseOrder: {
                        id: 'VjEtUHVyY2hhc2VPcmRlci0xOTMy',
                        __typename: 'PurchaseOrder'
                      },
                      webResource: {
                        text: 'Senior Solutions Developer (207367) → Venice Jast',
                        url: 'http://localhost:3000/platform/staff/engagements/220745',
                        __typename: 'Link'
                      },
                      __typename: 'Engagement'
                    },
                    {
                      id: 'VjEtRW5nYWdlbWVudC0yMjA3NDQ',
                      purchaseOrder: null,
                      webResource: {
                        text: 'Senior Solutions Developer (207367) → Tuan Bogisich',
                        url: 'http://localhost:3000/platform/staff/engagements/220744',
                        __typename: 'Link'
                      },
                      __typename: 'Engagement'
                    }
                  ],
                  totalCount: 2,
                  __typename: 'JobEngagementConnection'
                },
                title: 'Senior Solutions Developer (207367)',
                status: 'ACTIVE',
                cumulativeStatus: 'ACTIVE',
                hiredCount: 1,
                matcherCallScheduled: false,
                talentCount: 0,
                currentInvestigation: null,
                purchaseOrder: {
                  id: 'VjEtUHVyY2hhc2VPcmRlci0xOTMy',
                  __typename: 'PurchaseOrder'
                },
                nextPurchaseOrder: null,
                webResource: {
                  text: 'Senior Solutions Developer (207367)',
                  url: 'http://localhost:3000/platform/staff/jobs/207367',
                  __typename: 'Link'
                },
                __typename: 'Job'
              }
            ],
            __typename: 'PurchaseOrderJobConnection'
          },
          engagements: {
            nodes: [
              {
                id: 'VjEtRW5nYWdlbWVudC0yNDQ3ODE',
                purchaseOrder: {
                  id: 'VjEtUHVyY2hhc2VPcmRlci0xOTMy',
                  __typename: 'PurchaseOrder'
                },
                webResource: {
                  text: 'Senior Research Developer (231756) → Claudette Armstrong',
                  url: 'http://localhost:3000/platform/staff/engagements/244781',
                  __typename: 'Link'
                },
                job: {
                  id: 'VjEtSm9iLTIzMTc1Ng',
                  currentInvestigation: null,
                  hiredCount: 0,
                  matcherCallScheduled: false,
                  talentCount: 1,
                  engagements: {
                    nodes: [
                      {
                        id: 'VjEtRW5nYWdlbWVudC0yNDQ3ODE',
                        purchaseOrder: {
                          id: 'VjEtUHVyY2hhc2VPcmRlci0xOTMy',
                          __typename: 'PurchaseOrder'
                        },
                        webResource: {
                          text: 'Senior Research Developer (231756) → Claudette Armstrong',
                          url: 'http://localhost:3000/platform/staff/engagements/244781',
                          __typename: 'Link'
                        },
                        __typename: 'Engagement'
                      }
                    ],
                    totalCount: 1,
                    __typename: 'JobEngagementConnection'
                  },
                  title: 'Senior Research Developer (231756)',
                  status: 'PENDING_ENGINEER',
                  cumulativeStatus: 'PENDING_ENGINEER',
                  purchaseOrder: null,
                  webResource: {
                    text: 'Senior Research Developer (231756)',
                    url: 'http://localhost:3000/platform/staff/jobs/231756',
                    __typename: 'Link'
                  },
                  __typename: 'Job'
                },
                __typename: 'Engagement'
              },
              {
                id: 'VjEtRW5nYWdlbWVudC0yMjA3NDU',
                purchaseOrder: {
                  id: 'VjEtUHVyY2hhc2VPcmRlci0xOTMy',
                  __typename: 'PurchaseOrder'
                },
                webResource: {
                  text: 'Senior Solutions Developer (207367) → Venice Jast',
                  url: 'http://localhost:3000/platform/staff/engagements/220745',
                  __typename: 'Link'
                },
                job: {
                  id: 'VjEtSm9iLTIwNzM2Nw',
                  currentInvestigation: null,
                  hiredCount: 1,
                  matcherCallScheduled: false,
                  talentCount: 1,
                  engagements: {
                    nodes: [
                      {
                        id: 'VjEtRW5nYWdlbWVudC0yMjA3NDU',
                        purchaseOrder: {
                          id: 'VjEtUHVyY2hhc2VPcmRlci0xOTMy',
                          __typename: 'PurchaseOrder'
                        },
                        webResource: {
                          text: 'Senior Solutions Developer (207367) → Venice Jast',
                          url: 'http://localhost:3000/platform/staff/engagements/220745',
                          __typename: 'Link'
                        },
                        __typename: 'Engagement'
                      },
                      {
                        id: 'VjEtRW5nYWdlbWVudC0yMjA3NDQ',
                        purchaseOrder: null,
                        webResource: {
                          text: 'Senior Solutions Developer (207367) → Tuan Bogisich',
                          url: 'http://localhost:3000/platform/staff/engagements/220744',
                          __typename: 'Link'
                        },
                        __typename: 'Engagement'
                      }
                    ],
                    totalCount: 2,
                    __typename: 'JobEngagementConnection'
                  },
                  title: 'Senior Solutions Developer (207367)',
                  status: 'ACTIVE',
                  cumulativeStatus: 'ACTIVE',
                  purchaseOrder: {
                    id: 'VjEtUHVyY2hhc2VPcmRlci0xOTMy',
                    __typename: 'PurchaseOrder'
                  },
                  webResource: {
                    text: 'Senior Solutions Developer (207367)',
                    url: 'http://localhost:3000/platform/staff/jobs/207367',
                    __typename: 'Link'
                  },
                  __typename: 'Job'
                },
                __typename: 'Engagement'
              }
            ],
            __typename: 'PurchaseOrderEngagementConnection'
          },
          __typename: 'PurchaseOrder'
        }
      ]
    }
  },
  GetPurchaseOrderInvoices: {
    data: {
      node: {
        draftedAmount: '0.0',
        id: 'VjEtUHVyY2hhc2VPcmRlci0yMDAz',
        invoices: {
          totalCount: 445,
          nodes: [
            {
              amount: '4400.0',
              listedAmount: '4400.0',
              hasPendingCharges: false,
              actionDueOn: null,
              cleanOutstandingAmount: '4400.0',
              description:
                'Full-time services from Adam Chwedyk for React Engineer from November 21, 2020 to November 28, 2020.',
              longDescription: null,
              consolidatedDocument: {
                id: 'VjEtSW52b2ljZS00NzI1Mzg',
                __typename: 'Invoice'
              },
              discountApplied: false,
              discountedAmount: '4400.0',
              statusComment: null,
              documentNumber: 470328,
              id: 'VjEtSW52b2ljZS00NzAzMjg',
              invoiceKind: 'COMPANY_BILL',
              unconsolidated: false,
              issueDate: '2020-11-29',
              dueDate: '2020-12-29',
              creditedAmount: '0',
              status: 'OUTSTANDING',
              paidAmount: '0',
              paidAt: null,
              processingDate: null,
              partiallyPaid: false,
              operations: {
                createTransferInvoice: {
                  callable: 'DISABLED',
                  messages: [
                    'You cannot add payment to the original invoice (pay consolidated invoice instead).'
                  ],
                  __typename: 'Operation'
                },
                __typename: 'InvoiceOperations'
              },
              range: null,
              reason: {
                id: 'VjEtRW5nYWdlbWVudC0yMzc2MDU',
                placementFees: {
                  totalCount: 0,
                  __typename: 'PlacementFeeConnection'
                },
                __typename: 'Engagement'
              },
              webResource: {
                text: 'Invoice #470328',
                url: 'https://staging.toptal.net/platform/staff/invoices/470328',
                __typename: 'Link'
              },
              subjectObject: {
                id: 'VjEtQ2xpZW50LTI0NDM4OA',
                webResource: {
                  text: "Abbott, O'Reilly and Watsica",
                  url: 'https://staging.toptal.net/platform/staff/companies/1179599',
                  __typename: 'Link'
                },
                preferredBillingOption: null,
                __typename: 'Client'
              },
              originalBillingCycle: {
                endDate: '2020-11-28',
                startDate: '2020-11-21',
                __typename: 'OriginalBillingCycle'
              },
              talent: {
                id: 'VjEtVGFsZW50LTIwODE3MDQ',
                webResource: {
                  text: 'Louetta Emmerich',
                  url: 'https://staging.toptal.net/platform/staff/talents/2081704',
                  __typename: 'Link'
                },
                __typename: 'Talent'
              },
              job: {
                id: 'VjEtSm9iLTIyMzk0NA',
                webResource: {
                  text: 'Chief Research Developer (223944)',
                  url: 'https://staging.toptal.net/platform/staff/jobs/223944',
                  __typename: 'Link'
                },
                __typename: 'Job'
              },
              __typename: 'Invoice'
            },
            {
              amount: '8800.0',
              listedAmount: '8800.0',
              hasPendingCharges: false,
              actionDueOn: null,
              cleanOutstandingAmount: '8800.0',
              description:
                'Full-time trial period from Adam Chwedyk for React Engineer from November 9, 2020 to November 20, 2020.',
              longDescription: null,
              consolidatedDocument: {
                id: 'VjEtSW52b2ljZS00NzI1Mzg',
                __typename: 'Invoice'
              },
              discountApplied: false,
              discountedAmount: '8800.0',
              statusComment: null,
              documentNumber: 468101,
              id: 'VjEtSW52b2ljZS00NjgxMDE',
              invoiceKind: 'COMPANY_BILL',
              unconsolidated: false,
              issueDate: '2020-11-21',
              dueDate: '2020-12-21',
              creditedAmount: '0',
              status: 'OUTSTANDING',
              paidAmount: '0',
              paidAt: null,
              processingDate: null,
              partiallyPaid: false,
              operations: {
                createTransferInvoice: {
                  callable: 'DISABLED',
                  messages: [
                    'You cannot add payment to the original invoice (pay consolidated invoice instead).'
                  ],
                  __typename: 'Operation'
                },
                __typename: 'InvoiceOperations'
              },
              range: null,
              reason: {
                id: 'VjEtRW5nYWdlbWVudC0yMzc2MDU',
                placementFees: {
                  totalCount: 0,
                  __typename: 'PlacementFeeConnection'
                },
                __typename: 'Engagement'
              },
              webResource: {
                text: 'Invoice #468101',
                url: 'https://staging.toptal.net/platform/staff/invoices/468101',
                __typename: 'Link'
              },
              subjectObject: {
                id: 'VjEtQ2xpZW50LTI0NDM4OA',
                webResource: {
                  text: "Abbott, O'Reilly and Watsica",
                  url: 'https://staging.toptal.net/platform/staff/companies/1179599',
                  __typename: 'Link'
                },
                preferredBillingOption: null,
                __typename: 'Client'
              },
              originalBillingCycle: {
                endDate: '2020-11-20',
                startDate: '2020-11-09',
                __typename: 'OriginalBillingCycle'
              },
              talent: {
                id: 'VjEtVGFsZW50LTIwODE3MDQ',
                webResource: {
                  text: 'Louetta Emmerich',
                  url: 'https://staging.toptal.net/platform/staff/talents/2081704',
                  __typename: 'Link'
                },
                __typename: 'Talent'
              },
              job: {
                id: 'VjEtSm9iLTIyMzk0NA',
                webResource: {
                  text: 'Chief Research Developer (223944)',
                  url: 'https://staging.toptal.net/platform/staff/jobs/223944',
                  __typename: 'Link'
                },
                __typename: 'Job'
              },
              __typename: 'Invoice'
            },
            {
              amount: '3936.0',
              listedAmount: '3936.0',
              actionDueOn: null,
              cleanOutstandingAmount: '3936.0',
              description:
                'Full-time services from Israel Illan for [Enterprise] Android engineer + some AR/VR experience Job from December 28, 2020 to December 31, 2020.',
              longDescription: null,
              consolidatedDocument: {
                id: 'VjEtSW52b2ljZS00ODI2NjE',
                __typename: 'Invoice'
              },
              discountApplied: false,
              discountedAmount: '3936.0',
              statusComment: null,
              documentNumber: 482147,
              id: 'VjEtSW52b2ljZS00ODIxNDc',
              invoiceKind: 'COMPANY_BILL',
              unconsolidated: false,
              issueDate: '2021-01-01',
              dueDate: '2021-01-31',
              creditedAmount: '0',
              status: 'PAID',
              paidAmount: '3936.0',
              paidAt: '2021-02-07T01:11:18+03:00',
              processingDate: null,
              partiallyPaid: false,
              hasPendingCharges: false,
              operations: {
                createTransferInvoice: {
                  callable: 'DISABLED',
                  messages: [
                    'You cannot add payment to the original invoice (pay consolidated invoice instead).'
                  ],
                  __typename: 'Operation'
                },
                __typename: 'InvoiceOperations'
              },
              range: null,
              reason: {
                id: 'VjEtRW5nYWdlbWVudC0yNDM2MDc',
                placementFees: {
                  totalCount: 0,
                  __typename: 'PlacementFeeConnection'
                },
                __typename: 'Engagement'
              },
              webResource: {
                text: 'Invoice #482147',
                url: 'https://staging.toptal.net/platform/staff/invoices/482147',
                __typename: 'Link'
              },
              subjectObject: {
                id: 'VjEtQ2xpZW50LTI2MTc0Ng',
                webResource: {
                  text: 'Wintheiser-Gulgowski YK',
                  url: 'https://staging.toptal.net/platform/staff/companies/1250006',
                  __typename: 'Link'
                },
                preferredBillingOption: null,
                __typename: 'Client'
              },
              originalBillingCycle: {
                endDate: '2020-12-31',
                startDate: '2020-12-28',
                __typename: 'OriginalBillingCycle'
              },
              talent: {
                id: 'VjEtVGFsZW50LTEzNTc3MTY',
                webResource: {
                  text: 'Allegra Stiedemann',
                  url: 'https://staging.toptal.net/platform/staff/talents/1357716',
                  __typename: 'Link'
                },
                __typename: 'Talent'
              },
              job: {
                id: 'VjEtSm9iLTIzMDQ3NQ',
                webResource: {
                  text: 'Junior Program Developer (230475)',
                  url: 'https://staging.toptal.net/platform/staff/jobs/230475',
                  __typename: 'Link'
                },
                __typename: 'Job'
              },
              __typename: 'Invoice'
            },
            {
              amount: '4536.0',
              listedAmount: '4536.0',
              actionDueOn: null,
              cleanOutstandingAmount: '4536.0',
              description:
                'Full-time services from Viktor Kyriazakos for Android engineers with OpenGL experience from December 28, 2020 to December 31, 2020.',
              longDescription: null,
              consolidatedDocument: {
                id: 'VjEtSW52b2ljZS00ODI2NjE',
                __typename: 'Invoice'
              },
              discountApplied: false,
              discountedAmount: '4536.0',
              statusComment: null,
              documentNumber: 482146,
              id: 'VjEtSW52b2ljZS00ODIxNDY',
              invoiceKind: 'COMPANY_BILL',
              unconsolidated: false,
              issueDate: '2021-01-01',
              dueDate: '2021-01-31',
              creditedAmount: '0',
              status: 'PAID',
              paidAmount: '4536.0',
              paidAt: '2021-02-07T01:11:18+03:00',
              processingDate: null,
              partiallyPaid: false,
              hasPendingCharges: false,
              operations: {
                createTransferInvoice: {
                  callable: 'DISABLED',
                  messages: [
                    'You cannot add payment to the original invoice (pay consolidated invoice instead).'
                  ],
                  __typename: 'Operation'
                },
                __typename: 'InvoiceOperations'
              },
              range: null,
              reason: {
                id: 'VjEtRW5nYWdlbWVudC0yNDM2MDU',
                placementFees: {
                  totalCount: 0,
                  __typename: 'PlacementFeeConnection'
                },
                __typename: 'Engagement'
              },
              webResource: {
                text: 'Invoice #482146',
                url: 'https://staging.toptal.net/platform/staff/invoices/482146',
                __typename: 'Link'
              },
              subjectObject: {
                id: 'VjEtQ2xpZW50LTI2MTc0Ng',
                webResource: {
                  text: 'Wintheiser-Gulgowski YK',
                  url: 'https://staging.toptal.net/platform/staff/companies/1250006',
                  __typename: 'Link'
                },
                preferredBillingOption: null,
                __typename: 'Client'
              },
              originalBillingCycle: {
                endDate: '2020-12-31',
                startDate: '2020-12-28',
                __typename: 'OriginalBillingCycle'
              },
              talent: {
                id: 'VjEtVGFsZW50LTEzODkzMTA',
                webResource: {
                  text: 'Malisa Cole',
                  url: 'https://staging.toptal.net/platform/staff/talents/1389310',
                  __typename: 'Link'
                },
                __typename: 'Talent'
              },
              job: {
                id: 'VjEtSm9iLTIzMDQ3MQ',
                webResource: {
                  text: 'Junior Marketing Developer (230471)',
                  url: 'https://staging.toptal.net/platform/staff/jobs/230471',
                  __typename: 'Link'
                },
                __typename: 'Job'
              },
              __typename: 'Invoice'
            },
            {
              amount: '4800.0',
              listedAmount: '4800.0',
              actionDueOn: null,
              cleanOutstandingAmount: '4800.0',
              description:
                'Full-time services from Sean McCall for [Enterprise] React Native Developer from December 28, 2020 to December 31, 2020.',
              longDescription: null,
              consolidatedDocument: {
                id: 'VjEtSW52b2ljZS00ODI2NjE',
                __typename: 'Invoice'
              },
              discountApplied: false,
              discountedAmount: '4800.0',
              statusComment: null,
              documentNumber: 482145,
              id: 'VjEtSW52b2ljZS00ODIxNDU',
              invoiceKind: 'COMPANY_BILL',
              unconsolidated: false,
              issueDate: '2021-01-01',
              dueDate: '2021-01-31',
              creditedAmount: '0',
              status: 'PAID',
              paidAmount: '4800.0',
              paidAt: '2021-02-07T01:11:18+03:00',
              processingDate: null,
              partiallyPaid: false,
              hasPendingCharges: false,
              operations: {
                createTransferInvoice: {
                  callable: 'DISABLED',
                  messages: [
                    'You cannot add payment to the original invoice (pay consolidated invoice instead).'
                  ],
                  __typename: 'Operation'
                },
                __typename: 'InvoiceOperations'
              },
              range: null,
              reason: {
                id: 'VjEtRW5nYWdlbWVudC0yNDM2MDY',
                placementFees: {
                  totalCount: 0,
                  __typename: 'PlacementFeeConnection'
                },
                __typename: 'Engagement'
              },
              webResource: {
                text: 'Invoice #482145',
                url: 'https://staging.toptal.net/platform/staff/invoices/482145',
                __typename: 'Link'
              },
              subjectObject: {
                id: 'VjEtQ2xpZW50LTI2MTc0Ng',
                webResource: {
                  text: 'Wintheiser-Gulgowski YK',
                  url: 'https://staging.toptal.net/platform/staff/companies/1250006',
                  __typename: 'Link'
                },
                preferredBillingOption: null,
                __typename: 'Client'
              },
              originalBillingCycle: {
                endDate: '2020-12-31',
                startDate: '2020-12-28',
                __typename: 'OriginalBillingCycle'
              },
              talent: {
                id: 'VjEtVGFsZW50LTE0NDE1OTI',
                webResource: {
                  text: 'Kortney Boehm',
                  url: 'https://staging.toptal.net/platform/staff/talents/1441592',
                  __typename: 'Link'
                },
                __typename: 'Talent'
              },
              job: {
                id: 'VjEtSm9iLTIzMDQ3Mw',
                webResource: {
                  text: 'Chief Solutions Developer (230473)',
                  url: 'https://staging.toptal.net/platform/staff/jobs/230473',
                  __typename: 'Link'
                },
                __typename: 'Job'
              },
              __typename: 'Invoice'
            },
            {
              amount: '6840.0',
              listedAmount: '6840.0',
              actionDueOn: null,
              cleanOutstandingAmount: '6840.0',
              description:
                'Full-time services from Imre Chroncsik for [Enterprise] Experienced iOS/Swift engineer from December 21, 2020 to December 31, 2020.',
              longDescription: null,
              consolidatedDocument: {
                id: 'VjEtSW52b2ljZS00ODI2NjE',
                __typename: 'Invoice'
              },
              discountApplied: false,
              discountedAmount: '6840.0',
              statusComment: null,
              documentNumber: 482144,
              id: 'VjEtSW52b2ljZS00ODIxNDQ',
              invoiceKind: 'COMPANY_BILL',
              unconsolidated: false,
              issueDate: '2021-01-01',
              dueDate: '2021-01-31',
              creditedAmount: '0',
              status: 'PAID',
              paidAmount: '6840.0',
              paidAt: '2021-02-07T01:11:18+03:00',
              processingDate: null,
              partiallyPaid: false,
              hasPendingCharges: false,
              operations: {
                createTransferInvoice: {
                  callable: 'DISABLED',
                  messages: [
                    'You cannot add payment to the original invoice (pay consolidated invoice instead).'
                  ],
                  __typename: 'Operation'
                },
                __typename: 'InvoiceOperations'
              },
              range: null,
              reason: {
                id: 'VjEtRW5nYWdlbWVudC0yNDMzNDM',
                placementFees: {
                  totalCount: 1,
                  __typename: 'PlacementFeeConnection'
                },
                __typename: 'Engagement'
              },
              webResource: {
                text: 'Invoice #482144',
                url: 'https://staging.toptal.net/platform/staff/invoices/482144',
                __typename: 'Link'
              },
              subjectObject: {
                id: 'VjEtQ2xpZW50LTI2MTc0Ng',
                webResource: {
                  text: 'Wintheiser-Gulgowski YK',
                  url: 'https://staging.toptal.net/platform/staff/companies/1250006',
                  __typename: 'Link'
                },
                preferredBillingOption: null,
                __typename: 'Client'
              },
              originalBillingCycle: {
                endDate: '2020-12-31',
                startDate: '2020-12-21',
                __typename: 'OriginalBillingCycle'
              },
              talent: {
                id: 'VjEtVGFsZW50LTEyNzA1Ng',
                webResource: {
                  text: 'Lucile Lowe',
                  url: 'https://staging.toptal.net/platform/staff/talents/127056',
                  __typename: 'Link'
                },
                __typename: 'Talent'
              },
              job: {
                id: 'VjEtSm9iLTIzMDIzOQ',
                webResource: {
                  text: 'Lead Research Developer (230239)',
                  url: 'https://staging.toptal.net/platform/staff/jobs/230239',
                  __typename: 'Link'
                },
                __typename: 'Job'
              },
              __typename: 'Invoice'
            },
            {
              amount: '3520.0',
              listedAmount: '3520.0',
              actionDueOn: null,
              cleanOutstandingAmount: '3520.0',
              description:
                'Full-time services from Arthur Brongniart for Senior JavaScript Graphics Engineer (AR & 3D Experience) - Mobile Web from December 24, 2020 to December 31, 2020. This does not include 2 days of break.',
              longDescription: null,
              consolidatedDocument: {
                id: 'VjEtSW52b2ljZS00ODI2NjE',
                __typename: 'Invoice'
              },
              discountApplied: false,
              discountedAmount: '3520.0',
              statusComment: null,
              documentNumber: 482142,
              id: 'VjEtSW52b2ljZS00ODIxNDI',
              invoiceKind: 'COMPANY_BILL',
              unconsolidated: false,
              issueDate: '2021-01-01',
              dueDate: '2021-01-31',
              creditedAmount: '0',
              status: 'PAID',
              paidAmount: '3520.0',
              paidAt: '2021-02-07T01:11:18+03:00',
              processingDate: null,
              partiallyPaid: false,
              hasPendingCharges: false,
              operations: {
                createTransferInvoice: {
                  callable: 'DISABLED',
                  messages: [
                    'You cannot add payment to the original invoice (pay consolidated invoice instead).'
                  ],
                  __typename: 'Operation'
                },
                __typename: 'InvoiceOperations'
              },
              range: null,
              reason: {
                id: 'VjEtRW5nYWdlbWVudC0yNDMzNTI',
                placementFees: {
                  totalCount: 0,
                  __typename: 'PlacementFeeConnection'
                },
                __typename: 'Engagement'
              },
              webResource: {
                text: 'Invoice #482142',
                url: 'https://staging.toptal.net/platform/staff/invoices/482142',
                __typename: 'Link'
              },
              subjectObject: {
                id: 'VjEtQ2xpZW50LTI2MTc0Ng',
                webResource: {
                  text: 'Wintheiser-Gulgowski YK',
                  url: 'https://staging.toptal.net/platform/staff/companies/1250006',
                  __typename: 'Link'
                },
                preferredBillingOption: null,
                __typename: 'Client'
              },
              originalBillingCycle: {
                endDate: '2020-12-31',
                startDate: '2020-12-24',
                __typename: 'OriginalBillingCycle'
              },
              talent: {
                id: 'VjEtVGFsZW50LTc1MDgxMQ',
                webResource: {
                  text: 'Tamatha Wuckert',
                  url: 'https://staging.toptal.net/platform/staff/talents/750811',
                  __typename: 'Link'
                },
                __typename: 'Talent'
              },
              job: {
                id: 'VjEtSm9iLTIzMDI1Mg',
                webResource: {
                  text: 'Senior Marketing Developer (230252)',
                  url: 'https://staging.toptal.net/platform/staff/jobs/230252',
                  __typename: 'Link'
                },
                __typename: 'Job'
              },
              __typename: 'Invoice'
            },
            {
              amount: '7560.0',
              listedAmount: '7560.0',
              actionDueOn: null,
              cleanOutstandingAmount: '7560.0',
              description:
                'Full-time services from Alex Kyriazakos for Frontend Engineer from December 21, 2020 to December 31, 2020.',
              longDescription: null,
              consolidatedDocument: {
                id: 'VjEtSW52b2ljZS00ODI2NjE',
                __typename: 'Invoice'
              },
              discountApplied: false,
              discountedAmount: '7560.0',
              statusComment: null,
              documentNumber: 482141,
              id: 'VjEtSW52b2ljZS00ODIxNDE',
              invoiceKind: 'COMPANY_BILL',
              unconsolidated: false,
              issueDate: '2021-01-01',
              dueDate: '2021-01-31',
              creditedAmount: '0',
              status: 'PAID',
              paidAmount: '7560.0',
              paidAt: '2021-02-07T01:11:18+03:00',
              processingDate: null,
              partiallyPaid: false,
              hasPendingCharges: false,
              operations: {
                createTransferInvoice: {
                  callable: 'DISABLED',
                  messages: [
                    'You cannot add payment to the original invoice (pay consolidated invoice instead).'
                  ],
                  __typename: 'Operation'
                },
                __typename: 'InvoiceOperations'
              },
              range: null,
              reason: {
                id: 'VjEtRW5nYWdlbWVudC0yNDMzNDk',
                placementFees: {
                  totalCount: 0,
                  __typename: 'PlacementFeeConnection'
                },
                __typename: 'Engagement'
              },
              webResource: {
                text: 'Invoice #482141',
                url: 'https://staging.toptal.net/platform/staff/invoices/482141',
                __typename: 'Link'
              },
              subjectObject: {
                id: 'VjEtQ2xpZW50LTI2MTc0Ng',
                webResource: {
                  text: 'Wintheiser-Gulgowski YK',
                  url: 'https://staging.toptal.net/platform/staff/companies/1250006',
                  __typename: 'Link'
                },
                preferredBillingOption: null,
                __typename: 'Client'
              },
              originalBillingCycle: {
                endDate: '2020-12-31',
                startDate: '2020-12-21',
                __typename: 'OriginalBillingCycle'
              },
              talent: {
                id: 'VjEtVGFsZW50LTE2MDM3Nzc',
                webResource: {
                  text: 'Madison Heidenreich',
                  url: 'https://staging.toptal.net/platform/staff/talents/1603777',
                  __typename: 'Link'
                },
                __typename: 'Talent'
              },
              job: {
                id: 'VjEtSm9iLTIzMDI0NA',
                webResource: {
                  text: 'Junior Security Developer (230244)',
                  url: 'https://staging.toptal.net/platform/staff/jobs/230244',
                  __typename: 'Link'
                },
                __typename: 'Job'
              },
              __typename: 'Invoice'
            },
            {
              amount: '10080.0',
              listedAmount: '10080.0',
              actionDueOn: null,
              cleanOutstandingAmount: '10080.0',
              description:
                'Full-time services from Matthew Ortega for UI/UX Designer for AR from December 16, 2020 to December 31, 2020.',
              longDescription: null,
              consolidatedDocument: {
                id: 'VjEtSW52b2ljZS00ODI2NjE',
                __typename: 'Invoice'
              },
              discountApplied: false,
              discountedAmount: '10080.0',
              statusComment: null,
              documentNumber: 482140,
              id: 'VjEtSW52b2ljZS00ODIxNDA',
              invoiceKind: 'COMPANY_BILL',
              unconsolidated: false,
              issueDate: '2021-01-01',
              dueDate: '2021-01-31',
              creditedAmount: '0',
              status: 'PAID',
              paidAmount: '10080.0',
              paidAt: '2021-02-07T01:11:18+03:00',
              processingDate: null,
              partiallyPaid: false,
              hasPendingCharges: false,
              operations: {
                createTransferInvoice: {
                  callable: 'DISABLED',
                  messages: [
                    'You cannot add payment to the original invoice (pay consolidated invoice instead).'
                  ],
                  __typename: 'Operation'
                },
                __typename: 'InvoiceOperations'
              },
              range: null,
              reason: {
                id: 'VjEtRW5nYWdlbWVudC0yMzgxMTU',
                placementFees: {
                  totalCount: 0,
                  __typename: 'PlacementFeeConnection'
                },
                __typename: 'Engagement'
              },
              webResource: {
                text: 'Invoice #482140',
                url: 'https://staging.toptal.net/platform/staff/invoices/482140',
                __typename: 'Link'
              },
              subjectObject: {
                id: 'VjEtQ2xpZW50LTI2MTc0Ng',
                webResource: {
                  text: 'Wintheiser-Gulgowski YK',
                  url: 'https://staging.toptal.net/platform/staff/companies/1250006',
                  __typename: 'Link'
                },
                preferredBillingOption: null,
                __typename: 'Client'
              },
              originalBillingCycle: {
                endDate: '2020-12-31',
                startDate: '2020-12-16',
                __typename: 'OriginalBillingCycle'
              },
              talent: {
                id: 'VjEtVGFsZW50LTYzNzA4MA',
                webResource: {
                  text: 'Jospeh Ryan',
                  url: 'https://staging.toptal.net/platform/staff/talents/637080',
                  __typename: 'Link'
                },
                __typename: 'Talent'
              },
              job: {
                id: 'VjEtSm9iLTIyNDc4Mg',
                webResource: {
                  text: 'Lead Web Designer (224782)',
                  url: 'https://staging.toptal.net/platform/staff/jobs/224782',
                  __typename: 'Link'
                },
                __typename: 'Job'
              },
              __typename: 'Invoice'
            },
            {
              amount: '7840.0',
              listedAmount: '7840.0',
              actionDueOn: null,
              cleanOutstandingAmount: '7840.0',
              description:
                'Full-time services from Fabian Rückert for Android engineer with OpenGL experience from December 16, 2020 to December 31, 2020. This does not include 1 week of break.',
              longDescription: null,
              consolidatedDocument: {
                id: 'VjEtSW52b2ljZS00ODI2NjE',
                __typename: 'Invoice'
              },
              discountApplied: false,
              discountedAmount: '7840.0',
              statusComment: null,
              documentNumber: 482139,
              id: 'VjEtSW52b2ljZS00ODIxMzk',
              invoiceKind: 'COMPANY_BILL',
              unconsolidated: false,
              issueDate: '2021-01-01',
              dueDate: '2021-01-31',
              creditedAmount: '0',
              status: 'PAID',
              paidAmount: '7840.0',
              paidAt: '2021-02-07T01:11:18+03:00',
              processingDate: null,
              partiallyPaid: false,
              hasPendingCharges: false,
              operations: {
                createTransferInvoice: {
                  callable: 'DISABLED',
                  messages: [
                    'You cannot add payment to the original invoice (pay consolidated invoice instead).'
                  ],
                  __typename: 'Operation'
                },
                __typename: 'InvoiceOperations'
              },
              range: null,
              reason: {
                id: 'VjEtRW5nYWdlbWVudC0yMzgwMDY',
                placementFees: {
                  totalCount: 0,
                  __typename: 'PlacementFeeConnection'
                },
                __typename: 'Engagement'
              },
              webResource: {
                text: 'Invoice #482139',
                url: 'https://staging.toptal.net/platform/staff/invoices/482139',
                __typename: 'Link'
              },
              subjectObject: {
                id: 'VjEtQ2xpZW50LTI2MTc0Ng',
                webResource: {
                  text: 'Wintheiser-Gulgowski YK',
                  url: 'https://staging.toptal.net/platform/staff/companies/1250006',
                  __typename: 'Link'
                },
                preferredBillingOption: null,
                __typename: 'Client'
              },
              originalBillingCycle: {
                endDate: '2020-12-31',
                startDate: '2020-12-16',
                __typename: 'OriginalBillingCycle'
              },
              talent: {
                id: 'VjEtVGFsZW50LTEzMjI4MDM',
                webResource: {
                  text: 'Kathline Boyle',
                  url: 'https://staging.toptal.net/platform/staff/talents/1322803',
                  __typename: 'Link'
                },
                __typename: 'Talent'
              },
              job: {
                id: 'VjEtSm9iLTIyNDcyMg',
                webResource: {
                  text: 'Chief Marketing Developer (224722)',
                  url: 'https://staging.toptal.net/platform/staff/jobs/224722',
                  __typename: 'Link'
                },
                __typename: 'Job'
              },
              __typename: 'Invoice'
            },
            {
              amount: '9600.0',
              listedAmount: '9600.0',
              actionDueOn: null,
              cleanOutstandingAmount: '9600.0',
              description:
                'Full-time services from Alexey Pelykh for Android engineer with ARCore experience from December 16, 2020 to December 31, 2020.',
              longDescription: null,
              consolidatedDocument: {
                id: 'VjEtSW52b2ljZS00ODI2NjE',
                __typename: 'Invoice'
              },
              discountApplied: false,
              discountedAmount: '9600.0',
              statusComment: null,
              documentNumber: 482138,
              id: 'VjEtSW52b2ljZS00ODIxMzg',
              invoiceKind: 'COMPANY_BILL',
              unconsolidated: false,
              issueDate: '2021-01-01',
              dueDate: '2021-01-31',
              creditedAmount: '0',
              status: 'PAID',
              paidAmount: '9600.0',
              paidAt: '2021-02-07T01:11:18+03:00',
              processingDate: null,
              partiallyPaid: false,
              hasPendingCharges: false,
              operations: {
                createTransferInvoice: {
                  callable: 'DISABLED',
                  messages: [
                    'You cannot add payment to the original invoice (pay consolidated invoice instead).'
                  ],
                  __typename: 'Operation'
                },
                __typename: 'InvoiceOperations'
              },
              range: null,
              reason: {
                id: 'VjEtRW5nYWdlbWVudC0yMzgwMDU',
                placementFees: {
                  totalCount: 0,
                  __typename: 'PlacementFeeConnection'
                },
                __typename: 'Engagement'
              },
              webResource: {
                text: 'Invoice #482138',
                url: 'https://staging.toptal.net/platform/staff/invoices/482138',
                __typename: 'Link'
              },
              subjectObject: {
                id: 'VjEtQ2xpZW50LTI2MTc0Ng',
                webResource: {
                  text: 'Wintheiser-Gulgowski YK',
                  url: 'https://staging.toptal.net/platform/staff/companies/1250006',
                  __typename: 'Link'
                },
                preferredBillingOption: null,
                __typename: 'Client'
              },
              originalBillingCycle: {
                endDate: '2020-12-31',
                startDate: '2020-12-16',
                __typename: 'OriginalBillingCycle'
              },
              talent: {
                id: 'VjEtVGFsZW50LTEyMjc5OQ',
                webResource: {
                  text: 'Vena Block',
                  url: 'https://staging.toptal.net/platform/staff/talents/122799',
                  __typename: 'Link'
                },
                __typename: 'Talent'
              },
              job: {
                id: 'VjEtSm9iLTIyNDcxOQ',
                webResource: {
                  text: 'Lead Security Developer (224719)',
                  url: 'https://staging.toptal.net/platform/staff/jobs/224719',
                  __typename: 'Link'
                },
                __typename: 'Job'
              },
              __typename: 'Invoice'
            },
            {
              amount: '2640.0',
              listedAmount: '2640.0',
              actionDueOn: null,
              cleanOutstandingAmount: '2640.0',
              description:
                'Full-time services from Dennis Ippel for iOS/Swift engineer with ARKit experience from December 16, 2020 to December 31, 2020. This does not include 9 days of break.',
              longDescription: null,
              consolidatedDocument: {
                id: 'VjEtSW52b2ljZS00ODI2NjE',
                __typename: 'Invoice'
              },
              discountApplied: false,
              discountedAmount: '2640.0',
              statusComment: null,
              documentNumber: 482137,
              id: 'VjEtSW52b2ljZS00ODIxMzc',
              invoiceKind: 'COMPANY_BILL',
              unconsolidated: false,
              issueDate: '2021-01-01',
              dueDate: '2021-01-31',
              creditedAmount: '0',
              status: 'PAID',
              paidAmount: '2640.0',
              paidAt: '2021-02-07T01:11:18+03:00',
              processingDate: null,
              partiallyPaid: false,
              hasPendingCharges: false,
              operations: {
                createTransferInvoice: {
                  callable: 'DISABLED',
                  messages: [
                    'You cannot add payment to the original invoice (pay consolidated invoice instead).'
                  ],
                  __typename: 'Operation'
                },
                __typename: 'InvoiceOperations'
              },
              range: null,
              reason: {
                id: 'VjEtRW5nYWdlbWVudC0yMzgwMDQ',
                placementFees: {
                  totalCount: 0,
                  __typename: 'PlacementFeeConnection'
                },
                __typename: 'Engagement'
              },
              webResource: {
                text: 'Invoice #482137',
                url: 'https://staging.toptal.net/platform/staff/invoices/482137',
                __typename: 'Link'
              },
              subjectObject: {
                id: 'VjEtQ2xpZW50LTI2MTc0Ng',
                webResource: {
                  text: 'Wintheiser-Gulgowski YK',
                  url: 'https://staging.toptal.net/platform/staff/companies/1250006',
                  __typename: 'Link'
                },
                preferredBillingOption: null,
                __typename: 'Client'
              },
              originalBillingCycle: {
                endDate: '2020-12-31',
                startDate: '2020-12-16',
                __typename: 'OriginalBillingCycle'
              },
              talent: {
                id: 'VjEtVGFsZW50LTEyMzU1Nw',
                webResource: {
                  text: 'Moon Lockman',
                  url: 'https://staging.toptal.net/platform/staff/talents/123557',
                  __typename: 'Link'
                },
                __typename: 'Talent'
              },
              job: {
                id: 'VjEtSm9iLTIyNDcxNw',
                webResource: {
                  text: 'Senior Brand Developer (224717)',
                  url: 'https://staging.toptal.net/platform/staff/jobs/224717',
                  __typename: 'Link'
                },
                __typename: 'Job'
              },
              __typename: 'Invoice'
            },
            {
              amount: '5544.0',
              listedAmount: '5544.0',
              actionDueOn: null,
              cleanOutstandingAmount: '5544.0',
              description:
                'Full-time services from Miran Brajsa for iOS/Swift engineer with ARKit experience from December 16, 2020 to December 31, 2020. This does not include 6 days of break.',
              longDescription: null,
              consolidatedDocument: {
                id: 'VjEtSW52b2ljZS00ODI2NjE',
                __typename: 'Invoice'
              },
              discountApplied: false,
              discountedAmount: '5544.0',
              statusComment: null,
              documentNumber: 482136,
              id: 'VjEtSW52b2ljZS00ODIxMzY',
              invoiceKind: 'COMPANY_BILL',
              unconsolidated: false,
              issueDate: '2021-01-01',
              dueDate: '2021-01-31',
              creditedAmount: '0',
              status: 'PAID',
              paidAmount: '5544.0',
              paidAt: '2021-02-07T01:11:18+03:00',
              processingDate: null,
              partiallyPaid: false,
              hasPendingCharges: false,
              operations: {
                createTransferInvoice: {
                  callable: 'DISABLED',
                  messages: [
                    'You cannot add payment to the original invoice (pay consolidated invoice instead).'
                  ],
                  __typename: 'Operation'
                },
                __typename: 'InvoiceOperations'
              },
              range: null,
              reason: {
                id: 'VjEtRW5nYWdlbWVudC0yMzgwMDM',
                placementFees: {
                  totalCount: 0,
                  __typename: 'PlacementFeeConnection'
                },
                __typename: 'Engagement'
              },
              webResource: {
                text: 'Invoice #482136',
                url: 'https://staging.toptal.net/platform/staff/invoices/482136',
                __typename: 'Link'
              },
              subjectObject: {
                id: 'VjEtQ2xpZW50LTI2MTc0Ng',
                webResource: {
                  text: 'Wintheiser-Gulgowski YK',
                  url: 'https://staging.toptal.net/platform/staff/companies/1250006',
                  __typename: 'Link'
                },
                preferredBillingOption: null,
                __typename: 'Client'
              },
              originalBillingCycle: {
                endDate: '2020-12-31',
                startDate: '2020-12-16',
                __typename: 'OriginalBillingCycle'
              },
              talent: {
                id: 'VjEtVGFsZW50LTMyNzM2Mg',
                webResource: {
                  text: 'Cindie Satterfield',
                  url: 'https://staging.toptal.net/platform/staff/talents/327362',
                  __typename: 'Link'
                },
                __typename: 'Talent'
              },
              job: {
                id: 'VjEtSm9iLTIyNDcxNg',
                webResource: {
                  text: 'Senior Brand Developer (224716)',
                  url: 'https://staging.toptal.net/platform/staff/jobs/224716',
                  __typename: 'Link'
                },
                __typename: 'Job'
              },
              __typename: 'Invoice'
            },
            {
              amount: '9120.0',
              listedAmount: '9120.0',
              actionDueOn: null,
              cleanOutstandingAmount: '9120.0',
              description:
                'Full-time services from Sanja Zdravkova for Backend Engineer (Node.js) from December 16, 2020 to December 31, 2020.',
              longDescription: null,
              consolidatedDocument: {
                id: 'VjEtSW52b2ljZS00ODI2NjE',
                __typename: 'Invoice'
              },
              discountApplied: false,
              discountedAmount: '9120.0',
              statusComment: null,
              documentNumber: 482135,
              id: 'VjEtSW52b2ljZS00ODIxMzU',
              invoiceKind: 'COMPANY_BILL',
              unconsolidated: false,
              issueDate: '2021-01-01',
              dueDate: '2021-01-31',
              creditedAmount: '0',
              status: 'PAID',
              paidAmount: '9120.0',
              paidAt: '2021-02-07T01:11:18+03:00',
              processingDate: null,
              partiallyPaid: false,
              hasPendingCharges: false,
              operations: {
                createTransferInvoice: {
                  callable: 'DISABLED',
                  messages: [
                    'You cannot add payment to the original invoice (pay consolidated invoice instead).'
                  ],
                  __typename: 'Operation'
                },
                __typename: 'InvoiceOperations'
              },
              range: null,
              reason: {
                id: 'VjEtRW5nYWdlbWVudC0yMzUzMTQ',
                placementFees: {
                  totalCount: 0,
                  __typename: 'PlacementFeeConnection'
                },
                __typename: 'Engagement'
              },
              webResource: {
                text: 'Invoice #482135',
                url: 'https://staging.toptal.net/platform/staff/invoices/482135',
                __typename: 'Link'
              },
              subjectObject: {
                id: 'VjEtQ2xpZW50LTI2MTc0Ng',
                webResource: {
                  text: 'Wintheiser-Gulgowski YK',
                  url: 'https://staging.toptal.net/platform/staff/companies/1250006',
                  __typename: 'Link'
                },
                preferredBillingOption: null,
                __typename: 'Client'
              },
              originalBillingCycle: {
                endDate: '2020-12-31',
                startDate: '2020-12-16',
                __typename: 'OriginalBillingCycle'
              },
              talent: {
                id: 'VjEtVGFsZW50LTE3NTEyODg',
                webResource: {
                  text: 'Hank Dietrich',
                  url: 'https://staging.toptal.net/platform/staff/talents/1751288',
                  __typename: 'Link'
                },
                __typename: 'Talent'
              },
              job: {
                id: 'VjEtSm9iLTIxOTUyMg',
                webResource: {
                  text: 'Chief Security Developer (219522)',
                  url: 'https://staging.toptal.net/platform/staff/jobs/219522',
                  __typename: 'Link'
                },
                __typename: 'Job'
              },
              __typename: 'Invoice'
            },
            {
              amount: '13920.0',
              listedAmount: '13920.0',
              actionDueOn: null,
              cleanOutstandingAmount: '13920.0',
              description:
                'Full-time services from Kye Huelin for Senior JavaScript Graphics Engineer (AR & 3D Experience) - Mobile Web from December 16, 2020 to December 31, 2020.',
              longDescription: null,
              consolidatedDocument: {
                id: 'VjEtSW52b2ljZS00ODI2NjE',
                __typename: 'Invoice'
              },
              discountApplied: false,
              discountedAmount: '13920.0',
              statusComment: null,
              documentNumber: 482134,
              id: 'VjEtSW52b2ljZS00ODIxMzQ',
              invoiceKind: 'COMPANY_BILL',
              unconsolidated: false,
              issueDate: '2021-01-01',
              dueDate: '2021-01-31',
              creditedAmount: '0',
              status: 'PAID',
              paidAmount: '13920.0',
              paidAt: '2021-02-07T01:11:18+03:00',
              processingDate: null,
              partiallyPaid: false,
              hasPendingCharges: false,
              operations: {
                createTransferInvoice: {
                  callable: 'DISABLED',
                  messages: [
                    'You cannot add payment to the original invoice (pay consolidated invoice instead).'
                  ],
                  __typename: 'Operation'
                },
                __typename: 'InvoiceOperations'
              },
              range: null,
              reason: {
                id: 'VjEtRW5nYWdlbWVudC0yMzA4MTg',
                placementFees: {
                  totalCount: 0,
                  __typename: 'PlacementFeeConnection'
                },
                __typename: 'Engagement'
              },
              webResource: {
                text: 'Invoice #482134',
                url: 'https://staging.toptal.net/platform/staff/invoices/482134',
                __typename: 'Link'
              },
              subjectObject: {
                id: 'VjEtQ2xpZW50LTI2MTc0Ng',
                webResource: {
                  text: 'Wintheiser-Gulgowski YK',
                  url: 'https://staging.toptal.net/platform/staff/companies/1250006',
                  __typename: 'Link'
                },
                preferredBillingOption: null,
                __typename: 'Client'
              },
              originalBillingCycle: {
                endDate: '2020-12-31',
                startDate: '2020-12-16',
                __typename: 'OriginalBillingCycle'
              },
              talent: {
                id: 'VjEtVGFsZW50LTE4MDM3Mzc',
                webResource: {
                  text: 'Tesha Trantow',
                  url: 'https://staging.toptal.net/platform/staff/talents/1803737',
                  __typename: 'Link'
                },
                __typename: 'Talent'
              },
              job: {
                id: 'VjEtSm9iLTIxNTkyNQ',
                webResource: {
                  text: 'Senior Marketing Developer (215925)',
                  url: 'https://staging.toptal.net/platform/staff/jobs/215925',
                  __typename: 'Link'
                },
                __typename: 'Job'
              },
              __typename: 'Invoice'
            }
          ],
          __typename: 'InvoiceConnection'
        },
        __typename: 'PurchaseOrder'
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
        __typename: 'PurchaseOrder'
      }
    }
  },
  GetExperiments: {
    data: {
      experiments: {
        poLines: {
          enabled: false
        }
      }
    }
  },
  GetPurchaseOrderLinesToUpdate: {
    data: {
      node: {
        __typename: 'PurchaseOrder',
        id: 'VjEtUHVyY2hhc2VPcmRlci0xNTIy',
        poNumber: 'FAKEPO-1522',
        client: {
          id: 'VjEtQ2xpZW50LTI0OTc2OQ',
          fullName: 'Jacobs, Nikolaus and Leuschke'
        },
        purchaseOrderLines: {
          nodes: [
            {
              archived: false,
              expiryDate: null,
              id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMb',
              poLineNumber: '1',
              threshold: null,
              totalAmount: '5.0'
            },
            {
              archived: false,
              expiryDate: null,
              id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMg',
              poLineNumber: '2',
              threshold: null,
              totalAmount: '500.0'
            },
            {
              archived: true,
              expiryDate: null,
              id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMg',
              poLineNumber: '3',
              threshold: null,
              totalAmount: '500.0'
            }
          ]
        }
      }
    }
  },

  // Mutations
  SetUpdatePurchaseOrder: {
    data: {
      updatePurchaseOrder: {
        purchaseOrder: GetPurchaseOrderDetails.data.node,
        notice: null,
        success: true,
        errors: [],
        __typename: 'UpdatePurchaseOrderPayload'
      }
    }
  }
}
