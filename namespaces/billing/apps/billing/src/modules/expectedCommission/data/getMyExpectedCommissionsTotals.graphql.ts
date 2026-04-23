import { gql } from '@apollo/client'

export default gql`
  query GetMyExpectedCommissionsTotals($pagination: OffsetPagination!) {
    viewer {
      expectedCommissions(pagination: $pagination) {
        totalCount
        totals {
          amount
        }
        groups {
          month
          year
          totals {
            amount
          }
        }
      }
    }
  }
`
