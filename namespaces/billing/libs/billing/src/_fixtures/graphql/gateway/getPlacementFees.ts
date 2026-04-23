import faker from 'faker/locale/en'

export default {
  data: {
    node: {
      id: 'VjEtRW5nYWdlbWVudC0xODk3MTY',
      placementFees: {
        operations: {
          createAndConfirmPlacementFee: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'PlacementFeeOperations'
        },
        nodes: [
          {
            invoice: {
              id: 'VjEtSW52b2ljZS01NTc1MDU',
              amount: '77.0',
              gid: 'platform/staff/invoices/557505',
              billingCycleGid: 'platform/staff/invoices/557505',
              documentNumber: '557505',
              description:
                'Placement fee for Hye Stracke for Chief Solutions Developer (169386).',
              status: 'OVERDUE',
              dueDate: '2021-07-14',
              url: 'https://staging.toptal.net/platform/staff/invoices/557505',
              paidAmount: '0',
              creditedAmount: '0',
              debitedAmount: '0',
              subjectObject: {
                fullName: 'Jacobs, Nikolaus and Leuschke',
                __typename: 'Client',
                id: faker.datatype.uuid()
              },
              __typename: 'Invoice',
              webResource: {
                text: 'Invoice #557505',
                url: 'https://staging.toptal.net/platform/staff/invoices/557505',
                __typename: 'Link'
              }
            },
            commissions: {
              nodes: [],
              __typename: 'CommissionConnection'
            },
            __typename: 'PlacementFee'
          }
        ],
        placementFeeTotals: {
          creditTalent: null,
          creditCompany: '0.0',
          creditCommissions: '0',
          debitTalent: null,
          debitCompany: '0.0',
          debitCommissions: '0',
          paidTalent: null,
          paidCompany: '0.0',
          paidCommissions: '0.0',
          __typename: 'Totals'
        },
        __typename: 'PlacementFeeConnection'
      },
      __typename: 'Engagement'
    }
  }
}
