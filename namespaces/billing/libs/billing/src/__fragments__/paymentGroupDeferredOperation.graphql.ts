import { gql } from '@apollo/client'

import { webResourceFragment } from './webResourceFragment.graphql'
import { operationItemFragment } from './operationItemFragment.graphql'

export const paymentGroupDeferredOperation = gql`
  fragment PaymentGroupDeferredOperationFragment on PaymentGroup {
    id
    operations {
      cancelPaymentGroup {
        ...OperationItem
      }
    }
    webResource {
      ...WebResourceFragment
    }
  }

  ${operationItemFragment}
  ${webResourceFragment}
`
