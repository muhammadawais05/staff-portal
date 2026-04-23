import { gql } from '@apollo/client'

export default gql`
  mutation SetConsolidateInvoice($input: ConsolidateInvoicesInput!) {
    consolidateInvoices(input: $input) {
      invoice {
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
