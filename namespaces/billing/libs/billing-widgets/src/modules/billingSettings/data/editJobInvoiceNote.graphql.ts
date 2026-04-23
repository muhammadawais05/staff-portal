import { gql } from '@apollo/client'

export default gql`
  mutation EditJobInvoiceNote($input: EditJobInvoiceNoteInput!) {
    editJobInvoiceNote(input: $input) {
      job {
        id
        invoiceNote
      }
      errors {
        code
        key
        message
      }
      notice
      success
    }
  }
`
