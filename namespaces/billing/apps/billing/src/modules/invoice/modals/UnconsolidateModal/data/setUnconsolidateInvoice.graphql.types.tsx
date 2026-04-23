/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { InvoiceMutationFragment } from '../../../../__fragments__/invoiceMutationFragment.graphql.types'
import { gql } from '@apollo/client'
import { InvoiceMutationFragmentDoc } from '../../../../__fragments__/invoiceMutationFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type SetUnconsolidateInvoiceMutationVariables = Types.Exact<{
  input: Types.UnconsolidateInvoiceInput
}>

export type SetUnconsolidateInvoiceMutation = {
  unconsolidateInvoice?: Types.Maybe<{
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

export const SetUnconsolidateInvoiceDocument = gql`
  mutation SetUnconsolidateInvoice($input: UnconsolidateInvoiceInput!) {
    unconsolidateInvoice(input: $input) {
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
export type SetUnconsolidateInvoiceMutationFn = Apollo.MutationFunction<
  SetUnconsolidateInvoiceMutation,
  SetUnconsolidateInvoiceMutationVariables
>

/**
 * __useSetUnconsolidateInvoiceMutation__
 *
 * To run a mutation, you first call `useSetUnconsolidateInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUnconsolidateInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUnconsolidateInvoiceMutation, { data, loading, error }] = useSetUnconsolidateInvoiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUnconsolidateInvoiceMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetUnconsolidateInvoiceMutation,
    SetUnconsolidateInvoiceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetUnconsolidateInvoiceMutation,
    SetUnconsolidateInvoiceMutationVariables
  >(SetUnconsolidateInvoiceDocument, options)
}
export type SetUnconsolidateInvoiceMutationHookResult = ReturnType<
  typeof useSetUnconsolidateInvoiceMutation
>
export type SetUnconsolidateInvoiceMutationResult =
  Apollo.MutationResult<SetUnconsolidateInvoiceMutation>
export type SetUnconsolidateInvoiceMutationOptions = Apollo.BaseMutationOptions<
  SetUnconsolidateInvoiceMutation,
  SetUnconsolidateInvoiceMutationVariables
>
