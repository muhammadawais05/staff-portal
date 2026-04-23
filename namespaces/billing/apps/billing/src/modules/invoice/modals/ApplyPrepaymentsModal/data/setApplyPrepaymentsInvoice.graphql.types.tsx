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
export type SetApplyPrepaymentsMutationVariables = Types.Exact<{
  input: Types.ApplyPrepaymentsInput
}>

export type SetApplyPrepaymentsMutation = {
  applyPrepayments?: Types.Maybe<{
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

export const SetApplyPrepaymentsDocument = gql`
  mutation SetApplyPrepayments($input: ApplyPrepaymentsInput!) {
    applyPrepayments(input: $input) {
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
export type SetApplyPrepaymentsMutationFn = Apollo.MutationFunction<
  SetApplyPrepaymentsMutation,
  SetApplyPrepaymentsMutationVariables
>

/**
 * __useSetApplyPrepaymentsMutation__
 *
 * To run a mutation, you first call `useSetApplyPrepaymentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetApplyPrepaymentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setApplyPrepaymentsMutation, { data, loading, error }] = useSetApplyPrepaymentsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetApplyPrepaymentsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetApplyPrepaymentsMutation,
    SetApplyPrepaymentsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetApplyPrepaymentsMutation,
    SetApplyPrepaymentsMutationVariables
  >(SetApplyPrepaymentsDocument, options)
}
export type SetApplyPrepaymentsMutationHookResult = ReturnType<
  typeof useSetApplyPrepaymentsMutation
>
export type SetApplyPrepaymentsMutationResult =
  Apollo.MutationResult<SetApplyPrepaymentsMutation>
export type SetApplyPrepaymentsMutationOptions = Apollo.BaseMutationOptions<
  SetApplyPrepaymentsMutation,
  SetApplyPrepaymentsMutationVariables
>
