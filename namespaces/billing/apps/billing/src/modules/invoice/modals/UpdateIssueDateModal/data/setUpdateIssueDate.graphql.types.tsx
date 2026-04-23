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
export type SetUpdateIssueDateMutationVariables = Types.Exact<{
  input: Types.UpdateIssueDateInput
}>

export type SetUpdateIssueDateMutation = {
  updateIssueDate?: Types.Maybe<{
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

export const SetUpdateIssueDateDocument = gql`
  mutation SetUpdateIssueDate($input: UpdateIssueDateInput!) {
    updateIssueDate(input: $input) {
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
export type SetUpdateIssueDateMutationFn = Apollo.MutationFunction<
  SetUpdateIssueDateMutation,
  SetUpdateIssueDateMutationVariables
>

/**
 * __useSetUpdateIssueDateMutation__
 *
 * To run a mutation, you first call `useSetUpdateIssueDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUpdateIssueDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUpdateIssueDateMutation, { data, loading, error }] = useSetUpdateIssueDateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUpdateIssueDateMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetUpdateIssueDateMutation,
    SetUpdateIssueDateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetUpdateIssueDateMutation,
    SetUpdateIssueDateMutationVariables
  >(SetUpdateIssueDateDocument, options)
}
export type SetUpdateIssueDateMutationHookResult = ReturnType<
  typeof useSetUpdateIssueDateMutation
>
export type SetUpdateIssueDateMutationResult =
  Apollo.MutationResult<SetUpdateIssueDateMutation>
export type SetUpdateIssueDateMutationOptions = Apollo.BaseMutationOptions<
  SetUpdateIssueDateMutation,
  SetUpdateIssueDateMutationVariables
>
