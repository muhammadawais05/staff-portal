import {
  BillingMethodName,
  BillingOptionStatus,
  OperationCallableTypes,
  BillingOptionVerificationStatus,
  PaymentOptionPaymentMethod
} from '@staff-portal/graphql/staff'

export default {
  __typename: 'Client',
  _companyId: 2425266,
  availablePrepaymentBalanceNullable: '1350.0',
  billingInformationNotes: {
    nodes: [
      {
        comment: 'test',
        createdAt: '2021-05-07T00:01:52+03:00',
        creator: {
          fullName: 'Jess Dozier',
          id: 'VjEtU3RhZmYtMTY0OTEyMQ',
          email: 'jess-b76cd0f78af77cda@toptal.io',
          __typename: 'Staff',
          webResource: {
            text: 'Jess Dozier',
            url: 'https://staging.toptal.net/platform/staff/staff/1649121',
            __typename: 'Link'
          }
        },
        id: 'VjEtTm90ZS0xNDMzNTcz',
        newSalesCall: false,
        checklistSalesCall: false,
        operations: {
          removeNote: {
            callable: 'HIDDEN',
            messages: ['Billing information notes cannot be deleted'],
            __typename: 'Operation'
          },
          removeNoteAttachment: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          updateNote: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'NoteOperations'
        },
        screeningCall: false,
        title: 'Billing information: ',
        updatedAt: '2021-05-07T00:06:33+03:00',
        __typename: 'Note',
        status: 'ACTIVE',
        attachment: null,
        answers: {
          nodes: [
            {
              comment: '',
              label: 'Check',
              value: ['Check'],
              displayText: 'Check',
              question: {
                id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMjQ4',
                label: 'Payment method?',
                group: {
                  label: 'Billing Information',
                  __typename: 'NoteQuestionGroup'
                },
                __typename: 'NoteQuestion'
              },
              __typename: 'NoteAnswer'
            },
            {
              comment: '',
              label: 'Yes',
              value: ['Yes'],
              displayText: 'Yes',
              question: {
                id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMjQ5',
                label:
                  'Contact information for accounting department? Added to Contacts?',
                group: {
                  label: 'Billing Information',
                  __typename: 'NoteQuestionGroup'
                },
                __typename: 'NoteQuestion'
              },
              __typename: 'NoteAnswer'
            }
          ],
          __typename: 'NoteAnswerConnection'
        },
        softSkillRatings: {
          nodes: [],
          __typename: 'SoftSkillRatingConnection'
        }
      },
      {
        comment: 'test',
        createdAt: '2021-05-06T23:45:38+03:00',
        creator: {
          fullName: 'Jess Dozier',
          id: 'VjEtU3RhZmYtMTY0OTEyMQ',
          email: 'jess-b76cd0f78af77cda@toptal.io',
          __typename: 'Staff',
          webResource: {
            text: 'Jess Dozier',
            url: 'https://staging.toptal.net/platform/staff/staff/1649121',
            __typename: 'Link'
          }
        },
        id: 'VjEtTm90ZS0xNDMzNTcy',
        newSalesCall: false,
        checklistSalesCall: false,
        operations: {
          removeNote: {
            callable: 'HIDDEN',
            messages: ['Billing information notes cannot be deleted'],
            __typename: 'Operation'
          },
          removeNoteAttachment: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          updateNote: {
            callable: 'HIDDEN',
            messages: ['Only active notes can be edited'],
            __typename: 'Operation'
          },
          __typename: 'NoteOperations'
        },
        screeningCall: false,
        title: 'Billing information: ',
        updatedAt: '2021-05-07T00:01:52+03:00',
        __typename: 'Note',
        status: 'ARCHIVED',
        attachment: null,
        answers: {
          nodes: [
            {
              comment: '',
              label: 'Check',
              value: ['Check'],
              displayText: 'Check',
              question: {
                id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMjQ4',
                label: 'Payment method?',
                group: {
                  label: 'Billing Information',
                  __typename: 'NoteQuestionGroup'
                },
                __typename: 'NoteQuestion'
              },
              __typename: 'NoteAnswer'
            },
            {
              comment: '',
              label: 'Yes',
              value: ['Yes'],
              displayText: 'Yes',
              question: {
                id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMjQ5',
                label:
                  'Contact information for accounting department? Added to Contacts?',
                group: {
                  label: 'Billing Information',
                  __typename: 'NoteQuestionGroup'
                },
                __typename: 'NoteQuestion'
              },
              __typename: 'NoteAnswer'
            }
          ],
          __typename: 'NoteAnswerConnection'
        },
        softSkillRatings: {
          nodes: [],
          __typename: 'SoftSkillRatingConnection'
        }
      }
    ],
    __typename: 'NoteConnection'
  },
  billingOptions: {
    __typename: 'BillingOptionInterfaceConnection',
    nodes: [
      {
        __typename: 'CreditCardBillingOption',
        name: 'Credit Card',
        billingMethod: BillingMethodName.CREDIT_CARD,
        cardExpired: false,
        type: 'MasterCard',
        last4Digits: '3745',
        discountValue: 0,
        discountable: false,
        preferred: false,
        comment: 'Example comment.',
        isLastPullMethod: true,
        status: BillingOptionStatus.VERIFIED,
        verificationStatuses: [BillingOptionVerificationStatus.CAN_BE_CHARGED],
        accountInfo: [
          { label: 'Name', value: 'John Talbot', __typename: 'AccountInfo' },
          {
            label: 'Number',
            value: '**** **** **** 1324',
            __typename: 'AccountInfo'
          },
          { label: 'Expires', value: '12/2015', __typename: 'AccountInfo' },
          { label: 'Type', value: 'MasterCard', __typename: 'AccountInfo' }
        ],
        id: 'VjEtQ3JlZGl0Q2FyZEJpbGxpbmdPcHRpb24tMTcyMjE5',
        operations: {
          __typename: 'ClientOperations',
          reverifyCreditCardBillingOption: {
            __typename: 'Operation',
            callable: OperationCallableTypes.ENABLED,
            messages: []
          },
          preferEnterpriseBillingOption: {
            __typename: 'Operation',
            callable: OperationCallableTypes.ENABLED,
            messages: []
          },
          unsetPreferredBillingOption: {
            __typename: 'Operation',
            callable: OperationCallableTypes.HIDDEN,
            messages: []
          },
          removeBillingOption: {
            __typename: 'Operation',
            callable: OperationCallableTypes.ENABLED,
            messages: []
          },
          removeEnterpriseBillingOption: {
            __typename: 'Operation',
            callable: OperationCallableTypes.HIDDEN,
            messages: []
          }
        }
      },
      {
        billingMethod: BillingMethodName.WIRE,
        discountValue: 3,
        discountable: true,
        accountInfo: [
          {
            label: 'Name on account',
            value: 'Account name',
            __typename: 'AccountInfo'
          },
          { label: 'Bank name', value: 'Bank name', __typename: 'AccountInfo' }
        ],
        comment: 'Comment',
        isLastPullMethod: false,
        id: 'VjEtV2lyZUJpbGxpbmdPcHRpb24tMjEzMQ',
        name: 'Wire',
        preferred: false,
        status: BillingOptionStatus.VERIFIED,
        operations: {
          preferEnterpriseBillingOption: {
            callable: OperationCallableTypes.ENABLED,
            messages: [],
            __typename: 'Operation'
          },
          removeBillingOption: {
            callable: OperationCallableTypes.ENABLED,
            messages: [],
            __typename: 'Operation'
          },
          removeEnterpriseBillingOption: {
            callable: OperationCallableTypes.HIDDEN,
            messages: [],
            __typename: 'Operation'
          },
          unsetPreferredBillingOption: {
            callable: OperationCallableTypes.HIDDEN,
            messages: [],
            __typename: 'Operation'
          },
          verifyWireBillingOption: {
            callable: OperationCallableTypes.HIDDEN,
            messages: [],
            __typename: 'Operation'
          },
          unverifyWireBillingOption: {
            callable: OperationCallableTypes.ENABLED,
            messages: [],
            __typename: 'Operation'
          },
          updateBillingOption: {
            callable: OperationCallableTypes.ENABLED,
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'WireBillingOptionOperations'
        },
        __typename: 'WireBillingOption'
      },
      {
        accountInfo: [
          {
            label: 'Business name',
            value: 'Paypal business name',
            __typename: 'AccountInfo'
          },
          {
            label: 'Email',
            value: 'paypal@toptal.com',
            __typename: 'AccountInfo'
          }
        ],
        comment: 'Example comment.',
        isLastPullMethod: false,
        status: BillingOptionStatus.VERIFIED,
        billingMethod: BillingMethodName.PAYPAL,
        discountValue: 3,
        discountable: false,
        id: 'VjEtUGF5cGFsQmlsbGluZ09wdGlvbi0xNjY5',
        name: 'PayPal',
        preferred: false,
        operations: {
          preferEnterpriseBillingOption: {
            callable: OperationCallableTypes.ENABLED,
            messages: [],
            __typename: 'Operation'
          },
          removeBillingOption: {
            callable: OperationCallableTypes.ENABLED,
            messages: [],
            __typename: 'Operation'
          },
          removeEnterpriseBillingOption: {
            callable: OperationCallableTypes.HIDDEN,
            messages: [],
            __typename: 'Operation'
          },
          unsetPreferredBillingOption: {
            callable: OperationCallableTypes.HIDDEN,
            messages: [],
            __typename: 'Operation'
          },
          updateBillingOption: {
            callable: OperationCallableTypes.ENABLED,
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'PaypalBillingOptionOperations'
        },
        __typename: 'PaypalBillingOption'
      }
    ],
    totalCount: 3
  },
  id: 'VjEtQ2xpZW50LTIxNzM4OQ',
  preferredBillingOption: null,
  unallocatedMemorandums: {
    __typename: 'MemorandumConnection',
    totalAmount: '500.0',
    webResource: {
      __typename: 'Link',
      text: 'memo link text',
      url: 'memoLink'
    },
    nodes: [
      {
        allocated: false,
        amount: '120.0',
        amountDue: '120.0',
        balance: 'CREDIT',
        depositCorrection: false,
        description: 'This is a sample description of credit Memo 1',
        downloadHtmlUrl: '',
        downloadPdfUrl: '',
        id: 'VjEtSW52b2ljZS0zNzcyNDk',
        number: 112547,
        operations: {
          revertInvoicePrepayments: {
            __typename: 'Operation',
            callable: 'HIDDEN',
            messages: []
          }
        },
        portions: []
      },
      {
        allocated: false,
        amount: '20.0',
        amountDue: '35.0',
        balance: 'CREDIT',
        depositCorrection: false,
        description: 'This is a sample description of credit Memo 3452',
        downloadHtmlUrl: '',
        downloadPdfUrl: '',
        id: 'VjEtSW52b2ljZS0xMTI1MzQ',
        number: 112534,
        operations: {
          revertInvoicePrepayments: {
            __typename: 'Operation',
            callable: 'HIDDEN',
            messages: []
          }
        },
        portions: []
      },
      {
        allocated: false,
        amount: '670.0',
        amountDue: '670.3',
        balance: 'CREDIT',
        depositCorrection: false,
        description: 'This is a sample description of credit Memo 768',
        downloadHtmlUrl: '',
        downloadPdfUrl: '',
        id: 'VjEtSW52b2ljZS0xMjEzNDc',
        number: 121347,
        operations: {
          revertInvoicePrepayments: {
            __typename: 'Operation',
            callable: 'HIDDEN',
            messages: []
          }
        },
        portions: []
      },
      {
        allocated: false,
        amount: '25.0',
        amountDue: '25.0',
        balance: 'DEBIT',
        depositCorrection: false,
        description: 'This is a sample description of debit Memo 2',
        downloadHtmlUrl: '',
        downloadPdfUrl: '',
        id: 'VjEtTWVtb3JhbmR1bS0xMTMyMjI',
        number: 122647,
        operations: {
          revertInvoicePrepayments: {
            __typename: 'Operation',
            callable: 'HIDDEN',
            messages: []
          }
        },
        portions: []
      },
      {
        allocated: false,
        amount: '55.0',
        amountDue: '55.0',
        balance: 'DEBIT',
        depositCorrection: false,
        description: 'This is a sample description of debit Memo 562',
        downloadHtmlUrl: '',
        downloadPdfUrl: '',
        id: 'VjEtSW52b2ljZS0xMjIzNTc',
        number: 122357,
        operations: {
          revertInvoicePrepayments: {
            __typename: 'Operation',
            callable: 'HIDDEN',
            messages: []
          }
        },
        portions: []
      }
    ]
  },
  webResource: {
    __typename: 'Link',
    text: 'Mock Client',
    url: 'http://localhost:3000/platform/staff/clients/10000'
  },
  billingAddress: '25439 Kyra Mission',
  billingName: 'Melissa Gulgowski',
  billingCity: 'Loritachester',
  billingZip: '04986-3362',
  billingState: 'SC',
  billingCountry: {
    __typename: 'Country',
    name: 'United States'
  },
  billingPhone: '+12015550123',
  billingNotes: `This is a short note.
  With multiline render.
  `,
  businessType: 'Small business',
  fullName: 'Casper, Johnson and Larkin',
  jobTemplate: null,
  netTerms: 10,
  enterprise: false,
  collectionSpeed: null,
  notifyAboutNewInvoices: true,
  autoAllocateMemos: true,
  attachTimesheetsToInvoices: true,
  autoConsolidateInvoices: true,
  investmentGrade: true,
  invoices: { totalCount: 0, __typename: 'ClientInvoiceConnection' },
  commitmentSettings: {
    __typename: 'CommitmentSettings',
    minimumHours: 5
  },
  operations: {
    updateBillingNotes: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    updateClientAttachTimesheetsToInvoices: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    updateClientAutoAllocateMemos: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    updateClientAutoConsolidateInvoices: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    updateClientBillingAddress: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    updateClientCommitment: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    updateClientNetTerms: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    updateClientCollectionSpeed: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['Company is not an enterprise'],
      __typename: 'Operation'
    },
    updateClientNotifyAboutNewInvoices: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    updateClientInvestmentGrade: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    refundClientCreditBalance: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    downloadClientBillingReport: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    createJobTemplate: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    __typename: 'ClientOperations'
  },
  paymentOptions: {
    viewLink: {
      text: '★ Bank Wire',
      url: 'https://staging.toptal.net/platform/staff/companies/110568/payment_methods',
      __typename: 'Link'
    },
    nodes: [
      {
        paymentMethod: PaymentOptionPaymentMethod.TOPTAL_PAYMENTS,
        placeholder: false,
        preferred: true,
        accountInfo: []
      }
    ],
    __typename: 'PaymentOptionsConnection'
  }
}
