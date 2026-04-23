import {
  BillingOptionVerificationStatus,
  BillingOptionStatus
} from '@staff-portal/graphql/staff'

export default {
  invoices: {
    __typename: 'InvoicesConnection',
    downloadXlsxUrl: '',
    operations: {
      __typename: 'InvoicesConnectionOperations',
      consolidateInvoices: {
        __typename: 'Operation',
        callable: 'ENABLED',
        messages: []
      }
    },
    groups: [
      {
        __typename: 'InvoiceGroup',
        invoices: [
          {
            __typename: 'Invoice',
            amount: '500.0',
            cleanOutstandingAmount: '500.0',
            creditedAmount: '600.0',
            description:
              'Deposit for React Front-end developer  that goes toward first invoice.',
            discountApplied: false,
            discountedAmount: '500.0',
            documentNumber: 430334,
            longDescription: ['example single description'],
            downloadHtmlUrl:
              'http://localhost:3000/platform/staff/invoices/430334/download',
            downloadPdfUrl:
              'http://localhost:3000/platform/staff/invoices/430334/download.pdf',
            dueDate: '2020-07-21',
            id: 'VjEtSW52b2ljZS00MzAzMzQ',
            issueDate: '2020-07-21',
            actionDueOn: '2020-07-21',
            processingDate: '2020-07-21',
            paidAt: null,
            statusComment: 'test comment',
            consolidatedDocument: null,
            consolidatable: true,
            job: {
              __typename: 'Job',
              id: 'VjEtSm9iLTIxNDQ1Ng',
              webResource: {
                __typename: 'Link',
                text: 'Chief Brand Developer (214456)',
                url: 'http://localhost:3000/platform/staff/jobs/214456'
              }
            },
            invoiceKind: 'COMPANY_DEPOSIT',
            unconsolidated: false,
            listedAmount: '500.0',
            hasPendingCharges: false,
            range: {
              __typename: 'BigDecimalRange',
              from: '2015-05-05',
              till: '2015-06-06'
            },
            reason: null,
            operations: {
              __typename: 'InvoiceOperations',
              addDocumentNote: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              editDocumentNote: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              addMemorandumToCommercialDocument: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              applyPrepayments: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              applyPromotions: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              applyUnallocatedMemorandumsToCommercialDocument: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              assignPurchaseOrder: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              collectBadDebtInvoice: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              createTransferInvoice: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              disputeTalentPayments: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              recordBadDebt: {
                __typename: 'Operation',
                callable: 'DISABLED',
                messages: ['You cannot record bad debt for company deposits.']
              },
              disputeCommercialDocument: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              resolveDisputeOfCommercialDocument: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              unconsolidate: {
                __typename: 'Operation',
                callable: 'DISABLED',
                messages: ['The invoice is not consolidated.']
              },
              updateDispute: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              updateCommercialDocumentDueDate: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              writeOff: {
                __typename: 'Operation',
                callable: 'DISABLED',
                messages: [
                  'Only invoices that have been recorded as a bad debt can be written off.'
                ]
              }
            },
            originalBillingCycle: null,
            paidAmount: '0',
            partiallyPaid: false,
            status: 'OVERDUE',
            relatedTasks: { nodes: [], __typename: 'Task' },
            subjectObject: {
              __typename: 'Client',
              id: 'VjEtQ2xpZW50LTIyNDc4OA',
              preferredBillingOption: {
                __typename: 'CreditCardBillingOption',
                billingMethod: 'CREDIT_CARD',
                cardExpired: false,
                discountValue: 3,
                discountable: false,
                id: 'VjEtQ3JlZGl0Q2FyZEJpbGxpbmdPcHRpb24tMTYzODIy',
                last4Digits: '4901',
                name: 'CREDIT_CARD',
                type: 'VISA',
                preferred: true,
                comment: 'Example comment.',
                isLastPullMethod: true,
                status: BillingOptionStatus.VERIFIED,
                verificationStatuses: [
                  BillingOptionVerificationStatus.CAN_BE_CHARGED
                ],
                accountInfo: [
                  {
                    label: 'Name',
                    value: 'John Talbot',
                    __typename: 'AccountInfo'
                  },
                  {
                    label: 'Number',
                    value: '**** **** **** 1324',
                    __typename: 'AccountInfo'
                  },
                  {
                    label: 'Expires',
                    value: '12/2015',
                    __typename: 'AccountInfo'
                  },
                  {
                    label: 'Type',
                    value: 'MasterCard',
                    __typename: 'AccountInfo'
                  }
                ],
                operations: {
                  __typename: 'CreditCardBillingOptionOperations',
                  reverifyCreditCardBillingOption: {
                    __typename: 'Operation',
                    callable: 'DISABLED',
                    messages: []
                  },
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
              },
              webResource: {
                __typename: 'Link',
                text: 'Bernhard, Smitham and Pagac',
                url: 'http://localhost:3000/platform/staff/companies/1977832'
              }
            },
            talent: null,
            webResource: {
              __typename: 'Link',
              text: 'Invoice #430334',
              url: 'http://localhost:3000/platform/staff/invoices/430334'
            }
          },
          {
            __typename: 'Invoice',
            amount: '500.0',
            creditedAmount: '600.0',
            cleanOutstandingAmount: '500.0',
            description:
              'Deposit for WordPress Developer that goes toward first invoice.',
            discountApplied: false,
            discountedAmount: '500.0',
            statusComment: null,
            listedAmount: '500.0',
            hasPendingCharges: false,
            consolidatedDocument: null,
            consolidatable: true,
            longDescription: [
              'example single description',
              'example single description',
              'example single description'
            ],
            range: {
              __typename: 'BigDecimalRange',
              from: '2015-05-05',
              till: '2015-06-06'
            },
            documentNumber: 430333,
            downloadHtmlUrl:
              'http://localhost:3000/platform/staff/invoices/430333/download',
            downloadPdfUrl:
              'http://localhost:3000/platform/staff/invoices/430333/download.pdf',
            dueDate: '2020-07-21',
            id: 'VjEtSW52b2ljZS00MzAzMzM',
            issueDate: '2020-07-21',
            actionDueOn: '2020-07-21',
            processingDate: '2020-07-21',
            job: {
              __typename: 'Job',
              id: 'VjEtSm9iLTIxNDMzMA',
              webResource: {
                __typename: 'Link',
                text: 'Chief Web Developer (214330)',
                url: 'http://localhost:3000/platform/staff/jobs/214330'
              }
            },
            invoiceKind: 'COMPANY_DEPOSIT',
            unconsolidated: false,
            operations: {
              __typename: 'InvoiceOperations',
              addMemorandumToCommercialDocument: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              addDocumentNote: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              editDocumentNote: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              applyPrepayments: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              applyPromotions: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              applyUnallocatedMemorandumsToCommercialDocument: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              assignPurchaseOrder: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              collectBadDebtInvoice: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              createTransferInvoice: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              disputeTalentPayments: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              recordBadDebt: {
                __typename: 'Operation',
                callable: 'DISABLED',
                messages: ['You cannot record bad debt for company deposits.']
              },
              disputeCommercialDocument: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              resolveDisputeOfCommercialDocument: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              unconsolidate: {
                __typename: 'Operation',
                callable: 'DISABLED',
                messages: ['The invoice is not consolidated.']
              },
              updateDispute: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              updateCommercialDocumentDueDate: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              writeOff: {
                __typename: 'Operation',
                callable: 'DISABLED',
                messages: [
                  'Only invoices that have been recorded as a bad debt can be written off.'
                ]
              }
            },
            originalBillingCycle: null,
            paidAmount: '0',
            partiallyPaid: false,
            reason: null,
            relatedTasks: { nodes: [], __typename: 'Task' },
            status: 'OVERDUE',
            paidAt: null,
            subjectObject: {
              __typename: 'Client',
              id: 'VjEtQ2xpZW50LTIyNDc4OA',
              preferredBillingOption: {
                __typename: 'CreditCardBillingOption',
                billingMethod: 'CREDIT_CARD',
                cardExpired: false,
                discountValue: 3,
                discountable: false,
                id: 'VjEtQ3JlZGl0Q2FyZEJpbGxpbmdPcHRpb24tMTYzNzg4',
                name: 'CREDIT_CARD',
                last4Digits: '0191',
                type: 'American Express',
                comment: 'Example comment.',
                isLastPullMethod: true,
                status: BillingOptionStatus.VERIFIED,
                verificationStatuses: [
                  BillingOptionVerificationStatus.CAN_BE_CHARGED
                ],
                accountInfo: [
                  {
                    label: 'Name',
                    value: 'John Talbot',
                    __typename: 'AccountInfo'
                  },
                  {
                    label: 'Number',
                    value: '**** **** **** 1324',
                    __typename: 'AccountInfo'
                  },
                  {
                    label: 'Expires',
                    value: '12/2015',
                    __typename: 'AccountInfo'
                  },
                  {
                    label: 'Type',
                    value: 'MasterCard',
                    __typename: 'AccountInfo'
                  }
                ],
                preferred: true,
                operations: {
                  __typename: 'CreditCardBillingOptionOperations',
                  reverifyCreditCardBillingOption: {
                    __typename: 'Operation',
                    callable: 'DISABLED',
                    messages: []
                  },
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
              },
              webResource: {
                __typename: 'Link',
                text: 'Welch-Kuhic DD',
                url: 'http://localhost:3000/platform/staff/companies/1972646'
              }
            },
            talent: null,
            webResource: {
              __typename: 'Link',
              text: 'Invoice #430333',
              url: 'http://localhost:3000/platform/staff/invoices/430333'
            }
          },
          {
            __typename: 'Invoice',
            amount: '34402.0',
            creditedAmount: '600.0',
            cleanOutstandingAmount: '34402.0',
            description: 'Prepayment for all invoices through July 23.',
            discountApplied: false,
            discountedAmount: '34402.0',
            listedAmount: '34402.0',
            hasPendingCharges: false,
            longDescription: null,
            statusComment: null,
            consolidatedDocument: null,
            consolidatable: false,
            range: {
              __typename: 'BigDecimalRange',
              from: '2015-05-05',
              till: '2015-06-06'
            },
            documentNumber: 430332,
            downloadHtmlUrl:
              'http://localhost:3000/platform/staff/invoices/430332/download',
            downloadPdfUrl:
              'http://localhost:3000/platform/staff/invoices/430332/download.pdf',
            dueDate: '2020-07-31',
            id: 'VjEtSW52b2ljZS00MzAzMzI',
            issueDate: '2020-07-21',
            actionDueOn: '2020-07-21',
            processingDate: '2020-07-21',
            job: null,
            invoiceKind: 'COMPANY_DEPOSIT',
            unconsolidated: false,
            operations: {
              __typename: 'InvoiceOperations',
              addDocumentNote: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              editDocumentNote: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              addMemorandumToCommercialDocument: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              applyPrepayments: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              applyPromotions: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              applyUnallocatedMemorandumsToCommercialDocument: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              assignPurchaseOrder: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              collectBadDebtInvoice: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              createTransferInvoice: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              disputeTalentPayments: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              recordBadDebt: {
                __typename: 'Operation',
                callable: 'DISABLED',
                messages: ['You cannot record bad debt for company deposits.']
              },
              disputeCommercialDocument: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              resolveDisputeOfCommercialDocument: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              unconsolidate: {
                __typename: 'Operation',
                callable: 'DISABLED',
                messages: ['The invoice is not consolidated.']
              },
              updateDispute: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: []
              },
              updateCommercialDocumentDueDate: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              writeOff: {
                __typename: 'Operation',
                callable: 'DISABLED',
                messages: [
                  'Only invoices that have been recorded as a bad debt can be written off.'
                ]
              }
            },
            originalBillingCycle: null,
            paidAmount: '0',
            partiallyPaid: false,
            reason: null,
            relatedTasks: { nodes: [], __typename: 'Task' },
            status: 'OUTSTANDING',
            paidAt: null,
            subjectObject: {
              __typename: 'Client',
              id: 'VjEtQ2xpZW50LTIyNDc4OA',
              preferredBillingOption: {
                __typename: 'OtherBillingOption',
                billingMethod: 'WIRE',
                discountValue: 3,
                discountable: true,
                name: 'WIRE',
                id: 'VjEtT3RoZXJCaWxsaW5nT3B0aW9uLTE2MjQwNA',
                preferred: false,
                comment: 'Example comment.',
                isLastPullMethod: true,
                status: BillingOptionStatus.VERIFIED,
                accountInfo: [],
                operations: {
                  __typename: 'BillingOptionOperations',
                  reverifyCreditCardBillingOption: {
                    __typename: 'Operation',
                    callable: 'DISABLED',
                    messages: []
                  },
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
              },
              webResource: {
                __typename: 'Link',
                text: 'Considine-Stamm JB',
                url: 'http://localhost:3000/platform/staff/companies/1707511'
              }
            },
            talent: null,
            webResource: {
              __typename: 'Link',
              text: 'Invoice #430332',
              url: 'http://localhost:3000/platform/staff/invoices/430332'
            }
          }
        ],
        month: 2,
        year: 2020
      }
    ],
    totalCount: 3,
    totals: {
      __typename: 'InvoicesTotals',
      credited: '4018088.93',
      disputed: '16628.32',
      inCollections: '1324378.32',
      outstanding: '19878148.36',
      overdue: '2025589.53',
      paid: '29314229.54',
      pendingReceipt: '2324378.32',
      writtenOff: '324378.32',
      draft: '0.00'
    }
  }
}
