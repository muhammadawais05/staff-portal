import { gql } from '@apollo/client'

export default gql`
  mutation SetRollbackTransfer($input: RollbackInvoiceTransferInput!) {
    rollbackInvoiceTransfer(input: $input) {
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
        ...UserErrorFragment
      }
    }
  }
`
