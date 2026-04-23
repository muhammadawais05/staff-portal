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
export type SetCollectBadDebtInvoiceMutationVariables = Types.Exact<{
  input: Types.CollectBadDebtInvoiceInput
}>

export type SetCollectBadDebtInvoiceMutation = {
  collectBadDebtInvoice?: Types.Maybe<{
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

export const SetCollectBadDebtInvoiceDocument = gql`
  mutation SetCollectBadDebtInvoice($input: CollectBadDebtInvoiceInput!) {
    collectBadDebtInvoice(input: $input) {
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
export type SetCollectBadDebtInvoiceMutationFn = Apollo.MutationFunction<
  SetCollectBadDebtInvoiceMutation,
  SetCollectBadDebtInvoiceMutationVariables
>

/**
 * __useSetCollectBadDebtInvoiceMutation__
 *
 * To run a mutation, you first call `useSetCollectBadDebtInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCollectBadDebtInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCollectBadDebtInvoiceMutation, { data, loading, error }] = useSetCollectBadDebtInvoiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetCollectBadDebtInvoiceMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetCollectBadDebtInvoiceMutation,
    SetCollectBadDebtInvoiceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetCollectBadDebtInvoiceMutation,
    SetCollectBadDebtInvoiceMutationVariables
  >(SetCollectBadDebtInvoiceDocument, options)
}
export type SetCollectBadDebtInvoiceMutationHookResult = ReturnType<
  typeof useSetCollectBadDebtInvoiceMutation
>
export type SetCollectBadDebtInvoiceMutationResult =
  Apollo.MutationResult<SetCollectBadDebtInvoiceMutation>
export type SetCollectBadDebtInvoiceMutationOptions =
  Apollo.BaseMutationOptions<
    SetCollectBadDebtInvoiceMutation,
    SetCollectBadDebtInvoiceMutationVariables
  >
