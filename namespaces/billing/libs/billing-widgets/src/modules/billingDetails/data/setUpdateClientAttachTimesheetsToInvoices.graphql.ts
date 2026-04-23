import { gql } from '@apollo/client'

import { userErrorFragment } from '../../__fragments__/userErrorFragment.graphql'

export default gql`
  mutation SetUpdateClientAttachTimesheetsToInvoices(
    $input: UpdateClientAttachTimesheetsToInvoicesInput!
  ) {
    updateClientAttachTimesheetsToInvoices(input: $input) {
      errors {
        ...UserErrorFragment
      }
      success
      client {
        id
        attachTimesheetsToInvoices
      }
    }
  }

  ${userErrorFragment}
`
