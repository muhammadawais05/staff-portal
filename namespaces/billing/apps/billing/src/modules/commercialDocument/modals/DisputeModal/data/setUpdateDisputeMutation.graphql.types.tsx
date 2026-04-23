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
export type SetUpdateDisputeMutationVariables = Types.Exact<{
  input: Types.UpdateDisputeInput
}>

export type SetUpdateDisputeMutation = {
  updateDispute?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    invoice?: Types.Maybe<InvoiceMutationFragment>
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
  }>
}

export const SetUpdateDisputeDocument = gql`
  mutation SetUpdateDispute($input: UpdateDisputeInput!) {
    updateDispute(input: $input) {
      invoice {
        ...InvoiceMutationFragment
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
  ${InvoiceMutationFragmentDoc}
`
export type SetUpdateDisputeMutationFn = Apollo.MutationFunction<
  SetUpdateDisputeMutation,
  SetUpdateDisputeMutationVariables
>

/**
 * __useSetUpdateDisputeMutation__
 *
 * To run a mutation, you first call `useSetUpdateDisputeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUpdateDisputeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUpdateDisputeMutation, { data, loading, error }] = useSetUpdateDisputeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUpdateDisputeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetUpdateDisputeMutation,
    SetUpdateDisputeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetUpdateDisputeMutation,
    SetUpdateDisputeMutationVariables
  >(SetUpdateDisputeDocument, options)
}
export type SetUpdateDisputeMutationHookResult = ReturnType<
  typeof useSetUpdateDisputeMutation
>
export type SetUpdateDisputeMutationResult =
  Apollo.MutationResult<SetUpdateDisputeMutation>
export type SetUpdateDisputeMutationOptions = Apollo.BaseMutationOptions<
  SetUpdateDisputeMutation,
  SetUpdateDisputeMutationVariables
>
