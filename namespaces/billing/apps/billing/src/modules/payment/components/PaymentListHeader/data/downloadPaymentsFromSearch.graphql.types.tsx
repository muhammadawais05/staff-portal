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
export type DownloadPaymentsFromSearchMutationVariables = Types.Exact<{
  input: Types.DownloadPaymentsFromSearchInput
}>

export type DownloadPaymentsFromSearchMutation = {
  downloadPaymentsFromSearch?: Types.Maybe<{
    reportUrl?: Types.Maybe<string>
    reportGenerationScheduled: boolean
    notice?: Types.Maybe<string>
    success: boolean
    errors: Array<
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
    >
  }>
}

export const DownloadPaymentsFromSearchDocument = gql`
  mutation DownloadPaymentsFromSearch(
    $input: DownloadPaymentsFromSearchInput!
  ) {
    downloadPaymentsFromSearch(input: $input) {
      reportUrl
      reportGenerationScheduled
      notice
      success
      errors {
        message
        code
        key
      }
    }
  }
`
export type DownloadPaymentsFromSearchMutationFn = Apollo.MutationFunction<
  DownloadPaymentsFromSearchMutation,
  DownloadPaymentsFromSearchMutationVariables
>

/**
 * __useDownloadPaymentsFromSearchMutation__
 *
 * To run a mutation, you first call `useDownloadPaymentsFromSearchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDownloadPaymentsFromSearchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [downloadPaymentsFromSearchMutation, { data, loading, error }] = useDownloadPaymentsFromSearchMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDownloadPaymentsFromSearchMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DownloadPaymentsFromSearchMutation,
    DownloadPaymentsFromSearchMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    DownloadPaymentsFromSearchMutation,
    DownloadPaymentsFromSearchMutationVariables
  >(DownloadPaymentsFromSearchDocument, options)
}
export type DownloadPaymentsFromSearchMutationHookResult = ReturnType<
  typeof useDownloadPaymentsFromSearchMutation
>
export type DownloadPaymentsFromSearchMutationResult =
  Apollo.MutationResult<DownloadPaymentsFromSearchMutation>
export type DownloadPaymentsFromSearchMutationOptions =
  Apollo.BaseMutationOptions<
    DownloadPaymentsFromSearchMutation,
    DownloadPaymentsFromSearchMutationVariables
  >
