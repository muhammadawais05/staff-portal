import { gql } from '@apollo/client'

export default gql`
  mutation UpdateJobAttachTimesheetsToInvoices(
    $input: UpdateJobAttachTimesheetsToInvoicesInput!
  ) {
    updateJobAttachTimesheetsToInvoices(input: $input) {
      job {
        id
        attachTimesheetsToInvoices
      }
      errors {
        ...UserErrorFragment
      }
      notice
      success
    }
  }
`
