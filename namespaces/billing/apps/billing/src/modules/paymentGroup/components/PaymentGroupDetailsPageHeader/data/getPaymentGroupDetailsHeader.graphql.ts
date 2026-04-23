import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

import { paymentGroupOperationsFragment } from '../../../../__fragments__/paymentGroupOperationsFragment.graphql'

export default gql`
  query GetPaymentGroupDetailsHeader($paymentGroupId: ID!) {
    node(id: $paymentGroupId) {
      ... on PaymentGroup {
        id
        gid
        number
        ...PaymentGroupOperationsFragment
        historyLink {
          url
        }
        status
        webResource {
          ...WebResourceFragment
        }
      }
    }
  }

  ${paymentGroupOperationsFragment}
  ${webResourceFragment}
`
