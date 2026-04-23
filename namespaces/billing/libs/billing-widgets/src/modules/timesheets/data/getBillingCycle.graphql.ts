import { gql } from '@apollo/client'

import { billingCycleItemFragment } from '../../__fragments__/billingCycleItemFragment.graphql'

export default gql`
  query GetBillingCycle($billingCycleId: ID!) {
    billingCycle(billingCycleId: $billingCycleId) {
      ...BillingCycleItemFragment
    }
  }

  ${billingCycleItemFragment}
`
