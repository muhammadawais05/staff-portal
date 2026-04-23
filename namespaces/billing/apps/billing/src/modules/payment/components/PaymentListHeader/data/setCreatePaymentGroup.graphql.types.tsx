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
export type SetCreatePaymentGroupMutationVariables = Types.Exact<{
  input: Types.CreatePaymentGroupInput
}>

export type SetCreatePaymentGroupMutation = {
  createPaymentGroup?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    paymentGroup?: Types.Maybe<{ id: string }>
    errors: Array<
      | { key: string; message: string; code: string }
      | { key: string; message: string; code: string }
      | { key: string; message: string; code: string }
      | { key: string; message: string; code: string }
      | { key: string; message: string; code: string }
    >
  }>
}

export const SetCreatePaymentGroupDocument = gql`
  mutation SetCreatePaymentGroup($input: CreatePaymentGroupInput!) {
    createPaymentGroup(input: $input) {
      paymentGroup {
        id
      }
      notice
      success
      errors {
        key
        message
        code
      }
    }
  }
`
export type SetCreatePaymentGroupMutationFn = Apollo.MutationFunction<
  SetCreatePaymentGroupMutation,
  SetCreatePaymentGroupMutationVariables
>

/**
 * __useSetCreatePaymentGroupMutation__
 *
 * To run a mutation, you first call `useSetCreatePaymentGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCreatePaymentGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCreatePaymentGroupMutation, { data, loading, error }] = useSetCreatePaymentGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetCreatePaymentGroupMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetCreatePaymentGroupMutation,
    SetCreatePaymentGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetCreatePaymentGroupMutation,
    SetCreatePaymentGroupMutationVariables
  >(SetCreatePaymentGroupDocument, options)
}
export type SetCreatePaymentGroupMutationHookResult = ReturnType<
  typeof useSetCreatePaymentGroupMutation
>
export type SetCreatePaymentGroupMutationResult =
  Apollo.MutationResult<SetCreatePaymentGroupMutation>
export type SetCreatePaymentGroupMutationOptions = Apollo.BaseMutationOptions<
  SetCreatePaymentGroupMutation,
  SetCreatePaymentGroupMutationVariables
>
