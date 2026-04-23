import { gql } from '@apollo/client'

import { billingCyclesItemFragment } from '../../__fragments__/billingCyclesFragment.graphql'
import {
  extraExpensePlacementFeeItemInvoiceFragment,
  extraExpensePlacementFeeItemCommissionFragment,
  extraExpensePlacementFeeItemPaymentFragment
} from '../../__fragments__/extraExpensePlacementFeeFragment.graphql'

export default gql`
  query GetBillingCycles($id: ID!, $engagementGid: GID!) {
    node(id: $id) {
      ... on Engagement {
        id
        billingCycles(sort: { order: DESC, target: START_DATE }) {
          nodes {
            ...BillingCyclesItemFragment
          }
        }
      }
    }

    engagementDocuments(engagementGid: $engagementGid) {
      ...EngagementDocuments
    }
  }

  fragment EngagementDocuments on BillingEngagementDocuments {
    invoices {
      kind
      ...ExtraExpensePlacementFeeItemInvoiceFragment
      consolidatedDocument {
        ...ExtraExpensePlacementFeeItemInvoiceFragment
      }
    }
    payments {
      extraHours
      ...ExtraExpensePlacementFeeItemPaymentFragment
    }
    commissions {
      extraHours
      ...ExtraExpensePlacementFeeItemCommissionFragment
    }
  }

  ${billingCyclesItemFragment}

  ${extraExpensePlacementFeeItemInvoiceFragment}
  ${extraExpensePlacementFeeItemCommissionFragment}
  ${extraExpensePlacementFeeItemPaymentFragment}
`
