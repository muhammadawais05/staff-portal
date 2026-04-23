import { gql } from '@apollo/client'
import { paymentMutationFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentMutationFragment.graphql'

import { invoiceMutationFragment } from '../../../../__fragments__/invoiceMutationFragment.graphql'

export default gql`
  mutation SetDispute($input: DisputeCommercialDocumentInput!) {
    disputeCommercialDocument(input: $input) {
      commercialDocument {
        id
        ... on Invoice {
          ...InvoiceMutationFragment
        }
        ... on Payment {
          ...PaymentMutationFragment
        }
      }
      notice
      success
      errors {
        code
        key
        message
      }
    }
  }

  ${invoiceMutationFragment}
  ${paymentMutationFragment}
`
