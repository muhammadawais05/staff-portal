import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export const transferOperations = gql`
  fragment TransferOperations on Transfer {
    operations {
      cancelTransfer {
        ...OperationItem
      }
      claimTransferRefund {
        ...OperationItem
      }
      failTransfer {
        ...OperationItem
      }
      payTransfer {
        ...OperationItem
      }
      postponeTransfer {
        ...OperationItem
      }
      rollbackTransfer {
        ...OperationItem
      }
    }
  }
  ${operationItemFragment}
`
