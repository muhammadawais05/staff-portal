import { gql } from '@apollo/client'

export default gql`
  mutation CreateTransferInvoice($input: CreateTransferInvoiceInput!) {
    createTransferInvoice(input: $input) {
      success
      errors {
        code
        key
        message
      }
      invoice {
        id
      }
    }
  }
`
