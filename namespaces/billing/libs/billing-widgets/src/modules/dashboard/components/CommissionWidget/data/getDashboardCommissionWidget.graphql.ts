import { gql } from '@apollo/client'

export const CommissionWidgetMonths = gql`
  fragment CommissionWidgetMonthsFragment on CommissionsWidgetMonth {
    year
    month
    amount
  }
`

export default gql`
  query GetDashboardCommissionWidgetQuery {
    widgets {
      commissions {
        months {
          ...CommissionWidgetMonthsFragment
        }
        totalAmount
      }
    }
  }

  ${CommissionWidgetMonths}
`
