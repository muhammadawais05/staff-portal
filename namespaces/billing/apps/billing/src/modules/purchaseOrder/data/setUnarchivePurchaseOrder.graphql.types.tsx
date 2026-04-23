/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { PurchaseOrderFragment } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/purchaseOrderFragment.graphql.types'
import { gql } from '@apollo/client'
import { PurchaseOrderFragmentDoc } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/purchaseOrderFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type SetUnarchivePurchaseOrderMutationVariables = Types.Exact<{
  input: Types.UnarchivePurchaseOrderInput
}>

export type SetUnarchivePurchaseOrderMutation = {
  unarchivePurchaseOrder?: Types.Maybe<{
    success: boolean
    purchaseOrder?: Types.Maybe<PurchaseOrderFragment>
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
  }>
}

export const SetUnarchivePurchaseOrderDocument = gql`
  mutation SetUnarchivePurchaseOrder($input: UnarchivePurchaseOrderInput!) {
    unarchivePurchaseOrder(input: $input) {
      purchaseOrder {
        ...PurchaseOrderFragment
      }
      success
      errors {
        code
        key
        message
      }
    }
  }
  ${PurchaseOrderFragmentDoc}
`
export type SetUnarchivePurchaseOrderMutationFn = Apollo.MutationFunction<
  SetUnarchivePurchaseOrderMutation,
  SetUnarchivePurchaseOrderMutationVariables
>

/**
 * __useSetUnarchivePurchaseOrderMutation__
 *
 * To run a mutation, you first call `useSetUnarchivePurchaseOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUnarchivePurchaseOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUnarchivePurchaseOrderMutation, { data, loading, error }] = useSetUnarchivePurchaseOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUnarchivePurchaseOrderMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetUnarchivePurchaseOrderMutation,
    SetUnarchivePurchaseOrderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetUnarchivePurchaseOrderMutation,
    SetUnarchivePurchaseOrderMutationVariables
  >(SetUnarchivePurchaseOrderDocument, options)
}
export type SetUnarchivePurchaseOrderMutationHookResult = ReturnType<
  typeof useSetUnarchivePurchaseOrderMutation
>
export type SetUnarchivePurchaseOrderMutationResult =
  Apollo.MutationResult<SetUnarchivePurchaseOrderMutation>
export type SetUnarchivePurchaseOrderMutationOptions =
  Apollo.BaseMutationOptions<
    SetUnarchivePurchaseOrderMutation,
    SetUnarchivePurchaseOrderMutationVariables
  >
