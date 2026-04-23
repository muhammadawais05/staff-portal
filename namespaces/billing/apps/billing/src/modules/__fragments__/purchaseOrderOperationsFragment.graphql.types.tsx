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
export type PurchaseOrderOperationsFragment = {
  archivePurchaseOrder: OperationItemFragment
  unarchivePurchaseOrder: OperationItemFragment
  updatePurchaseOrder: OperationItemFragment
}

export const PurchaseOrderOperationsFragmentDoc = gql`
  fragment PurchaseOrderOperationsFragment on PurchaseOrderOperations {
    archivePurchaseOrder {
      ...OperationItem
    }
    unarchivePurchaseOrder {
      ...OperationItem
    }
    updatePurchaseOrder {
      ...OperationItem
    }
  }
  ${OperationItemFragmentDoc}
`
