import { gql } from '@apollo/client'

import { billingCycleItemFragment } from '../../__fragments__/billingCycleItemFragment.graphql'

export default gql`
  query GetBillingCyclesWithTimesheets($engagementId: ID!) {
    billingCyclesWithTimesheets(engagementId: $engagementId) {
      ...BillingCycleItemFragment
    }
  }

  ${billingCycleItemFragment}
`
