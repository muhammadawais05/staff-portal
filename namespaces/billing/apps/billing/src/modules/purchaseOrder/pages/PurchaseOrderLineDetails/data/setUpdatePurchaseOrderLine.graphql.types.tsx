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
export type SetUpdatePurchaseOrderLineMutationVariables = Types.Exact<{
  input: Types.UpdatePurchaseOrderLineInput
}>

export type SetUpdatePurchaseOrderLineMutation = {
  updatePurchaseOrderLine?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    purchaseOrderLine?: Types.Maybe<{ id: string }>
    errors: Array<
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
    >
  }>
}

export const SetUpdatePurchaseOrderLineDocument = gql`
  mutation SetUpdatePurchaseOrderLine($input: UpdatePurchaseOrderLineInput!) {
    updatePurchaseOrderLine(input: $input) {
      purchaseOrderLine {
        id
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
`
export type SetUpdatePurchaseOrderLineMutationFn = Apollo.MutationFunction<
  SetUpdatePurchaseOrderLineMutation,
  SetUpdatePurchaseOrderLineMutationVariables
>

/**
 * __useSetUpdatePurchaseOrderLineMutation__
 *
 * To run a mutation, you first call `useSetUpdatePurchaseOrderLineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUpdatePurchaseOrderLineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUpdatePurchaseOrderLineMutation, { data, loading, error }] = useSetUpdatePurchaseOrderLineMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUpdatePurchaseOrderLineMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetUpdatePurchaseOrderLineMutation,
    SetUpdatePurchaseOrderLineMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetUpdatePurchaseOrderLineMutation,
    SetUpdatePurchaseOrderLineMutationVariables
  >(SetUpdatePurchaseOrderLineDocument, options)
}
export type SetUpdatePurchaseOrderLineMutationHookResult = ReturnType<
  typeof useSetUpdatePurchaseOrderLineMutation
>
export type SetUpdatePurchaseOrderLineMutationResult =
  Apollo.MutationResult<SetUpdatePurchaseOrderLineMutation>
export type SetUpdatePurchaseOrderLineMutationOptions =
  Apollo.BaseMutationOptions<
    SetUpdatePurchaseOrderLineMutation,
    SetUpdatePurchaseOrderLineMutationVariables
  >
