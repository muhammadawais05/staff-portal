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
export type PaymentGroupOperationsFragment = {
  operations: {
    applyUnallocatedMemorandums: OperationItemFragment
    cancelPaymentGroup: OperationItemFragment
    payPaymentGroup: OperationItemFragment
  }
}

export const PaymentGroupOperationsFragmentDoc = gql`
  fragment PaymentGroupOperationsFragment on PaymentGroup {
    operations {
      applyUnallocatedMemorandums {
        ...OperationItem
      }
      cancelPaymentGroup {
        ...OperationItem
      }
      payPaymentGroup {
        ...OperationItem
      }
    }
  }
  ${OperationItemFragmentDoc}
`
