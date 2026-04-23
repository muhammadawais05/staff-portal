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
export type SetCreatePurchaseOrderMutationVariables = Types.Exact<{
  input: Types.CreatePurchaseOrderInput
}>

export type SetCreatePurchaseOrderMutation = {
  createPurchaseOrder?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    purchaseOrder?: Types.Maybe<{ id: string }>
    errors: Array<
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
    >
  }>
}

export const SetCreatePurchaseOrderDocument = gql`
  mutation SetCreatePurchaseOrder($input: CreatePurchaseOrderInput!) {
    createPurchaseOrder(input: $input) {
      purchaseOrder {
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
export type SetCreatePurchaseOrderMutationFn = Apollo.MutationFunction<
  SetCreatePurchaseOrderMutation,
  SetCreatePurchaseOrderMutationVariables
>

/**
 * __useSetCreatePurchaseOrderMutation__
 *
 * To run a mutation, you first call `useSetCreatePurchaseOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCreatePurchaseOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCreatePurchaseOrderMutation, { data, loading, error }] = useSetCreatePurchaseOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetCreatePurchaseOrderMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetCreatePurchaseOrderMutation,
    SetCreatePurchaseOrderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetCreatePurchaseOrderMutation,
    SetCreatePurchaseOrderMutationVariables
  >(SetCreatePurchaseOrderDocument, options)
}
export type SetCreatePurchaseOrderMutationHookResult = ReturnType<
  typeof useSetCreatePurchaseOrderMutation
>
export type SetCreatePurchaseOrderMutationResult =
  Apollo.MutationResult<SetCreatePurchaseOrderMutation>
export type SetCreatePurchaseOrderMutationOptions = Apollo.BaseMutationOptions<
  SetCreatePurchaseOrderMutation,
  SetCreatePurchaseOrderMutationVariables
>
