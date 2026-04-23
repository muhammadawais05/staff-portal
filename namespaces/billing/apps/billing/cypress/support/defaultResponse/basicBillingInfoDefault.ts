import billingPermitsQueries from './billingPermitsQueries'

export default {
  GetUnappliedCashEntries: {
    data: {
      node: {
        id: 'VjEtQ2xpZW50LTYwNjQy',
        fullName: 'Ward-Greenholt YE',
        __typename: 'Client',
        unappliedCashEntries: {
          nodes: [
            {
              __typename: 'UnappliedCash',
              id: 'VjEtVW5hcHBsaWVkQ2FzaC0xMjQ',
              amount: '1000.0',
              availableAmount: '1000.0',
              comment: 'Test-1',
              effectiveDate: '2022-04-01'
            },
            {
              __typename: 'UnappliedCash',
              id: 'VjEtVW5hcHBsaWVkQ2FzaC0xMjU',
              amount: '2000.0',
              availableAmount: '2000.0',
              comment: 'Test-2',
              effectiveDate: '2022-04-02'
            },
            {
              __typename: 'UnappliedCash',
              id: 'VjEtVW5hcHBsaWVkQ2FzaC0xMjY',
              amount: '3000.0',
              availableAmount: '3000.0',
              comment: 'Test-3',
              effectiveDate: '2022-04-03'
            }
          ]
        }
      }
    }
  },
  GetClientBasicBillingInfo: {
    ...billingPermitsQueries,
    data: {
      node: {
        id: 'VjEtQ2xpZW50LTEwNDcx',
        availablePrepaymentBalanceNullable: '500.0',
        operations: {
          refundClientCreditBalance: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'ClientOperations'
        },
        paymentOptionsNullable: {
          viewLink: {
            text: '★ Bank Wire',
            url: 'https://staging.toptal.net/platform/staff/companies/110568/payment_methods',
            __typename: 'Link'
          },
          __typename: 'PaymentOptionsConnection'
        },
        unallocatedMemorandums: {
          totalAmount: '0.0',
          webResource: {
            text: '0.0',
            url: '/platform/staff/memos?badges%5Bcompany_ids%5D=110568&status=unallocated',
            __typename: 'Link'
          },
          __typename: 'UnallocatedMemorandumConnection'
        },
        __typename: 'Client'
      },
      viewer: {
        permits: {
          canViewPaymentOptions: true
        }
      }
    }
  },
  GetRefundClientCreditBalance: {
    data: {
      node: {
        id: 'VjEtQ2xpZW50LTEwNDcx',
        availablePrepaymentBalanceNullable: '500.0',
        fullName: 'Stroman-Cormier LH',
        operations: {
          refundClientCreditBalance: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'ClientOperations'
        },
        __typename: 'Client'
      }
    }
  },
  SetRefundClientCreditBalance: {
    data: {
      refundClientCreditBalance: {
        client: {
          id: 'VjEtQ2xpZW50LTEwNDcx',
          availablePrepaymentBalanceNullable: '495.0',
          __typename: 'Client'
        },
        notice: null,
        success: true,
        errors: [],
        __typename: 'RefundClientCreditBalancePayload'
      }
    }
  }
}
