import { gql } from '@apollo/client'

import { invoiceMutationFragment } from '../../__fragments__/invoiceMutationFragment.graphql'

export default gql`
  mutation SetDisputeTalentPayments($input: DisputeTalentPaymentsInput!) {
    disputeTalentPayments(input: $input) {
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
