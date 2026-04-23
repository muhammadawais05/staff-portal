import { gql } from '@apollo/client'

import { expectedCommissionFragment } from '../../__fragments__/expectedCommissionFragment.graphql'

export default gql`
  query GetExpectedCommissionsTotals(
    $pagination: OffsetPagination!
    $filter: ExpectedCommissionsFilter!
  ) {
    expectedCommissions(pagination: $pagination, filter: $filter) {
      totalCount
      groups {
        month
        year
        totals {
          amount
        }
      }
    }
  }

  ${expectedCommissionFragment}
`
