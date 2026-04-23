import faker from 'faker/locale/en'

export default {
  __typename: 'ExtraExpenseConnection',
  extraExpenseTotals: {
    __typename: 'Totals',
    creditCommissions: '0',
    creditCompany: '0.0',
    creditTalent: '0.0',
    debitCommissions: '0.0',
    debitCompany: '0.0',
    debitTalent: '0.0',
    paidCommissions: '0.0',
    paidCompany: '120.25',
    paidTalent: '110.25'
  },
  nodes: [
    {
      __typename: 'ExtraExpense',
      commissions: { __typename: 'CommissionConnection', nodes: [] },
      invoice: {
        __typename: 'Invoice',
        billingCycleGid: faker.random.alphaNumeric(10),
        documentNumber: faker.datatype.number(),
        id: 'VjEtSW52b2ljZS0zODIwMDU',
        amount: '11111.0',
        creditedAmount: '0',
        debitedAmount: '0',
        description: 'Some description here',
        dueDate: '2020-02-29',
        gid: 'gid://platform/Invoice/382005',
        paidAmount: '0',
        status: 'OUTSTANDING',
        subjectObject: {
          __typename: 'Client',
          id: faker.random.alphaNumeric(10),
          billingNotes: '',
          fullName: 'Leuschke-Berge ZN'
        },
        url: 'http://localhost:3000/platform/staff/invoices/382005',
        webResource: {
          text: 'Invoice #382005',
          url: 'http://localhost:3000/platform/staff/invoices/382005',
          __typename: 'Link'
        }
      },
      payments: {
        __typename: 'CommercialDocumentConnection',
        nodes: [
          {
            __typename: 'Payment',
            billingCycleGid: faker.datatype.string(),
            documentNumber: faker.datatype.number(),
            id: 'VjEtUGF5bWVudC05NTQ5MjE',
            amount: '1111.0',
            creditedAmount: '0',
            debitedAmount: '0',
            description: 'Outstanding description',
            dueDate: '2020-02-19',
            gid: 'gid://platform/Payment/954921',
            paidAmount: '0',
            status: 'OUTSTANDING',
            subjectObject: {
              __typename: 'Client',
              id: faker.random.alphaNumeric(10),
              billingNotes: '',
              fullName: 'Rich Grimes'
            },
            url: 'http://localhost:3000/platform/staff/payments/954921',
            webResource: {
              text: 'Notice of Payment #954921',
              url: 'http://localhost:3000/platform/staff/payments/954921',
              __typename: 'Link'
            }
          }
        ]
      }
    },
    {
      __typename: 'ExtraExpense',
      commissions: { __typename: 'CommissionConnection', nodes: [] },
      invoice: {
        __typename: 'Invoice',
        billingCycleGid: faker.random.alphaNumeric(10),
        documentNumber: faker.datatype.number(),
        id: 'VjEtSW52b2ljZS0zODIwMDY',
        amount: '100.0',
        creditedAmount: '0',
        debitedAmount: '0',
        description: 'Some description',
        dueDate: '2020-03-09',
        gid: 'gid://platform/Invoice/382006',
        paidAmount: '0',
        status: 'OUTSTANDING',
        subjectObject: {
          __typename: 'Client',
          id: faker.random.alphaNumeric(10),
          billingNotes: '',
          fullName: 'Leuschke-Berge ZN'
        },
        url: 'http://localhost:3000/platform/staff/invoices/382006',
        webResource: {
          text: 'Invoice #382006',
          url: 'http://localhost:3000/platform/staff/invoices/382006',
          __typename: 'Link'
        }
      },
      payments: {
        __typename: 'CommercialDocumentConnection',
        nodes: [
          {
            __typename: 'Payment',
            billingCycleGid: faker.datatype.string(),
            documentNumber: faker.datatype.number(),
            id: 'VjEtUGF5bWVudC05NTQ5MjI',
            amount: '500.0',
            creditedAmount: '0',
            debitedAmount: '0',
            description: 'Outstanding description',
            dueDate: '2020-02-19',
            gid: 'gid://platform/Payment/954922',
            paidAmount: '0',
            status: 'OUTSTANDING',
            subjectObject: {
              __typename: 'Client',
              id: faker.random.alphaNumeric(10),
              billingNotes: '',
              fullName: 'Rich Grimes'
            },
            url: 'http://localhost:3000/platform/staff/payments/954922',
            webResource: {
              text: 'Notice of Payment #954922',
              url: 'http://localhost:3000/platform/staff/payments/954922',
              __typename: 'Link'
            }
          }
        ]
      }
    }
  ],
  operations: {
    __typename: 'ExtraExpenseOperations',
    createExtraExpenses: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    }
  }
}
