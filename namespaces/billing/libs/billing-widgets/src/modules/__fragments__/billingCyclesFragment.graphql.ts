import { gql } from '@apollo/client'

import { commitmentFragment } from './commitmentFragment.graphql'

export const billingCyclesItemFragment = gql`
  fragment BillingCyclesItemFragment on BillingCycle {
    gid
    kind
    startDate
    endDate
    hours
    chargedHours
    extraHours
    status
    actualCommitment {
      ...CommitmentFragment
    }
    originalCommitment {
      ...CommitmentFragment
    }
  }

  ${commitmentFragment}
`
