import { gql } from '@apollo/client'

import { expectedCommissionFragment } from '../../__fragments__/expectedCommissionFragment.graphql'

export default gql`
  query GetExpectedCommissionsList(
    $pagination: OffsetPagination!
    $filter: ExpectedCommissionsFilter!
  ) {
    expectedCommissions(pagination: $pagination, filter: $filter) {
      totalCount
      groups {
        month
        year
        expectedCommissions {
          ...ExpectedCommissionFragment
        }
      }
    }
  }

  ${expectedCommissionFragment}
`
