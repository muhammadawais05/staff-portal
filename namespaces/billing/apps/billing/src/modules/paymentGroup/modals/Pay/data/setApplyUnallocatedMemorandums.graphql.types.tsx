/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { PaymentGroupItemFragment } from '../../../data/getPaymentGroupsList.graphql.types'
import { gql } from '@apollo/client'
import { PaymentGroupItemFragmentDoc } from '../../../data/getPaymentGroupsList.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type SetApplyUnallocatedMemorandumsToPaymentGroupMutationVariables =
  Types.Exact<{
    input: Types.ApplyUnallocatedMemorandumsToPaymentGroupInput
  }>

export type SetApplyUnallocatedMemorandumsToPaymentGroupMutation = {
  applyUnallocatedMemorandumsToPaymentGroup?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
    paymentGroup?: Types.Maybe<PaymentGroupItemFragment>
  }>
}

export const SetApplyUnallocatedMemorandumsToPaymentGroupDocument = gql`
  mutation SetApplyUnallocatedMemorandumsToPaymentGroup(
    $input: ApplyUnallocatedMemorandumsToPaymentGroupInput!
  ) {
    applyUnallocatedMemorandumsToPaymentGroup(input: $input) {
      notice
      success
      errors {
        code
        key
        message
      }
      paymentGroup {
        ...PaymentGroupItem
      }
    }
  }
  ${PaymentGroupItemFragmentDoc}
`
export type SetApplyUnallocatedMemorandumsToPaymentGroupMutationFn =
  Apollo.MutationFunction<
    SetApplyUnallocatedMemorandumsToPaymentGroupMutation,
    SetApplyUnallocatedMemorandumsToPaymentGroupMutationVariables
  >

/**
 * __useSetApplyUnallocatedMemorandumsToPaymentGroupMutation__
 *
 * To run a mutation, you first call `useSetApplyUnallocatedMemorandumsToPaymentGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetApplyUnallocatedMemorandumsToPaymentGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setApplyUnallocatedMemorandumsToPaymentGroupMutation, { data, loading, error }] = useSetApplyUnallocatedMemorandumsToPaymentGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetApplyUnallocatedMemorandumsToPaymentGroupMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetApplyUnallocatedMemorandumsToPaymentGroupMutation,
    SetApplyUnallocatedMemorandumsToPaymentGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetApplyUnallocatedMemorandumsToPaymentGroupMutation,
    SetApplyUnallocatedMemorandumsToPaymentGroupMutationVariables
  >(SetApplyUnallocatedMemorandumsToPaymentGroupDocument, options)
}
export type SetApplyUnallocatedMemorandumsToPaymentGroupMutationHookResult =
  ReturnType<typeof useSetApplyUnallocatedMemorandumsToPaymentGroupMutation>
export type SetApplyUnallocatedMemorandumsToPaymentGroupMutationResult =
  Apollo.MutationResult<SetApplyUnallocatedMemorandumsToPaymentGroupMutation>
export type SetApplyUnallocatedMemorandumsToPaymentGroupMutationOptions =
  Apollo.BaseMutationOptions<
    SetApplyUnallocatedMemorandumsToPaymentGroupMutation,
    SetApplyUnallocatedMemorandumsToPaymentGroupMutationVariables
  >
