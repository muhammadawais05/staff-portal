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
export type SetAddMemorandumToCommercialDocumentMutationVariables =
  Types.Exact<{
    input: Types.AddMemorandumToCommercialDocumentInput
  }>

export type SetAddMemorandumToCommercialDocumentMutation = {
  addMemorandumToCommercialDocument?: Types.Maybe<{
    success: boolean
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
  }>
}

export const SetAddMemorandumToCommercialDocumentDocument = gql`
  mutation SetAddMemorandumToCommercialDocument(
    $input: AddMemorandumToCommercialDocumentInput!
  ) {
    addMemorandumToCommercialDocument(input: $input) {
      success
      errors {
        code
        key
        message
      }
    }
  }
`
export type SetAddMemorandumToCommercialDocumentMutationFn =
  Apollo.MutationFunction<
    SetAddMemorandumToCommercialDocumentMutation,
    SetAddMemorandumToCommercialDocumentMutationVariables
  >

/**
 * __useSetAddMemorandumToCommercialDocumentMutation__
 *
 * To run a mutation, you first call `useSetAddMemorandumToCommercialDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAddMemorandumToCommercialDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAddMemorandumToCommercialDocumentMutation, { data, loading, error }] = useSetAddMemorandumToCommercialDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetAddMemorandumToCommercialDocumentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetAddMemorandumToCommercialDocumentMutation,
    SetAddMemorandumToCommercialDocumentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetAddMemorandumToCommercialDocumentMutation,
    SetAddMemorandumToCommercialDocumentMutationVariables
  >(SetAddMemorandumToCommercialDocumentDocument, options)
}
export type SetAddMemorandumToCommercialDocumentMutationHookResult = ReturnType<
  typeof useSetAddMemorandumToCommercialDocumentMutation
>
export type SetAddMemorandumToCommercialDocumentMutationResult =
  Apollo.MutationResult<SetAddMemorandumToCommercialDocumentMutation>
export type SetAddMemorandumToCommercialDocumentMutationOptions =
  Apollo.BaseMutationOptions<
    SetAddMemorandumToCommercialDocumentMutation,
    SetAddMemorandumToCommercialDocumentMutationVariables
  >
