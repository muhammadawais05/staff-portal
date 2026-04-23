/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { TransferFragment } from '../../../../__fragments__/transferFragment.graphql.types'
import { gql } from '@apollo/client'
import { TransferFragmentDoc } from '../../../../__fragments__/transferFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type SetPostponeTransferMutationVariables = Types.Exact<{
  input: Types.PostponeTransferInput
}>

export type SetPostponeTransferMutation = {
  postponeInvoiceTransfer?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    invoice?: Types.Maybe<{
      id: string
      transfers: { nodes: Array<TransferFragment> }
    }>
    errors: Array<
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
      | { message: string; code: string; key: string }
    >
  }>
}

export const SetPostponeTransferDocument = gql`
  mutation SetPostponeTransfer($input: PostponeTransferInput!) {
    postponeInvoiceTransfer(input: $input) {
      invoice {
        id
        transfers {
          nodes {
            ...TransferFragment
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
  ${TransferFragmentDoc}
`
export type SetPostponeTransferMutationFn = Apollo.MutationFunction<
  SetPostponeTransferMutation,
  SetPostponeTransferMutationVariables
>

/**
 * __useSetPostponeTransferMutation__
 *
 * To run a mutation, you first call `useSetPostponeTransferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPostponeTransferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPostponeTransferMutation, { data, loading, error }] = useSetPostponeTransferMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetPostponeTransferMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetPostponeTransferMutation,
    SetPostponeTransferMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetPostponeTransferMutation,
    SetPostponeTransferMutationVariables
  >(SetPostponeTransferDocument, options)
}
export type SetPostponeTransferMutationHookResult = ReturnType<
  typeof useSetPostponeTransferMutation
>
export type SetPostponeTransferMutationResult =
  Apollo.MutationResult<SetPostponeTransferMutation>
export type SetPostponeTransferMutationOptions = Apollo.BaseMutationOptions<
  SetPostponeTransferMutation,
  SetPostponeTransferMutationVariables
>
