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
export type CreateTransferInvoiceMutationVariables = Types.Exact<{
  input: Types.CreateTransferInvoiceInput
}>

export type CreateTransferInvoiceMutation = {
  createTransferInvoice?: Types.Maybe<{
    success: boolean
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
    invoice?: Types.Maybe<{ id: string }>
  }>
}

export const CreateTransferInvoiceDocument = gql`
  mutation CreateTransferInvoice($input: CreateTransferInvoiceInput!) {
    createTransferInvoice(input: $input) {
      success
      errors {
        code
        key
        message
      }
      invoice {
        id
      }
    }
  }
`
export type CreateTransferInvoiceMutationFn = Apollo.MutationFunction<
  CreateTransferInvoiceMutation,
  CreateTransferInvoiceMutationVariables
>

/**
 * __useCreateTransferInvoiceMutation__
 *
 * To run a mutation, you first call `useCreateTransferInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransferInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransferInvoiceMutation, { data, loading, error }] = useCreateTransferInvoiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTransferInvoiceMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateTransferInvoiceMutation,
    CreateTransferInvoiceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    CreateTransferInvoiceMutation,
    CreateTransferInvoiceMutationVariables
  >(CreateTransferInvoiceDocument, options)
}
export type CreateTransferInvoiceMutationHookResult = ReturnType<
  typeof useCreateTransferInvoiceMutation
>
export type CreateTransferInvoiceMutationResult =
  Apollo.MutationResult<CreateTransferInvoiceMutation>
export type CreateTransferInvoiceMutationOptions = Apollo.BaseMutationOptions<
  CreateTransferInvoiceMutation,
  CreateTransferInvoiceMutationVariables
>
