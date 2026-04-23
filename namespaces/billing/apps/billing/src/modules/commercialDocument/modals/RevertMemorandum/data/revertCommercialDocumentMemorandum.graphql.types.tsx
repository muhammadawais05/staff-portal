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
export type RevertCommercialDocumentMemorandumMutationVariables = Types.Exact<{
  input: Types.RevertCommercialDocumentMemorandumInput
}>

export type RevertCommercialDocumentMemorandumMutation = {
  revertCommercialDocumentMemorandum?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    revertingMemorandum?: Types.Maybe<{
      id: string
      balance: Types.MemorandumBalance
      amount: string
      operations: { revertCommercialDocumentMemorandum: OperationItemFragment }
    }>
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
  }>
}

export const RevertCommercialDocumentMemorandumDocument = gql`
  mutation RevertCommercialDocumentMemorandum(
    $input: RevertCommercialDocumentMemorandumInput!
  ) {
    revertCommercialDocumentMemorandum(input: $input) {
      revertingMemorandum {
        id
        balance
        amount
        operations {
          revertCommercialDocumentMemorandum {
            ...OperationItem
          }
        }
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
  ${OperationItemFragmentDoc}
`
export type RevertCommercialDocumentMemorandumMutationFn =
  Apollo.MutationFunction<
    RevertCommercialDocumentMemorandumMutation,
    RevertCommercialDocumentMemorandumMutationVariables
  >

/**
 * __useRevertCommercialDocumentMemorandumMutation__
 *
 * To run a mutation, you first call `useRevertCommercialDocumentMemorandumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevertCommercialDocumentMemorandumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revertCommercialDocumentMemorandumMutation, { data, loading, error }] = useRevertCommercialDocumentMemorandumMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRevertCommercialDocumentMemorandumMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RevertCommercialDocumentMemorandumMutation,
    RevertCommercialDocumentMemorandumMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    RevertCommercialDocumentMemorandumMutation,
    RevertCommercialDocumentMemorandumMutationVariables
  >(RevertCommercialDocumentMemorandumDocument, options)
}
export type RevertCommercialDocumentMemorandumMutationHookResult = ReturnType<
  typeof useRevertCommercialDocumentMemorandumMutation
>
export type RevertCommercialDocumentMemorandumMutationResult =
  Apollo.MutationResult<RevertCommercialDocumentMemorandumMutation>
export type RevertCommercialDocumentMemorandumMutationOptions =
  Apollo.BaseMutationOptions<
    RevertCommercialDocumentMemorandumMutation,
    RevertCommercialDocumentMemorandumMutationVariables
  >
