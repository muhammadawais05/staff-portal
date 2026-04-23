export const getBillingStatsWidgetResponse = () => ({
  data: {
    widgets: {
      billingStats: {
        invoicesTotals: [
          {
            amount: '5886210.12',
            category: 'DRAFT',
            __typename: 'BillingStatsWidgetInvoicesTotalsEntry'
          },
          {
            amount: '267744228.58',
            category: 'OUTSTANDING',
            __typename: 'BillingStatsWidgetInvoicesTotalsEntry'
          },
          {
            amount: '26355308.27',
            category: 'OVERDUE',
            __typename: 'BillingStatsWidgetInvoicesTotalsEntry'
          },
          {
            amount: '101778.2',
            category: 'DISPUTED',
            __typename: 'BillingStatsWidgetInvoicesTotalsEntry'
          },
          {
            amount: '909347.57',
            category: 'IN_COLLECTIONS',
            __typename: 'BillingStatsWidgetInvoicesTotalsEntry'
          },
          {
            amount: '4015250.46',
            category: 'WRITTEN_OFF',
            __typename: 'BillingStatsWidgetInvoicesTotalsEntry'
          },
          {
            amount: '5874611.04',
            category: 'PENDING_RECEIPT',
            __typename: 'BillingStatsWidgetInvoicesTotalsEntry'
          },
          {
            amount: '131735553.85',
            category: 'CREDITED',
            __typename: 'BillingStatsWidgetInvoicesTotalsEntry'
          },
          {
            amount: '1497145460.04',
            category: 'PAID',
            __typename: 'BillingStatsWidgetInvoicesTotalsEntry'
          }
        ],
        paymentsTotals: [
          {
            amount: '20812168.29',
            category: 'OUTSTANDING',
            __typename: 'BillingStatsWidgetPaymentsTotalsEntry'
          },
          {
            amount: '24591.83',
            category: 'DUE',
            __typename: 'BillingStatsWidgetPaymentsTotalsEntry'
          },
          {
            amount: '926391.78',
            category: 'OVERDUE',
            __typename: 'BillingStatsWidgetPaymentsTotalsEntry'
          },
          {
            amount: '12180.0',
            category: 'ON_HOLD',
            __typename: 'BillingStatsWidgetPaymentsTotalsEntry'
          },
          {
            amount: '109898.91',
            category: 'DISPUTED',
            __typename: 'BillingStatsWidgetPaymentsTotalsEntry'
          },
          {
            amount: '12428109.01',
            category: 'DEBITED',
            __typename: 'BillingStatsWidgetPaymentsTotalsEntry'
          },
          {
            amount: '986637685.35',
            category: 'PAID',
            __typename: 'BillingStatsWidgetPaymentsTotalsEntry'
          }
        ],
        billingMethods: [
          {
            count: 7406,
            billingMethod: 'ACH',
            __typename: 'BillingStatsWidgetBillingMethodsEntry'
          },
          {
            count: 36363,
            billingMethod: 'CREDIT_CARD',
            __typename: 'BillingStatsWidgetBillingMethodsEntry'
          },
          {
            count: 1183,
            billingMethod: 'PAYPAL',
            __typename: 'BillingStatsWidgetBillingMethodsEntry'
          },
          {
            count: 1521,
            billingMethod: 'WIRE',
            __typename: 'BillingStatsWidgetBillingMethodsEntry'
          }
        ],
        __typename: 'BillingStatsWidget'
      },
      __typename: 'Widgets'
    }
  }
})
