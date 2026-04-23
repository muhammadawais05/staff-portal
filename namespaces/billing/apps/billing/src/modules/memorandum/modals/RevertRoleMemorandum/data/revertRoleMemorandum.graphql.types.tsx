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
export type RevertRoleMemorandumMutationVariables = Types.Exact<{
  input: Types.RevertRoleMemorandumInput
}>

export type RevertRoleMemorandumMutation = {
  revertRoleMemorandum?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    revertingMemorandum?: Types.Maybe<{
      id: string
      balance: Types.MemorandumBalance
      amount: string
      operations: { revertRoleMemorandum: OperationItemFragment }
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

export const RevertRoleMemorandumDocument = gql`
  mutation RevertRoleMemorandum($input: RevertRoleMemorandumInput!) {
    revertRoleMemorandum(input: $input) {
      revertingMemorandum {
        id
        balance
        amount
        operations {
          revertRoleMemorandum {
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
export type RevertRoleMemorandumMutationFn = Apollo.MutationFunction<
  RevertRoleMemorandumMutation,
  RevertRoleMemorandumMutationVariables
>

/**
 * __useRevertRoleMemorandumMutation__
 *
 * To run a mutation, you first call `useRevertRoleMemorandumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevertRoleMemorandumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revertRoleMemorandumMutation, { data, loading, error }] = useRevertRoleMemorandumMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRevertRoleMemorandumMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RevertRoleMemorandumMutation,
    RevertRoleMemorandumMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    RevertRoleMemorandumMutation,
    RevertRoleMemorandumMutationVariables
  >(RevertRoleMemorandumDocument, options)
}
export type RevertRoleMemorandumMutationHookResult = ReturnType<
  typeof useRevertRoleMemorandumMutation
>
export type RevertRoleMemorandumMutationResult =
  Apollo.MutationResult<RevertRoleMemorandumMutation>
export type RevertRoleMemorandumMutationOptions = Apollo.BaseMutationOptions<
  RevertRoleMemorandumMutation,
  RevertRoleMemorandumMutationVariables
>
