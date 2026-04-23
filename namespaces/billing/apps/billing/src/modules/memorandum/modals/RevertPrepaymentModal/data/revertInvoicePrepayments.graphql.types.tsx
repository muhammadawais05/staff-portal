/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { MemorandumItemFragment } from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/memorandumFragment.graphql.types'
import { gql } from '@apollo/client'
import { MemorandumItemFragmentDoc } from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/memorandumFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type RevertInvoicePrepaymentsMutationVariables = Types.Exact<{
  input: Types.RevertPrepaymentsInput
}>

export type RevertInvoicePrepaymentsMutation = {
  revertInvoicePrepayments: {
    notice?: Types.Maybe<string>
    success: boolean
    invoice?: Types.Maybe<{
      id: string
      memorandums: { nodes: Array<MemorandumItemFragment> }
    }>
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
  }
}

export const RevertInvoicePrepaymentsDocument = gql`
  mutation RevertInvoicePrepayments($input: RevertPrepaymentsInput!) {
    revertInvoicePrepayments(input: $input) {
      invoice {
        id
        memorandums {
          nodes {
            ... on Memorandum {
              ...MemorandumItem
            }
          }
        }
      }
      notice
      success
      errors {
        code
        key
        message
      }
    }
  }
  ${MemorandumItemFragmentDoc}
`
export type RevertInvoicePrepaymentsMutationFn = Apollo.MutationFunction<
  RevertInvoicePrepaymentsMutation,
  RevertInvoicePrepaymentsMutationVariables
>

/**
 * __useRevertInvoicePrepaymentsMutation__
 *
 * To run a mutation, you first call `useRevertInvoicePrepaymentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevertInvoicePrepaymentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revertInvoicePrepaymentsMutation, { data, loading, error }] = useRevertInvoicePrepaymentsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRevertInvoicePrepaymentsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RevertInvoicePrepaymentsMutation,
    RevertInvoicePrepaymentsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    RevertInvoicePrepaymentsMutation,
    RevertInvoicePrepaymentsMutationVariables
  >(RevertInvoicePrepaymentsDocument, options)
}
export type RevertInvoicePrepaymentsMutationHookResult = ReturnType<
  typeof useRevertInvoicePrepaymentsMutation
>
export type RevertInvoicePrepaymentsMutationResult =
  Apollo.MutationResult<RevertInvoicePrepaymentsMutation>
export type RevertInvoicePrepaymentsMutationOptions =
  Apollo.BaseMutationOptions<
    RevertInvoicePrepaymentsMutation,
    RevertInvoicePrepaymentsMutationVariables
  >
