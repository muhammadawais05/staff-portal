import { gql } from '@apollo/client'

export default gql`
  mutation SetCreateEngagementExtraExpenses(
    $input: CreateEngagementExtraExpensesInput!
  ) {
    createEngagementExtraExpenses(input: $input) {
      extraExpense {
        commissions {
          nodes {
            gid
            id
            amount
            paidAmount
          }
        }
        invoice {
          gid
          id
          paidAmount
          amount
        }
        payments {
          nodes {
            gid
            id
            amount
            paidAmount
          }
        }
      }
      success
      errors {
        code
        key
        message
      }
    }
  }
`
