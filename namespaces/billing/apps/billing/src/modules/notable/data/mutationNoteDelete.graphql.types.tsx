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
export type RemoveNoteMutationVariables = Types.Exact<{
  noteId: Types.Scalars['ID']
}>

export type RemoveNoteMutation = {
  removeNote?: Types.Maybe<{
    success: boolean
    note?: Types.Maybe<{ id: string }>
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
  }>
}

export const RemoveNoteDocument = gql`
  mutation RemoveNote($noteId: ID!) {
    removeNote(input: { noteId: $noteId }) {
      note {
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
export type RemoveNoteMutationFn = Apollo.MutationFunction<
  RemoveNoteMutation,
  RemoveNoteMutationVariables
>

/**
 * __useRemoveNoteMutation__
 *
 * To run a mutation, you first call `useRemoveNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeNoteMutation, { data, loading, error }] = useRemoveNoteMutation({
 *   variables: {
 *      noteId: // value for 'noteId'
 *   },
 * });
 */
export function useRemoveNoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveNoteMutation,
    RemoveNoteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    RemoveNoteMutation,
    RemoveNoteMutationVariables
  >(RemoveNoteDocument, options)
}
export type RemoveNoteMutationHookResult = ReturnType<
  typeof useRemoveNoteMutation
>
export type RemoveNoteMutationResult = Apollo.MutationResult<RemoveNoteMutation>
export type RemoveNoteMutationOptions = Apollo.BaseMutationOptions<
  RemoveNoteMutation,
  RemoveNoteMutationVariables
>
