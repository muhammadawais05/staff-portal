import { gql } from '@staff-portal/data-layer-service'

export default gql`
  mutation CreateClientServiceInvoice(
    $input: CreateClientServiceInvoiceInput!
  ) {
    createClientServiceInvoice(input: $input) {
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
