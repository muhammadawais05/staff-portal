import { gql } from '@apollo/client'

import { invoiceMutationFragment } from '../../../../__fragments__/invoiceMutationFragment.graphql'

export default gql`
  mutation SetUpdateDispute($input: UpdateDisputeInput!) {
    updateDispute(input: $input) {
      invoice {
        ...InvoiceMutationFragment
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
`
