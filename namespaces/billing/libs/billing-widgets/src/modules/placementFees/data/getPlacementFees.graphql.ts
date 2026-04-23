import { gql } from '@apollo/client'

import { totalsFragment } from '../../__fragments__/totalsFragment.graphql'
import {
  extraExpensePlacementFeeItemInvoiceFragment,
  extraExpensePlacementFeeItemCommissionFragment
} from '../../__fragments__/extraExpensePlacementFeeFragment.graphql'

export default gql`
  query GetPlacementFees($id: ID!) {
    node(id: $id) {
      ... on Engagement {
        id
        # Temporary rename
        # https://github.com/toptal/platform/pull/45734
        placementFees: placementFeesNullable {
          ...PlacementFeeConnection
        }
      }
    }
  }

  fragment PlacementFeeConnection on PlacementFeeConnection {
    operations {
      createAndConfirmPlacementFee {
        ...OperationItem
      }
    }
    nodes {
      ...PlacementFeeItem
    }
    placementFeeTotals {
      ...TotalsFragment
    }
  }

  fragment PlacementFeeItem on PlacementFee {
    invoice {
      ...ExtraExpensePlacementFeeItemInvoiceFragment
    }
    commissions {
      nodes {
        ...ExtraExpensePlacementFeeItemCommissionFragment
      }
    }
  }

  ${totalsFragment}
  ${extraExpensePlacementFeeItemInvoiceFragment}
  ${extraExpensePlacementFeeItemCommissionFragment}
`
