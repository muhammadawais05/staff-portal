/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type AssignPurchaseOrderLineToInvoiceMutationVariables = Types.Exact<{
  input: Types.AssignPurchaseOrderLineInput
}>

export type AssignPurchaseOrderLineToInvoiceMutation = {
  assignPurchaseOrderLine?: Types.Maybe<{
    success: boolean
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
    invoice?: Types.Maybe<{
      id: string
      purchaseOrderLine?: Types.Maybe<{
        id: string
        poLineNumber: string
        budgetLeft?: Types.Maybe<string>
        purchaseOrder: {
          id: string
          poNumber: string
          budgetLeft?: Types.Maybe<string>
        }
      }>
    }>
  }>
}

export const AssignPurchaseOrderLineToInvoiceDocument = gql`
  mutation AssignPurchaseOrderLineToInvoice(
    $input: AssignPurchaseOrderLineInput!
  ) {
    assignPurchaseOrderLine(input: $input) {
      success
      errors {
        code
        key
        message
      }
      invoice {
        id
        purchaseOrderLine {
          id
          poLineNumber
          budgetLeft
          purchaseOrder {
            id
            poNumber
            budgetLeft
          }
        }
      }
    }
  }
`
export type AssignPurchaseOrderLineToInvoiceMutationFn =
  Apollo.MutationFunction<
    AssignPurchaseOrderLineToInvoiceMutation,
    AssignPurchaseOrderLineToInvoiceMutationVariables
  >

/**
 * __useAssignPurchaseOrderLineToInvoiceMutation__
 *
 * To run a mutation, you first call `useAssignPurchaseOrderLineToInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignPurchaseOrderLineToInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignPurchaseOrderLineToInvoiceMutation, { data, loading, error }] = useAssignPurchaseOrderLineToInvoiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignPurchaseOrderLineToInvoiceMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AssignPurchaseOrderLineToInvoiceMutation,
    AssignPurchaseOrderLineToInvoiceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    AssignPurchaseOrderLineToInvoiceMutation,
    AssignPurchaseOrderLineToInvoiceMutationVariables
  >(AssignPurchaseOrderLineToInvoiceDocument, options)
}
export type AssignPurchaseOrderLineToInvoiceMutationHookResult = ReturnType<
  typeof useAssignPurchaseOrderLineToInvoiceMutation
>
export type AssignPurchaseOrderLineToInvoiceMutationResult =
  Apollo.MutationResult<AssignPurchaseOrderLineToInvoiceMutation>
export type AssignPurchaseOrderLineToInvoiceMutationOptions =
  Apollo.BaseMutationOptions<
    AssignPurchaseOrderLineToInvoiceMutation,
    AssignPurchaseOrderLineToInvoiceMutationVariables
  >
