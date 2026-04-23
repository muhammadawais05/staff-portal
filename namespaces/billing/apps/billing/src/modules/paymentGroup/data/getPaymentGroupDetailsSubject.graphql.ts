import { gql } from '@apollo/client'
import { paymentSubjectNameFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentSubjectNameFragment.graphql'
import { paymentWebResourceFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentWebResourceFragment.graphql'

export default gql`
  query GetPaymentGroupDetailsSubject($nodeId: ID!) {
    node(id: $nodeId) {
      ... on PaymentGroup {
        id
        subject {
          ...PaymentSubjectNameFragment
          ...PaymentWebResourceFragment
        }
      }
    }
  }

  ${paymentSubjectNameFragment}
  ${paymentWebResourceFragment}
`
