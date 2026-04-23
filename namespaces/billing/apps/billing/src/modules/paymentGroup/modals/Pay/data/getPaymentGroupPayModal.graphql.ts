import { gql } from '@apollo/client'
import { payPaymentSubject } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentPaySubject.graphql'

import { paymentGroupOperationsFragment } from '../../../../__fragments__/paymentGroupOperationsFragment.graphql'

export default gql`
  query GetPaymentGroupPayModal($id: ID!) {
    node(id: $id) {
      ... on PaymentGroup {
        id
        eligibleForPay
        number
        amount
        status
        subject {
          ...PaymentPaySubject
        }
        ...PaymentGroupOperationsFragment
        payments {
          groups {
            payments {
              id
              status
            }
          }
        }
      }
    }
  }

  ${payPaymentSubject}
  ${paymentGroupOperationsFragment}
`
