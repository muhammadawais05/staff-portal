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
export type ConvertPaymentIntoCreditMemorandumMutationVariables = Types.Exact<{
  input: Types.ConvertPaymentIntoCreditMemorandumInput
}>

export type ConvertPaymentIntoCreditMemorandumMutation = {
  convertPaymentIntoCreditMemorandum?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    payment?: Types.Maybe<{ id: string }>
    errors: Array<
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
    >
  }>
}

export const ConvertPaymentIntoCreditMemorandumDocument = gql`
  mutation convertPaymentIntoCreditMemorandum(
    $input: ConvertPaymentIntoCreditMemorandumInput!
  ) {
    convertPaymentIntoCreditMemorandum(input: $input) {
      payment {
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
export type ConvertPaymentIntoCreditMemorandumMutationFn =
  Apollo.MutationFunction<
    ConvertPaymentIntoCreditMemorandumMutation,
    ConvertPaymentIntoCreditMemorandumMutationVariables
  >

/**
 * __useConvertPaymentIntoCreditMemorandumMutation__
 *
 * To run a mutation, you first call `useConvertPaymentIntoCreditMemorandumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConvertPaymentIntoCreditMemorandumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [convertPaymentIntoCreditMemorandumMutation, { data, loading, error }] = useConvertPaymentIntoCreditMemorandumMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConvertPaymentIntoCreditMemorandumMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ConvertPaymentIntoCreditMemorandumMutation,
    ConvertPaymentIntoCreditMemorandumMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    ConvertPaymentIntoCreditMemorandumMutation,
    ConvertPaymentIntoCreditMemorandumMutationVariables
  >(ConvertPaymentIntoCreditMemorandumDocument, options)
}
export type ConvertPaymentIntoCreditMemorandumMutationHookResult = ReturnType<
  typeof useConvertPaymentIntoCreditMemorandumMutation
>
export type ConvertPaymentIntoCreditMemorandumMutationResult =
  Apollo.MutationResult<ConvertPaymentIntoCreditMemorandumMutation>
export type ConvertPaymentIntoCreditMemorandumMutationOptions =
  Apollo.BaseMutationOptions<
    ConvertPaymentIntoCreditMemorandumMutation,
    ConvertPaymentIntoCreditMemorandumMutationVariables
  >
