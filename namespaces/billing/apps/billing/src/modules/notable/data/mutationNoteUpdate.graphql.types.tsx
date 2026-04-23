/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { NoteItemFragment } from '../../__fragments__/noteItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { NoteItemFragmentDoc } from '../../__fragments__/noteItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type UpdateNoteMutationVariables = Types.Exact<{
  input: Types.UpdateNoteInput
}>

export type UpdateNoteMutation = {
  updateNote?: Types.Maybe<{
    success: boolean
    note?: Types.Maybe<NoteItemFragment>
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
  }>
}

export const UpdateNoteDocument = gql`
  mutation UpdateNote($input: UpdateNoteInput!) {
    updateNote(input: $input) {
      note {
        ...NoteItem
      }
      success
      errors {
        code
        key
        message
      }
    }
  }
  ${NoteItemFragmentDoc}
`
export type UpdateNoteMutationFn = Apollo.MutationFunction<
  UpdateNoteMutation,
  UpdateNoteMutationVariables
>

/**
 * __useUpdateNoteMutation__
 *
 * To run a mutation, you first call `useUpdateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoteMutation, { data, loading, error }] = useUpdateNoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateNoteMutation,
    UpdateNoteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    UpdateNoteMutation,
    UpdateNoteMutationVariables
  >(UpdateNoteDocument, options)
}
export type UpdateNoteMutationHookResult = ReturnType<
  typeof useUpdateNoteMutation
>
export type UpdateNoteMutationResult = Apollo.MutationResult<UpdateNoteMutation>
export type UpdateNoteMutationOptions = Apollo.BaseMutationOptions<
  UpdateNoteMutation,
  UpdateNoteMutationVariables
>
