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
export type RemoveNoteAttachmentMutationVariables = Types.Exact<{
  noteId: Types.Scalars['ID']
}>

export type RemoveNoteAttachmentMutation = {
  removeNoteAttachment?: Types.Maybe<{
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

export const RemoveNoteAttachmentDocument = gql`
  mutation RemoveNoteAttachment($noteId: ID!) {
    removeNoteAttachment(input: { noteId: $noteId }) {
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
export type RemoveNoteAttachmentMutationFn = Apollo.MutationFunction<
  RemoveNoteAttachmentMutation,
  RemoveNoteAttachmentMutationVariables
>

/**
 * __useRemoveNoteAttachmentMutation__
 *
 * To run a mutation, you first call `useRemoveNoteAttachmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveNoteAttachmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeNoteAttachmentMutation, { data, loading, error }] = useRemoveNoteAttachmentMutation({
 *   variables: {
 *      noteId: // value for 'noteId'
 *   },
 * });
 */
export function useRemoveNoteAttachmentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveNoteAttachmentMutation,
    RemoveNoteAttachmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    RemoveNoteAttachmentMutation,
    RemoveNoteAttachmentMutationVariables
  >(RemoveNoteAttachmentDocument, options)
}
export type RemoveNoteAttachmentMutationHookResult = ReturnType<
  typeof useRemoveNoteAttachmentMutation
>
export type RemoveNoteAttachmentMutationResult =
  Apollo.MutationResult<RemoveNoteAttachmentMutation>
export type RemoveNoteAttachmentMutationOptions = Apollo.BaseMutationOptions<
  RemoveNoteAttachmentMutation,
  RemoveNoteAttachmentMutationVariables
>
