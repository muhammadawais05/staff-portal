import { gql } from '@apollo/client'

import {
  extraExpensePlacementFeeItemInvoiceFragment,
  extraExpensePlacementFeeItemCommissionFragment,
  extraExpensePlacementFeeItemPaymentFragment
} from '../../__fragments__/extraExpensePlacementFeeFragment.graphql'
import { totalsFragment } from '../../__fragments__/totalsFragment.graphql'

export default gql`
  query GetExtraExpenses($id: ID!) {
    node(id: $id) {
      ... on Engagement {
        id
        # Temporary rename
        # https://github.com/toptal/platform/pull/45426/files
        extraExpenses: extraExpensesNullable {
          ...ExtraExpenseConnection
        }
      }
    }
  }

  fragment ExtraExpenseConnection on ExtraExpenseConnection {
    operations {
      createExtraExpenses {
        ...OperationItem
      }
    }
    nodes {
      ...ExtraExpenseItem
    }
    extraExpenseTotals {
      ...TotalsFragment
    }
  }

  fragment ExtraExpenseItem on ExtraExpense {
    invoice {
      ...ExtraExpensePlacementFeeItemInvoiceFragment
    }

    commissions {
      nodes {
        ...ExtraExpensePlacementFeeItemCommissionFragment
      }
    }

    payments {
      nodes {
        ...ExtraExpensePlacementFeeItemPaymentFragment
      }
    }
  }

  ${extraExpensePlacementFeeItemPaymentFragment}
  ${extraExpensePlacementFeeItemCommissionFragment}
  ${extraExpensePlacementFeeItemInvoiceFragment}
  ${totalsFragment}
`
