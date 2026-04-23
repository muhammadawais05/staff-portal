/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import {
  CommercialDocumentMutationFragment_Invoice_,
  CommercialDocumentMutationFragment_Payment_
} from '../../../../__fragments__/commercialDocumentMutationFragment.graphql.types'
import { gql } from '@apollo/client'
import { CommercialDocumentMutationFragmentDoc } from '../../../../__fragments__/commercialDocumentMutationFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type SetUpdateCommercialDocumentDueDateMutationVariables = Types.Exact<{
  input: Types.UpdateCommercialDocumentDueDateInput
}>

export type SetUpdateCommercialDocumentDueDateMutation = {
  updateCommercialDocumentDueDate?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    commercialDocument?: Types.Maybe<
      | CommercialDocumentMutationFragment_Invoice_
      | CommercialDocumentMutationFragment_Payment_
    >
    errors: Array<
      | { key: string; message: string; code: string }
      | { key: string; message: string; code: string }
      | { key: string; message: string; code: string }
      | { key: string; message: string; code: string }
      | { key: string; message: string; code: string }
    >
  }>
}

export const SetUpdateCommercialDocumentDueDateDocument = gql`
  mutation SetUpdateCommercialDocumentDueDate(
    $input: UpdateCommercialDocumentDueDateInput!
  ) {
    updateCommercialDocumentDueDate(input: $input) {
      commercialDocument {
        ...CommercialDocumentMutationFragment
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
  ${CommercialDocumentMutationFragmentDoc}
`
export type SetUpdateCommercialDocumentDueDateMutationFn =
  Apollo.MutationFunction<
    SetUpdateCommercialDocumentDueDateMutation,
    SetUpdateCommercialDocumentDueDateMutationVariables
  >

/**
 * __useSetUpdateCommercialDocumentDueDateMutation__
 *
 * To run a mutation, you first call `useSetUpdateCommercialDocumentDueDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUpdateCommercialDocumentDueDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUpdateCommercialDocumentDueDateMutation, { data, loading, error }] = useSetUpdateCommercialDocumentDueDateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUpdateCommercialDocumentDueDateMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetUpdateCommercialDocumentDueDateMutation,
    SetUpdateCommercialDocumentDueDateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetUpdateCommercialDocumentDueDateMutation,
    SetUpdateCommercialDocumentDueDateMutationVariables
  >(SetUpdateCommercialDocumentDueDateDocument, options)
}
export type SetUpdateCommercialDocumentDueDateMutationHookResult = ReturnType<
  typeof useSetUpdateCommercialDocumentDueDateMutation
>
export type SetUpdateCommercialDocumentDueDateMutationResult =
  Apollo.MutationResult<SetUpdateCommercialDocumentDueDateMutation>
export type SetUpdateCommercialDocumentDueDateMutationOptions =
  Apollo.BaseMutationOptions<
    SetUpdateCommercialDocumentDueDateMutation,
    SetUpdateCommercialDocumentDueDateMutationVariables
  >
