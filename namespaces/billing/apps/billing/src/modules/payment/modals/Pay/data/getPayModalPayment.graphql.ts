import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'
import { payPaymentSubject } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentPaySubject.graphql'

export default gql`
  query GetPayModalPayment($id: ID!) {
    node(id: $id) {
      ... on Payment {
        balanceDue
        documentNumber
        eligibleForPay
        id
        operations {
          applyUnallocatedMemorandumsToCommercialDocument {
            ...OperationItem
          }
          payPayment {
            ...OperationItem
          }
        }
        status
        subject {
          ...PaymentPaySubject
        }
      }
    }
  }

  ${operationItemFragment}
  ${payPaymentSubject}
`
