/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { OperationItemFragment } from '../../../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { PurchaseOrderFragment } from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/purchaseOrderFragment.graphql.types'
import { gql } from '@apollo/client'
import { OperationItemFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { PurchaseOrderFragmentDoc } from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/purchaseOrderFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type UpdateInvoicePurchaseOrderMutationVariables = Types.Exact<{
  input: Types.AssignPurchaseOrderInput
}>

export type UpdateInvoicePurchaseOrderMutation = {
  assignPurchaseOrder?: Types.Maybe<{
    success: boolean
    invoice?: Types.Maybe<{
      id: string
      amountWithCorrections: string
      balanceDue: string
      invoiceKind: Types.InvoiceKind
      exceedsPurchaseOrderBalance: boolean
      job?: Types.Maybe<{
        id: string
        nextPurchaseOrder?: Types.Maybe<{ id: string; poNumber: string }>
        purchaseOrder?: Types.Maybe<{ id: string; poNumber: string }>
      }>
      operations: { assignPurchaseOrder: OperationItemFragment }
      purchaseOrder?: Types.Maybe<PurchaseOrderFragment>
      reason?: Types.Maybe<
        | {
            id: string
            purchaseOrder?: Types.Maybe<{ id: string; poNumber: string }>
          }
        | {
            id: string
            nextPurchaseOrder?: Types.Maybe<{ id: string; poNumber: string }>
            purchaseOrder?: Types.Maybe<{ id: string; poNumber: string }>
          }
      >
      subjectObject: {
        id: string
        purchaseOrders?: Types.Maybe<{ nodes: Array<PurchaseOrderFragment> }>
      }
    }>
    errors: Array<
      | { message: string; key: string; code: string }
      | { message: string; key: string; code: string }
      | { message: string; key: string; code: string }
      | { message: string; key: string; code: string }
      | { message: string; key: string; code: string }
    >
  }>
}

export const UpdateInvoicePurchaseOrderDocument = gql`
  mutation UpdateInvoicePurchaseOrder($input: AssignPurchaseOrderInput!) {
    assignPurchaseOrder(input: $input) {
      invoice {
        id
        amountWithCorrections
        balanceDue
        invoiceKind
        job {
          id
          nextPurchaseOrder {
            id
            poNumber
          }
          purchaseOrder {
            id
            poNumber
          }
        }
        exceedsPurchaseOrderBalance
        operations {
          assignPurchaseOrder {
            ...OperationItem
          }
        }
        purchaseOrder {
          ...PurchaseOrderFragment
        }
        reason {
          ... on Engagement {
            id
            purchaseOrder {
              id
              poNumber
            }
          }
          ... on Job {
            id
            nextPurchaseOrder {
              id
              poNumber
            }
            purchaseOrder {
              id
              poNumber
            }
          }
        }
        subjectObject {
          id
          purchaseOrders: purchaseOrdersNullable {
            nodes {
              ...PurchaseOrderFragment
            }
          }
        }
      }
      success
      errors {
        message
        key
        code
      }
    }
  }
  ${OperationItemFragmentDoc}
  ${PurchaseOrderFragmentDoc}
`
export type UpdateInvoicePurchaseOrderMutationFn = Apollo.MutationFunction<
  UpdateInvoicePurchaseOrderMutation,
  UpdateInvoicePurchaseOrderMutationVariables
>

/**
 * __useUpdateInvoicePurchaseOrderMutation__
 *
 * To run a mutation, you first call `useUpdateInvoicePurchaseOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInvoicePurchaseOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInvoicePurchaseOrderMutation, { data, loading, error }] = useUpdateInvoicePurchaseOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateInvoicePurchaseOrderMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateInvoicePurchaseOrderMutation,
    UpdateInvoicePurchaseOrderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    UpdateInvoicePurchaseOrderMutation,
    UpdateInvoicePurchaseOrderMutationVariables
  >(UpdateInvoicePurchaseOrderDocument, options)
}
export type UpdateInvoicePurchaseOrderMutationHookResult = ReturnType<
  typeof useUpdateInvoicePurchaseOrderMutation
>
export type UpdateInvoicePurchaseOrderMutationResult =
  Apollo.MutationResult<UpdateInvoicePurchaseOrderMutation>
export type UpdateInvoicePurchaseOrderMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateInvoicePurchaseOrderMutation,
    UpdateInvoicePurchaseOrderMutationVariables
  >
