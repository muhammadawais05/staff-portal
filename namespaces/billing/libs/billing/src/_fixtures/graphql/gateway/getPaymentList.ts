import { BillingOptionStatus } from '@staff-portal/graphql/staff'

import MockGetPaymentListHeader from './getPaymentListHeader'

export default {
  payments: {
    __typename: 'PaymentsConnection',
    groups: [
      {
        __typename: 'PaymentsGroup',
        payments: [
          {
            client: {
              id: 'VjEtQ2xpZW50LTMzNDA3OQ',
              fullName: 'Terry, Monahan and Rice',
              webResource: {
                text: 'Terry, Monahan and Rice',
                url: 'https://staging.toptal.net/platform/staff/companies/1528979',
                __typename: 'Link'
              },
              __typename: 'Client'
            },
            paymentKind: 'SOURCING_COMMISSION',
            paymentGroup: {
              id: 'VjEtUGF5bWVudEdyb3VwLTE4ODQxNw',
              webResource: {
                __typename: 'Link',
                text: 'Payment Group 188417',
                url: 'https://staging.toptal.net/platform/staff/payment_groups/188417'
              },
              __typename: 'PaymentGroup'
            },
            extraExpenses: false,
            amount: '1120.0',
            amountWithCorrections: '1120.0',
            createdOn: '2020-10-22',
            job: {
              __typename: 'Job',
              id: 'VjEtSm9iLTIxOTI3Mw',
              webResource: {
                __typename: 'Link',
                text: 'Senior Security Developer (144329)',
                url: 'http://localhost:3000/platform/staff/jobs/144329'
              }
            },
            reason: {
              __typename: 'Talent',
              fullName: 'José Silva',
              id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
              roleType: 'Product manager',
              referrer: {
                __typename: 'Talent',
                fullName: 'José Silva',
                id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
                roleType: 'Product manager',
                webResource: {
                  __typename: 'Link',
                  text: 'José Silva',
                  url: 'http://localhost:3000/platform/staff/staff/1455082'
                }
              },
              webResource: {
                __typename: 'Link',
                text: 'José Silva',
                url: 'http://localhost:3000/platform/staff/staff/1455082'
              }
            },
            billingCycle: {
              __typename: 'BillingCycle',
              endDate: '2020-01-04',
              startDate: '2019-12-29'
            },
            description:
              'Part-time services on position Database Architect to assit design a new LMS system for Keep The Map, LLC, October 11, 2020 to October 20, 2020.',
            statusComment: null,
            documentNumber: 1208199,
            downloadHtmlUrl:
              'https://staging.toptal.net/platform/staff/payments/1208199/download',
            downloadPdfUrl:
              'https://staging.toptal.net/platform/staff/payments/1208199/download.pdf',
            id: 'VjEtUGF5bWVudC0xMjA4MTk5',
            dueDate: '2020-11-12',
            creditedAmount: '0',
            debitedAmount: '0',
            status: 'OUTSTANDING',
            paidAt: null,
            webResource: {
              text: 'Notice of Payment #1208199',
              url: 'https://staging.toptal.net/platform/staff/payments/1208199',
              __typename: 'Link'
            },
            subjectObject: {
              id: 'some-id1',
              fullName: 'Katelyn Corwin',
              paymentsHoldDescription: null,
              roleType: 'Designer',
              operations: {
                __typename: 'TalentOperations',
                createPaymentHold: {
                  callable: 'ENABLED',
                  messages: [],
                  __typename: 'Operation'
                }
              },
              type: 'Talent',
              __typename: 'Talent',
              webResource: {
                text: 'Katelyn Corwin',
                url: 'https://staging.toptal.net/platform/staff/talents/1213813',
                __typename: 'Link'
              }
            },
            operations: {
              addDocumentNote: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              addMemorandumToCommercialDocument: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              applyUnallocatedMemorandumsToCommercialDocument: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              cancelPayment: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              assignPurchaseOrder: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              convertPaymentIntoCreditMemorandum: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              disputeCommercialDocument: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              editDocumentNote: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              payPayment: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              removePaymentFromPaymentGroup: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              resolveDisputeOfCommercialDocument: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              updateCommercialDocumentDueDate: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              __typename: 'PaymentOperations'
            },
            __typename: 'Payment'
          },
          {
            client: {
              id: 'VjEtQ2xpZW50LTMzNDA3OQ',
              fullName: 'Terry, Monahan and Rice',
              webResource: {
                text: 'Terry, Monahan and Rice',
                url: 'https://staging.toptal.net/platform/staff/companies/1528979',
                __typename: 'Link'
              },
              __typename: 'Client'
            },
            paymentKind: 'TALENT_PAYMENT',
            paymentGroup: null,
            extraExpenses: false,
            amount: '1440.0',
            amountWithCorrections: '1440.0',
            createdOn: '2020-10-22',
            job: {
              __typename: 'Job',
              id: 'VjEtSm9iLTIxOTI3Mw',
              webResource: {
                __typename: 'Link',
                text: 'Senior Security Developer (144329)',
                url: 'http://localhost:3000/platform/staff/jobs/144329'
              }
            },
            reason: {
              __typename: 'Talent',
              fullName: 'José Silva',
              id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
              roleType: 'Product manager',
              referrer: {
                __typename: 'Talent',
                fullName: 'José Silva',
                id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
                webResource: {
                  __typename: 'Link',
                  text: 'José Silva',
                  url: 'http://localhost:3000/platform/staff/staff/1455082'
                }
              },
              webResource: {
                __typename: 'Link',
                text: 'José Silva',
                url: 'http://localhost:3000/platform/staff/staff/1455082'
              }
            },
            billingCycle: {
              __typename: 'BillingCycle',
              endDate: '2020-01-04',
              startDate: '2019-12-29'
            },
            description:
              'Part-time services on position UX designer for v2 of application for Asset Vision Logistics LLC, October 11, 2020 to October 21, 2020.',
            statusComment: null,
            documentNumber: 1208198,
            downloadHtmlUrl:
              'https://staging.toptal.net/platform/staff/payments/1208198/download',
            downloadPdfUrl:
              'https://staging.toptal.net/platform/staff/payments/1208198/download.pdf',
            id: 'VjEtUGF5bWVudC0xMjA4MTk4',
            dueDate: '2020-11-12',
            creditedAmount: '0',
            debitedAmount: '120',
            status: 'OUTSTANDING',
            paidAt: null,
            webResource: {
              text: 'Notice of Payment #1208198',
              url: 'https://staging.toptal.net/platform/staff/payments/1208198',
              __typename: 'Link'
            },
            subjectObject: {
              id: 'some-id2',
              fullName: 'Shawanna Quigley',
              paymentsHoldDescription: null,
              roleType: 'Talent',
              type: 'Talent',
              operations: {
                __typename: 'TalentOperations',
                createPaymentHold: {
                  callable: 'ENABLED',
                  messages: [],
                  __typename: 'Operation'
                }
              },
              __typename: 'Talent',
              webResource: {
                text: 'Shawanna Quigley',
                url: 'https://staging.toptal.net/platform/staff/talents/604984',
                __typename: 'Link'
              }
            },
            operations: {
              addDocumentNote: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              addMemorandumToCommercialDocument: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              applyUnallocatedMemorandumsToCommercialDocument: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              cancelPayment: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              convertPaymentIntoCreditMemorandum: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              assignPurchaseOrder: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              collectBadDebtInvoice: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              disputeCommercialDocument: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              editDocumentNote: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              payPayment: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              removePaymentFromPaymentGroup: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              resolveDisputeOfCommercialDocument: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              updateCommercialDocumentDueDate: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              __typename: 'PaymentOperations'
            },
            __typename: 'Payment'
          },
          {
            client: {
              id: 'VjEtQ2xpZW50LTMzNDA3OQ',
              fullName: 'Terry, Monahan and Rice',
              webResource: {
                text: 'Terry, Monahan and Rice',
                url: 'https://staging.toptal.net/platform/staff/companies/1528979',
                __typename: 'Link'
              },
              __typename: 'Client'
            },
            paymentKind: 'TALENT_PAYMENT',
            paymentGroup: null,
            extraExpenses: true,
            amount: '2000.0',
            amountWithCorrections: '2000.0',
            createdOn: '2020-10-22',
            job: {
              __typename: 'Job',
              id: 'VjEtSm9iLTIxOTI3Mw',
              webResource: {
                __typename: 'Link',
                text: 'Senior Security Developer (144329)',
                url: 'http://localhost:3000/platform/staff/jobs/144329'
              }
            },
            reason: {
              __typename: 'Talent',
              fullName: 'José Silva',
              id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
              roleType: 'Product manager',
              referrer: {
                __typename: 'Talent',
                fullName: 'José Silva',
                id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
                webResource: {
                  __typename: 'Link',
                  text: 'José Silva',
                  url: 'http://localhost:3000/platform/staff/staff/1455082'
                }
              },
              webResource: {
                __typename: 'Link',
                text: 'José Silva',
                url: 'http://localhost:3000/platform/staff/staff/1455082'
              }
            },
            billingCycle: {
              __typename: 'BillingCycle',
              endDate: '2020-01-04',
              startDate: '2019-12-29'
            },
            description:
              'Commission for referring company MAKERMONSTER LLC. for its services on Ruby On Rails Backend Engineer for a VR Product: September 21, 2020 to September 25, 2020.',
            statusComment: 'This part was obfuscated, some content was here.',
            documentNumber: 1208197,
            downloadHtmlUrl:
              'https://staging.toptal.net/platform/staff/payments/1208197/download',
            downloadPdfUrl:
              'https://staging.toptal.net/platform/staff/payments/1208197/download.pdf',
            id: 'VjEtUGF5bWVudC0xMjA4MTk3',
            dueDate: '2020-10-22',
            creditedAmount: '0',
            debitedAmount: '120.20',
            status: 'DUE',
            paidAt: null,
            webResource: {
              text: 'Notice of Payment #1208197',
              url: 'https://staging.toptal.net/platform/staff/payments/1208197',
              __typename: 'Link'
            },
            subjectObject: {
              id: 'some-id3',
              roleType: 'Product owner',
              fullName: 'Halvorson, Eichmann and Mueller',
              __typename: 'Client',
              webResource: {
                text: 'Halvorson, Eichmann and Mueller',
                url: 'https://staging.toptal.net/platform/staff/companies/1664080',
                __typename: 'Link'
              },
              preferredBillingOption: {
                billingMethod: 'ACH',
                discountValue: 3,
                discountable: true,
                id: 'VjEtQUNIQmlsbGluZ09wdGlvbi0xNTcyNzA',
                name: 'ACH',
                last4Digits: '5526',
                preferred: false,
                __typename: 'ACHBillingOption',
                comment: 'Example comment.',
                isLastPullMethod: true,
                status: BillingOptionStatus.VERIFIED,
                accountInfo: [],
                operations: {
                  __typename: 'ACHBillingOptionOperations',
                  preferEnterpriseBillingOption: {
                    __typename: 'Operation',
                    callable: 'DISABLED',
                    messages: []
                  },
                  removeBillingOption: {
                    __typename: 'Operation',
                    callable: 'DISABLED',
                    messages: []
                  },
                  removeEnterpriseBillingOption: {
                    __typename: 'Operation',
                    callable: 'DISABLED',
                    messages: []
                  },
                  unsetPreferredBillingOption: {
                    __typename: 'Operation',
                    callable: 'DISABLED',
                    messages: []
                  }
                }
              }
            },
            operations: {
              addDocumentNote: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              addMemorandumToCommercialDocument: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              applyUnallocatedMemorandumsToCommercialDocument: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              cancelPayment: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              convertPaymentIntoCreditMemorandum: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              assignPurchaseOrder: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              disputeCommercialDocument: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              editDocumentNote: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              payPayment: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              resolveDisputeOfCommercialDocument: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              removePaymentFromPaymentGroup: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              updateCommercialDocumentDueDate: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              __typename: 'PaymentOperations'
            },
            __typename: 'Payment'
          },
          {
            amount: '2400.0',
            amountWithCorrections: '2400.0',
            debitedAmount: '0.0',
            billingCycle: {
              startDate: '2020-10-31',
              endDate: '2020-11-07',
              __typename: 'BillingCycle'
            },
            client: {
              id: 'VjEtQ2xpZW50LTI5NTI2OA',
              fullName: 'Considine-Leffler CY',
              webResource: {
                text: 'Considine-Leffler CY',
                url: 'https://staging.toptal.net/platform/staff/companies/1379566',
                __typename: 'Link'
              },
              __typename: 'Client'
            },
            createdOn: '2020-11-08',
            description:
              'Full-time services on position C# Developer for Alteryx -- Localization, October 31, 2020 to November 7, 2020.',
            statusComment: 'This part was obfuscated, some content was here.',
            documentNumber: 1216898,
            downloadHtmlUrl:
              'https://staging.toptal.net/platform/staff/payments/1216898/download',
            downloadPdfUrl:
              'https://staging.toptal.net/platform/staff/payments/1216898/download.pdf',
            id: 'VjEtUGF5bWVudC0xMjE2ODk4',
            paymentKind: 'TALENT_PAYMENT',
            extraExpenses: false,
            reason: {
              __typename: 'Engagement',
              id: 'VjEtRW5nYWdlbWVudC0yMzUxMDc',
              talent: {
                id: 'VjEtVGFsZW50LTI2MzY4Ng',
                fullName: 'Bunny Zboncak',
                webResource: {
                  text: 'Bunny Zboncak',
                  url: 'https://staging.toptal.net/platform/staff/talents/263686',
                  __typename: 'Link'
                },
                __typename: 'Talent'
              },
              webResource: {
                text: 'Lead Solutions Developer (221668) → Bunny Zboncak',
                url: 'https://staging.toptal.net/platform/staff/engagements/235107',
                __typename: 'Link'
              }
            },
            dueDate: '2020-11-27',
            creditedAmount: '0',
            paymentGroup: null,
            status: 'ON_HOLD',
            paidAt: '2020-11-26T08:10:11+03:00',
            webResource: {
              text: 'Notice of Payment #1216898',
              url: 'https://staging.toptal.net/platform/staff/payments/1216898',
              __typename: 'Link'
            },
            subjectObject: {
              roleType: 'Developer',
              __typename: 'Talent',
              operations: {
                __typename: 'TalentOperations',
                createPaymentHold: {
                  callable: 'ENABLED',
                  messages: [],
                  __typename: 'Operation'
                }
              },
              fullName: 'Bunny Zboncak',
              id: 'VjEtVGFsZW50LTI2MzY4Ng',
              webResource: {
                text: 'Bunny Zboncak',
                url: 'https://staging.toptal.net/platform/staff/talents/263686',
                __typename: 'Link'
              },
              paymentsHoldDescription: 'until January 4, 2021'
            },
            operations: {
              payPayment: {
                callable: 'DISABLED',
                messages: [
                  'You may only pay outstanding, due or overdue payments.'
                ],
                __typename: 'Operation'
              },
              removePaymentFromPaymentGroup: {
                callable: 'HIDDEN',
                messages: [],
                __typename: 'Operation'
              },
              __typename: 'PaymentOperations'
            },
            job: {
              id: 'VjEtSm9iLTIyMTY2OA',
              webResource: {
                text: 'Lead Solutions Developer (221668)',
                url: 'https://staging.toptal.net/platform/staff/jobs/221668',
                __typename: 'Link'
              },
              __typename: 'Job'
            },
            __typename: 'Payment'
          }
        ],
        month: 10,
        year: 2020,
        totals: {
          __typename: 'PaymentsTotals',
          debited: '177502.39',
          disputed: '6614.4',
          due: '107863.74',
          onHold: '0.0',
          outstanding: '13837253.09',
          overdue: '282720.39',
          paid: '1994375.09'
        }
      }
    ],
    totalCount: 4,
    operations: MockGetPaymentListHeader.payments.operations,
    totals: {
      __typename: 'PaymentsTotals',
      debited: '7713398.34',
      disputed: '28715.74',
      due: '107863.74',
      onHold: '37767.5',
      outstanding: '13837253.09',
      overdue: '459784.53',
      paid: '590996848.7'
    }
  }
}
