/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { InvoiceMutationFragment } from '../../__fragments__/invoiceMutationFragment.graphql.types'
import { gql } from '@apollo/client'
import { InvoiceMutationFragmentDoc } from '../../__fragments__/invoiceMutationFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type SetDisputeTalentPaymentsMutationVariables = Types.Exact<{
  input: Types.DisputeTalentPaymentsInput
}>

export type SetDisputeTalentPaymentsMutation = {
  disputeTalentPayments?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    invoice?: Types.Maybe<InvoiceMutationFragment>
    errors: Array<
      | { key: string; message: string; code: string }
      | { key: string; message: string; code: string }
      | { key: string; message: string; code: string }
      | { key: string; message: string; code: string }
      | { key: string; message: string; code: string }
    >
  }>
}

export const SetDisputeTalentPaymentsDocument = gql`
  mutation SetDisputeTalentPayments($input: DisputeTalentPaymentsInput!) {
    disputeTalentPayments(input: $input) {
      invoice {
        ...InvoiceMutationFragment
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
  ${InvoiceMutationFragmentDoc}
`
export type SetDisputeTalentPaymentsMutationFn = Apollo.MutationFunction<
  SetDisputeTalentPaymentsMutation,
  SetDisputeTalentPaymentsMutationVariables
>

/**
 * __useSetDisputeTalentPaymentsMutation__
 *
 * To run a mutation, you first call `useSetDisputeTalentPaymentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDisputeTalentPaymentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDisputeTalentPaymentsMutation, { data, loading, error }] = useSetDisputeTalentPaymentsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetDisputeTalentPaymentsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetDisputeTalentPaymentsMutation,
    SetDisputeTalentPaymentsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetDisputeTalentPaymentsMutation,
    SetDisputeTalentPaymentsMutationVariables
  >(SetDisputeTalentPaymentsDocument, options)
}
export type SetDisputeTalentPaymentsMutationHookResult = ReturnType<
  typeof useSetDisputeTalentPaymentsMutation
>
export type SetDisputeTalentPaymentsMutationResult =
  Apollo.MutationResult<SetDisputeTalentPaymentsMutation>
export type SetDisputeTalentPaymentsMutationOptions =
  Apollo.BaseMutationOptions<
    SetDisputeTalentPaymentsMutation,
    SetDisputeTalentPaymentsMutationVariables
  >
