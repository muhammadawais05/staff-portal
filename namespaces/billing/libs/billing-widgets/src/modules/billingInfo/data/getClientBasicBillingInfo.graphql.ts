import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export default gql`
  query GetClientBasicBillingInfo($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        unappliedCashBalance
        availablePrepaymentBalanceNullable
        operations {
          refundClientCreditBalance {
            ...OperationItem
          }
        }
        paymentOptions: paymentOptionsNullable {
          viewLink {
            ...WebResourceFragment
          }
          manageLink {
            ...WebResourceFragment
          }
          viewLink {
            ...WebResourceFragment
          }
          nodes {
            accountInfo {
              label
              value
            }
            paymentMethod
            placeholder
            preferred
          }
        }
        unallocatedMemorandums {
          totalAmount
          webResource {
            ...WebResourceFragment
          }
        }
      }
    }

    viewer {
      permits {
        canViewPaymentOptions
      }
    }
  }

  ${operationItemFragment}
  ${webResourceFragment}
`
