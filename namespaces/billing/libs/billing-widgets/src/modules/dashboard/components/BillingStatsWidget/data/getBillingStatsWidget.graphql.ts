import { gql } from '@apollo/client'

export const GET_BILLING_STATS_WIDGET = gql`
  query GetBillingStatsWidget {
    widgets {
      billingStats {
        invoicesTotals {
          amount
          category
        }
        paymentsTotals {
          amount
          category
        }
        billingMethods {
          count
          billingMethod
        }
      }
    }
  }
`
