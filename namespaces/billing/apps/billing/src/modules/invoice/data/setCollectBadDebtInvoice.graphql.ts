import { gql } from '@apollo/client'

import { invoiceMutationFragment } from '../../__fragments__/invoiceMutationFragment.graphql'

export default gql`
  mutation SetCollectBadDebtInvoice($input: CollectBadDebtInvoiceInput!) {
    collectBadDebtInvoice(input: $input) {
      invoice {
        ...InvoiceMutationFragment
      }
      notice
      success
      errors {
        key
        message
        code
      }
    }
  }

  ${invoiceMutationFragment}
`
