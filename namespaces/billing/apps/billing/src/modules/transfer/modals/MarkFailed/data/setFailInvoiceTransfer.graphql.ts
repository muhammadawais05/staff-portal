import { gql } from '@apollo/client'

import transferItem from '../../../../__fragments__/transferFragment.graphql'

export default gql`
  mutation SetMarkFailedInvoiceTransfer($input: FailTransferInput!) {
    failInvoiceTransfer(input: $input) {
      invoice {
        id
        transfers {
          nodes {
            ...TransferFragment
          }
        }
      }
      notice
      success
      errors {
        message
        code
        key
      }
    }
  }

  ${transferItem}
`
