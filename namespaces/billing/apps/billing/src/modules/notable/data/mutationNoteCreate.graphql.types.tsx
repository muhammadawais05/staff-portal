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
export type CreateNoteMutationVariables = Types.Exact<{
  input: Types.CreateNoteInput
}>

export type CreateNoteMutation = {
  createNote?: Types.Maybe<{
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

export const CreateNoteDocument = gql`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
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
export type CreateNoteMutationFn = Apollo.MutationFunction<
  CreateNoteMutation,
  CreateNoteMutationVariables
>

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateNoteMutation,
    CreateNoteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    CreateNoteMutation,
    CreateNoteMutationVariables
  >(CreateNoteDocument, options)
}
export type CreateNoteMutationHookResult = ReturnType<
  typeof useCreateNoteMutation
>
export type CreateNoteMutationResult = Apollo.MutationResult<CreateNoteMutation>
export type CreateNoteMutationOptions = Apollo.BaseMutationOptions<
  CreateNoteMutation,
  CreateNoteMutationVariables
>
