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
export type SetWriteOffInvoiceMutationVariables = Types.Exact<{
  input: Types.WriteOffInvoiceInput
}>

export type SetWriteOffInvoiceMutation = {
  writeOffInvoice?: Types.Maybe<{
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

export const SetWriteOffInvoiceDocument = gql`
  mutation SetWriteOffInvoice($input: WriteOffInvoiceInput!) {
    writeOffInvoice(input: $input) {
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
export type SetWriteOffInvoiceMutationFn = Apollo.MutationFunction<
  SetWriteOffInvoiceMutation,
  SetWriteOffInvoiceMutationVariables
>

/**
 * __useSetWriteOffInvoiceMutation__
 *
 * To run a mutation, you first call `useSetWriteOffInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetWriteOffInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setWriteOffInvoiceMutation, { data, loading, error }] = useSetWriteOffInvoiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetWriteOffInvoiceMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetWriteOffInvoiceMutation,
    SetWriteOffInvoiceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetWriteOffInvoiceMutation,
    SetWriteOffInvoiceMutationVariables
  >(SetWriteOffInvoiceDocument, options)
}
export type SetWriteOffInvoiceMutationHookResult = ReturnType<
  typeof useSetWriteOffInvoiceMutation
>
export type SetWriteOffInvoiceMutationResult =
  Apollo.MutationResult<SetWriteOffInvoiceMutation>
export type SetWriteOffInvoiceMutationOptions = Apollo.BaseMutationOptions<
  SetWriteOffInvoiceMutation,
  SetWriteOffInvoiceMutationVariables
>
