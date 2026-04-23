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
export type SetPayMultiplePaymentsMutationVariables = Types.Exact<{
  input: Types.PayMultiplePaymentsInput
}>

export type SetPayMultiplePaymentsMutation = {
  payMultiplePayments?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    errors: Array<
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
    >
  }>
}

export const SetPayMultiplePaymentsDocument = gql`
  mutation SetPayMultiplePayments($input: PayMultiplePaymentsInput!) {
    payMultiplePayments(input: $input) {
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
export type SetPayMultiplePaymentsMutationFn = Apollo.MutationFunction<
  SetPayMultiplePaymentsMutation,
  SetPayMultiplePaymentsMutationVariables
>

/**
 * __useSetPayMultiplePaymentsMutation__
 *
 * To run a mutation, you first call `useSetPayMultiplePaymentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPayMultiplePaymentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPayMultiplePaymentsMutation, { data, loading, error }] = useSetPayMultiplePaymentsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetPayMultiplePaymentsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetPayMultiplePaymentsMutation,
    SetPayMultiplePaymentsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetPayMultiplePaymentsMutation,
    SetPayMultiplePaymentsMutationVariables
  >(SetPayMultiplePaymentsDocument, options)
}
export type SetPayMultiplePaymentsMutationHookResult = ReturnType<
  typeof useSetPayMultiplePaymentsMutation
>
export type SetPayMultiplePaymentsMutationResult =
  Apollo.MutationResult<SetPayMultiplePaymentsMutation>
export type SetPayMultiplePaymentsMutationOptions = Apollo.BaseMutationOptions<
  SetPayMultiplePaymentsMutation,
  SetPayMultiplePaymentsMutationVariables
>
