import { gql } from '@apollo/client'

import { userErrorFragment } from '../../__fragments__/userErrorFragment.graphql'

export default gql`
  mutation SetUpdateClientNotifyAboutNewInvoices(
    $input: UpdateClientNotifyAboutNewInvoicesInput!
  ) {
    updateClientNotifyAboutNewInvoices(input: $input) {
      errors {
        ...UserErrorFragment
      }
      success
      client {
        id
        notifyAboutNewInvoices
      }
    }
  }

  ${userErrorFragment}
`
