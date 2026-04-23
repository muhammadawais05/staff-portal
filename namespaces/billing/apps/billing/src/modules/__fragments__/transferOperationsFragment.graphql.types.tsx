/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { OperationItemFragment } from '../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { OperationItemFragmentDoc } from '../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
export type TransferOperationsFragment = {
  operations: {
    cancelTransfer: OperationItemFragment
    claimTransferRefund: OperationItemFragment
    failTransfer: OperationItemFragment
    payTransfer: OperationItemFragment
    postponeTransfer: OperationItemFragment
    rollbackTransfer: OperationItemFragment
  }
}

export const TransferOperationsFragmentDoc = gql`
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
  ${OperationItemFragmentDoc}
`
