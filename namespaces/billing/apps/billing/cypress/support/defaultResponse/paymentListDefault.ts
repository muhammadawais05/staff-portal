import { omit, pick } from 'lodash-es'
import fixtures from '@staff-portal/billing/src/_fixtures'

import paymentMutations from './paymentListMutations'

export default {
  ...paymentMutations,
  GetRoles: {
    data: {
      payeeRoles: ['designer', 'developer', 'leader']
    }
  },
  GetOperations: {
    data: pick(fixtures.MockPayment, [
      'id',
      'downloadHtmlUrl',
      'downloadPdfUrl',
      'documentNumber',
      'operations',
      'webResource'
    ])
  },
  GetKipperToken: {
    data: { viewer: { tokens: { charts: 'chart_token' } } }
  },
  // rest stub url
  'cypress.stubbed.fetch/kipper/api/v1/chart.json?kpi=financials_early_payments&rule_id=':
    {
      data: {}
    },
  GetPaymentsGrandTotals: {
    data: {
      payments: {
        ...omit(fixtures.MockPaymentList.payments, 'groups'),
        totalCount: 50
      }
    }
  },
  GetMultiplePaymentsList: {
    data: {
      payments: {
        ...fixtures.MockPaymentList.payments,
        nodes: fixtures.MockPaymentList.payments.groups[0].payments.flatMap(
          payment => payment
        )
      }
    }
  },
  GetPaymentsList: {
    data: fixtures.MockPaymentList
  },
  GetPaymentsListHeader: {
    data: fixtures.MockGetPaymentListHeaderActions
  },
  GetPaymentsMonthlyTotals: {
    data: {
      payments: {
        __typename: 'PaymentsConnection',
        operations:
          fixtures.MockGetPaymentListHeaderActions.payments.operations,
        groups: [
          {
            __typename: 'PaymentsGroup',
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
        ]
      }
    }
  },
  QueryAutocomplete: {
    data: fixtures.MockAutocompleteSearchResultsInvoiceListTalents
  }
}
