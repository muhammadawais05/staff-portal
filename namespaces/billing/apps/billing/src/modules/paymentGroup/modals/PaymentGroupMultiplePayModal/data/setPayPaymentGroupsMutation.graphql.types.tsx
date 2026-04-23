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
export type SetPayPaymentGroupsMutationVariables = Types.Exact<{
  input: Types.PayPaymentGroupsInput
}>

export type SetPayPaymentGroupsMutation = {
  payPaymentGroups?: Types.Maybe<{
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

export const SetPayPaymentGroupsDocument = gql`
  mutation SetPayPaymentGroups($input: PayPaymentGroupsInput!) {
    payPaymentGroups(input: $input) {
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
export type SetPayPaymentGroupsMutationFn = Apollo.MutationFunction<
  SetPayPaymentGroupsMutation,
  SetPayPaymentGroupsMutationVariables
>

/**
 * __useSetPayPaymentGroupsMutation__
 *
 * To run a mutation, you first call `useSetPayPaymentGroupsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPayPaymentGroupsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPayPaymentGroupsMutation, { data, loading, error }] = useSetPayPaymentGroupsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetPayPaymentGroupsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetPayPaymentGroupsMutation,
    SetPayPaymentGroupsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetPayPaymentGroupsMutation,
    SetPayPaymentGroupsMutationVariables
  >(SetPayPaymentGroupsDocument, options)
}
export type SetPayPaymentGroupsMutationHookResult = ReturnType<
  typeof useSetPayPaymentGroupsMutation
>
export type SetPayPaymentGroupsMutationResult =
  Apollo.MutationResult<SetPayPaymentGroupsMutation>
export type SetPayPaymentGroupsMutationOptions = Apollo.BaseMutationOptions<
  SetPayPaymentGroupsMutation,
  SetPayPaymentGroupsMutationVariables
>
