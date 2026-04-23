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
export type SetAddMemorandumToRoleMutationVariables = Types.Exact<{
  input: Types.AddMemorandumToRoleInput
}>

export type SetAddMemorandumToRoleMutation = {
  addMemorandumToRole?: Types.Maybe<{
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

export const SetAddMemorandumToRoleDocument = gql`
  mutation SetAddMemorandumToRole($input: AddMemorandumToRoleInput!) {
    addMemorandumToRole(input: $input) {
      success
      errors {
        code
        key
        message
      }
    }
  }
`
export type SetAddMemorandumToRoleMutationFn = Apollo.MutationFunction<
  SetAddMemorandumToRoleMutation,
  SetAddMemorandumToRoleMutationVariables
>

/**
 * __useSetAddMemorandumToRoleMutation__
 *
 * To run a mutation, you first call `useSetAddMemorandumToRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAddMemorandumToRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAddMemorandumToRoleMutation, { data, loading, error }] = useSetAddMemorandumToRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetAddMemorandumToRoleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetAddMemorandumToRoleMutation,
    SetAddMemorandumToRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetAddMemorandumToRoleMutation,
    SetAddMemorandumToRoleMutationVariables
  >(SetAddMemorandumToRoleDocument, options)
}
export type SetAddMemorandumToRoleMutationHookResult = ReturnType<
  typeof useSetAddMemorandumToRoleMutation
>
export type SetAddMemorandumToRoleMutationResult =
  Apollo.MutationResult<SetAddMemorandumToRoleMutation>
export type SetAddMemorandumToRoleMutationOptions = Apollo.BaseMutationOptions<
  SetAddMemorandumToRoleMutation,
  SetAddMemorandumToRoleMutationVariables
>
