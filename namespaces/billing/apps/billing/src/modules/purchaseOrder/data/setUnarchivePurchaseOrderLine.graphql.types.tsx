/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { PurchaseOrderLineFragment } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/purchaseOrderLineFragment.graphql.types'
import { gql } from '@apollo/client'
import { PurchaseOrderLineFragmentDoc } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/purchaseOrderLineFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type SetUnarchivePurchaseOrderLineMutationVariables = Types.Exact<{
  input: Types.UnarchivePurchaseOrderLineInput
}>

export type SetUnarchivePurchaseOrderLineMutation = {
  unarchivePurchaseOrderLine?: Types.Maybe<{
    success: boolean
    purchaseOrderLine?: Types.Maybe<PurchaseOrderLineFragment>
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
  }>
}

export const SetUnarchivePurchaseOrderLineDocument = gql`
  mutation SetUnarchivePurchaseOrderLine(
    $input: UnarchivePurchaseOrderLineInput!
  ) {
    unarchivePurchaseOrderLine(input: $input) {
      purchaseOrderLine {
        ...PurchaseOrderLineFragment
      }
      success
      errors {
        code
        key
        message
      }
    }
  }
  ${PurchaseOrderLineFragmentDoc}
`
export type SetUnarchivePurchaseOrderLineMutationFn = Apollo.MutationFunction<
  SetUnarchivePurchaseOrderLineMutation,
  SetUnarchivePurchaseOrderLineMutationVariables
>

/**
 * __useSetUnarchivePurchaseOrderLineMutation__
 *
 * To run a mutation, you first call `useSetUnarchivePurchaseOrderLineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUnarchivePurchaseOrderLineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUnarchivePurchaseOrderLineMutation, { data, loading, error }] = useSetUnarchivePurchaseOrderLineMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUnarchivePurchaseOrderLineMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetUnarchivePurchaseOrderLineMutation,
    SetUnarchivePurchaseOrderLineMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetUnarchivePurchaseOrderLineMutation,
    SetUnarchivePurchaseOrderLineMutationVariables
  >(SetUnarchivePurchaseOrderLineDocument, options)
}
export type SetUnarchivePurchaseOrderLineMutationHookResult = ReturnType<
  typeof useSetUnarchivePurchaseOrderLineMutation
>
export type SetUnarchivePurchaseOrderLineMutationResult =
  Apollo.MutationResult<SetUnarchivePurchaseOrderLineMutation>
export type SetUnarchivePurchaseOrderLineMutationOptions =
  Apollo.BaseMutationOptions<
    SetUnarchivePurchaseOrderLineMutation,
    SetUnarchivePurchaseOrderLineMutationVariables
  >
