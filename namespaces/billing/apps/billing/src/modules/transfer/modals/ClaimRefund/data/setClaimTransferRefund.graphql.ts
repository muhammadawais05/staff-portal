import { gql } from '@apollo/client'

import transferItem from '../../../../__fragments__/transferFragment.graphql'

export default gql`
  mutation SetClaimTransferRefund($input: ClaimTransferRefundInput!) {
    claimTransferRefund(input: $input) {
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
