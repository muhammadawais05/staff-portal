/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { OperationItemFragment } from '../../../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { OperationItemFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type EditDocumentNoteMutationVariables = Types.Exact<{
  input: Types.EditDocumentNoteInput
}>

export type EditDocumentNoteMutation = {
  editDocumentNote?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    commercialDocument?: Types.Maybe<
      | {
          id: string
          documentNote?: Types.Maybe<string>
          operations: {
            addDocumentNote: OperationItemFragment
            editDocumentNote: OperationItemFragment
          }
        }
      | {
          id: string
          documentNote?: Types.Maybe<string>
          operations: {
            addDocumentNote: OperationItemFragment
            editDocumentNote: OperationItemFragment
          }
        }
    >
    errors: Array<
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
    >
  }>
}

export const EditDocumentNoteDocument = gql`
  mutation EditDocumentNote($input: EditDocumentNoteInput!) {
    editDocumentNote(input: $input) {
      commercialDocument {
        ... on Invoice {
          id
          documentNote
          operations {
            addDocumentNote {
              ...OperationItem
            }
            editDocumentNote {
              ...OperationItem
            }
          }
        }
        ... on Payment {
          id
          documentNote
          operations {
            addDocumentNote {
              ...OperationItem
            }
            editDocumentNote {
              ...OperationItem
            }
          }
        }
      }
      notice
      success
      errors {
        message
        code
        key
      }
    }
  }
  ${OperationItemFragmentDoc}
`
export type EditDocumentNoteMutationFn = Apollo.MutationFunction<
  EditDocumentNoteMutation,
  EditDocumentNoteMutationVariables
>

/**
 * __useEditDocumentNoteMutation__
 *
 * To run a mutation, you first call `useEditDocumentNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditDocumentNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editDocumentNoteMutation, { data, loading, error }] = useEditDocumentNoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditDocumentNoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EditDocumentNoteMutation,
    EditDocumentNoteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    EditDocumentNoteMutation,
    EditDocumentNoteMutationVariables
  >(EditDocumentNoteDocument, options)
}
export type EditDocumentNoteMutationHookResult = ReturnType<
  typeof useEditDocumentNoteMutation
>
export type EditDocumentNoteMutationResult =
  Apollo.MutationResult<EditDocumentNoteMutation>
export type EditDocumentNoteMutationOptions = Apollo.BaseMutationOptions<
  EditDocumentNoteMutation,
  EditDocumentNoteMutationVariables
>
