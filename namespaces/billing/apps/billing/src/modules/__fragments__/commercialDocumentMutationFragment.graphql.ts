import { gql } from '@apollo/client'
import { paymentMutationFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentMutationFragment.graphql'

import { invoiceMutationFragment } from './invoiceMutationFragment.graphql'

export const commercialDocumentMutationFragment = gql`
  fragment CommercialDocumentMutationFragment on CommercialDocument {
    ... on Invoice {
      ...InvoiceMutationFragment
    }
    ... on Payment {
      ...PaymentMutationFragment
    }
  }

  ${invoiceMutationFragment}
  ${paymentMutationFragment}
`
