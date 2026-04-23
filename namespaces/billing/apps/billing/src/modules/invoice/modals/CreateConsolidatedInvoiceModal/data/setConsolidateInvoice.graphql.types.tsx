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
export type SetConsolidateInvoiceMutationVariables = Types.Exact<{
  input: Types.ConsolidateInvoicesInput
}>

export type SetConsolidateInvoiceMutation = {
  consolidateInvoices?: Types.Maybe<{
    success: boolean
    invoice?: Types.Maybe<{ id: string }>
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
  }>
}

export const SetConsolidateInvoiceDocument = gql`
  mutation SetConsolidateInvoice($input: ConsolidateInvoicesInput!) {
    consolidateInvoices(input: $input) {
      invoice {
        id
      }
      success
      errors {
        code
        key
        message
      }
    }
  }
`
export type SetConsolidateInvoiceMutationFn = Apollo.MutationFunction<
  SetConsolidateInvoiceMutation,
  SetConsolidateInvoiceMutationVariables
>

/**
 * __useSetConsolidateInvoiceMutation__
 *
 * To run a mutation, you first call `useSetConsolidateInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetConsolidateInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setConsolidateInvoiceMutation, { data, loading, error }] = useSetConsolidateInvoiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetConsolidateInvoiceMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetConsolidateInvoiceMutation,
    SetConsolidateInvoiceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetConsolidateInvoiceMutation,
    SetConsolidateInvoiceMutationVariables
  >(SetConsolidateInvoiceDocument, options)
}
export type SetConsolidateInvoiceMutationHookResult = ReturnType<
  typeof useSetConsolidateInvoiceMutation
>
export type SetConsolidateInvoiceMutationResult =
  Apollo.MutationResult<SetConsolidateInvoiceMutation>
export type SetConsolidateInvoiceMutationOptions = Apollo.BaseMutationOptions<
  SetConsolidateInvoiceMutation,
  SetConsolidateInvoiceMutationVariables
>
