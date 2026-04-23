import mockTransfers from './getTransfers'
import mockMemorandumCategories from './memorandumCategories'

export default {
  __typename: 'Payment',
  amount: '7.71',
  balanceDue: '7.71',
  createdOn: '2020-07-21',
  paidAt: '2020-07-22',
  creditedAmount: 100.12,
  billingCycle: {
    __typename: 'BillingCycle',
    startDate: '2020-07-21',
    endDate: '2021-07-21',
    hours: '10',
    originalCommitment: {
      __typename: 'Commitment',
      availability: 'full_time'
    },
    actualCommitment: {
      __typename: 'Commitment',
      availability: 'full_time'
    }
  },
  debitedAmount: '120.21',
  eligibleForPay: true,
  extraExpenses: false,
  description:
    'Commission for screening Technical 2 Core step of Martijn Meijer for his/her services on Python Developer for Rental Platform: June 21, 2020 to July 4, 2020.',
  downloadHtmlUrl:
    'http://localhost:3000/platform/staff/payments/189716/download',
  downloadPdfUrl:
    'http://localhost:3000/platform/staff/payments/189716/download.pdf',
  dueDate: '2020-07-21',
  gid: 'gid://billing/Payment/1104428',
  id: 'VjEtUGF5bWVudC0xMTA0NDI4',
  documentNumber: 1104428,
  documentNote: 'example documentNote',
  paymentKind: 'ROLE_STEP_COMMISSION',
  paidAmount: '999.99',
  historyLink: {
    __typename: 'Link',
    url: 'example'
  },
  memorandumCategories: mockMemorandumCategories,
  memorandums: {
    nodes: []
  },
  transfers: mockTransfers,
  operations: {
    addDocumentNote: {
      callable: 'HIDDEN',
      messages: []
    },
    addMemorandumToCommercialDocument: {
      callable: 'ENABLED',
      messages: []
    },
    applyUnallocatedMemorandumsToCommercialDocument: {
      callable: 'HIDDEN',
      messages: []
    },
    cancelPayment: {
      callable: 'HIDDEN',
      messages: []
    },
    convertPaymentIntoCreditMemorandum: {
      callable: 'HIDDEN',
      messages: []
    },
    createTransferInvoice: {
      callable: 'HIDDEN',
      messages: []
    },
    disputeCommercialDocument: {
      callable: 'HIDDEN',
      messages: []
    },
    editDocumentNote: {
      callable: 'ENABLED',
      messages: []
    },
    payPayment: {
      callable: 'ENABLED',
      messages: []
    },
    resolveDisputeOfCommercialDocument: {
      callable: 'HIDDEN',
      messages: []
    },
    updateCommercialDocumentDueDate: {
      callable: 'DISABLED',
      messages: [
        'This action is only available for outstanding and overdue payments.'
      ]
    }
  },
  paymentGroupId: 'VjEtUGF5bWVudEdyb3VwLTk0Njkx',
  paymentGroup: {
    id: 'VjEtUGF5bWVudEdyb3VwLTk0Njkx',
    number: 94691,
    webResource: {
      text: 'Payment Group 94691',
      url: 'http://localhost:3000/platform/staff/payment_groups/94691'
    }
  },
  paymentMethod: 'payoneer',
  reason: {
    __typename: 'RoleStep',
    id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
    step: {
      __typename: 'Step',
      title: 'Full role step title',
      short: 'Short role step title'
    },
    roleStepTalent: {
      __typename: 'Talent',
      roleType: 'Product manager',
      fullName: 'George Aidonidis',
      id: 'VjEtVGFsZW50LTk5OQ==',
      webResource: {
        __typename: 'Link',
        text: 'George Aidonidis',
        url: 'http://localhost:3000/platform/staff/talent/999'
      }
    }
  },
  status: 'DUE',
  subject: {
    __typename: 'Staff',
    fullName: 'José Silva',
    id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
    unallocatedMemorandums: {
      __typename: 'MemorandumConnection',
      nodes: []
    },
    paymentOptions: {
      nodes: [
        {
          accountInfo: [
            {
              label: 'testLabel1',
              value: 'test value 1'
            }
          ],
          paymentMethod: 'PAYPAL',
          placeholder: false,
          preferred: false
        },
        {
          accountInfo: [
            {
              label: 'testLabel2',
              value: 'test value 2'
            }
          ],
          paymentMethod: 'ULTIPRO',
          placeholder: false,
          preferred: true
        },
        {
          accountInfo: [
            {
              label: 'testLabel3',
              value: 'test value 3'
            }
          ],
          paymentMethod: 'BANK_WIRE',
          placeholder: false,
          preferred: true
        }
      ]
    },
    webResource: {
      __typename: 'Link',
      text: 'José Silva',
      url: 'http://localhost:3000/platform/staff/staff/1455082',
      webResource: {
        __typename: 'Link',
        text: 'José Silva',
        url: 'http://localhost:3000/platform/staff/staff/1455082'
      }
    }
  },
  // leaving it in until subjectObject => subject migration is done
  subjectObject: {
    __typename: 'Staff',
    fullName: 'José Silva',
    id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
    unallocatedMemorandums: {
      __typename: 'MemorandumConnection',
      nodes: []
    },
    webResource: {
      __typename: 'Link',
      text: 'José Silva',
      url: 'http://localhost:3000/platform/staff/staff/1455082',
      webResource: {
        __typename: 'Link',
        text: 'José Silva',
        url: 'http://localhost:3000/platform/staff/staff/1455082'
      }
    }
  },
  job: {
    id: 'VjEtSm9iLTk0NDU0',
    webResource: {
      text: 'Principal Marketing Developer (94454)',
      url: 'http://localhost:3000/platform/staff/jobs/94454'
    }
  },
  client: {
    id: 'VjEtQ2xpZW50LTI5MzQz',
    fullName: 'Baumbach-Willms UK',
    webResource: {
      text: 'Baumbach-Willms UK',
      url: 'http://localhost:3000/platform/staff/companies/256814'
    }
  },
  webResource: {
    __typename: 'Link',
    text: 'Notice of Payment #1104428',
    url: 'http://localhost:3000/platform/staff/payments/1104428'
  }
}
