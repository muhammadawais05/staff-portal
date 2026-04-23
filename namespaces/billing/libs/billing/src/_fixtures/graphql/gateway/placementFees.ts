import faker from 'faker/locale/en'

export default {
  __typename: 'PlacementFeeConnection',
  nodes: [
    {
      __typename: 'PlacementFee',
      commissions: {
        __typename: 'CommissionConnection',
        nodes: [
          {
            id: '1127377',
            documentNumber: '1127377',
            gid: 'platform/staff/payments/1127377',
            billingCycleGid: 'platform/staff/payments/1127377',
            creditedAmount: '0',
            debitedAmount: '0',
            paidAmount: '0',
            amount: '300.0',
            dueDate: '',
            url: 'http://localhost:3000/platform/staff/payments/1127377',
            webResource: {
              text: 'Notice of Payment #1127377',
              url: 'http://localhost:3000/platform/staff/payments/1127377',
              __typename: 'Link'
            },
            description:
              'Commission for engagement Jack Kwok with Overjet for their services on Python and Machine learning engineer [USA and Canada].',
            status: 'OVERDUE',
            subjectObject: {
              fullName: 'Bruno Carvalho',
              id: faker.random.alphaNumeric(10),
              __typename: 'Staff'
            },
            __typename: 'Payment'
          }
        ]
      },
      invoice: {
        __typename: 'Invoice',
        gid: faker.random.alphaNumeric(10),
        billingCycleGid: faker.random.alphaNumeric(10),
        documentNumber: faker.datatype.number(),
        amount: '45820.0',
        creditedAmount: '0',
        debitedAmount: '0',
        description:
          "1/2 of placement fee for Cesar O'Keefe for [Enterprise] Full-stack Phoenix/Elixir developer.",
        dueDate: '2020-01-30',
        id: '382006',
        paidAmount: '0',
        status: 'OVERDUE',
        subjectObject: {
          __typename: 'Client',
          id: faker.random.alphaNumeric(10),
          billingNotes: '',
          fullName: 'Feeney, Weimann and Fadel'
        },
        url: 'http://localhost:3000/platform/staff/invoices/382006',
        webResource: {
          text: 'Invoice #382006',
          url: 'http://localhost:3000/platform/staff/invoices/382006',
          __typename: 'Link'
        }
      }
    },
    {
      __typename: 'PlacementFee',
      commissions: { __typename: 'CommissionConnection', nodes: [] },
      invoice: {
        __typename: 'Invoice',
        gid: faker.random.alphaNumeric(10),
        billingCycleGid: faker.random.alphaNumeric(10),
        documentNumber: faker.datatype.number(),
        amount: '95125.0',
        creditedAmount: '0',
        debitedAmount: '0',
        description:
          "1/2 of placement fee for Cesar O'Keefe for [Enterprise] Full-stack Phoenix/Elixir developer.",
        dueDate: '2020-02-29',
        id: '382007',
        paidAmount: '0',
        status: 'OUTSTANDING',
        subjectObject: {
          __typename: 'Client',
          id: faker.random.alphaNumeric(10),
          billingNotes: '',
          fullName: 'Feeney, Weimann and Fadel'
        },
        url: 'http://localhost:3000/platform/staff/invoices/382007',
        webResource: {
          text: 'Invoice #382007',
          url: 'http://localhost:3000/platform/staff/invoices/382007',
          __typename: 'Link'
        }
      }
    }
  ],
  operations: {
    __typename: 'PlacementFeeOperations',
    createAndConfirmPlacementFee: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    }
  },
  placementFeeTotals: {
    __typename: 'Totals',
    creditCommissions: '0',
    creditCompany: '0.0',
    creditTalent: null,
    debitCommissions: '0',
    debitCompany: '0.0',
    debitTalent: null,
    paidCommissions: '0.0',
    paidCompany: '0.0',
    paidTalent: null
  }
}
