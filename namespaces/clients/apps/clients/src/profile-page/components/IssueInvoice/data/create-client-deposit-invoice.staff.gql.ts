import { gql } from '@staff-portal/data-layer-service'

export default gql`
  mutation CreateClientDepositInvoice(
    $input: CreateClientDepositInvoiceInput!
  ) {
    createClientDepositInvoice(input: $input) {
      client {
        id
      }
      success
      errors {
        code
        key
        message
      }
    }
  }
`
