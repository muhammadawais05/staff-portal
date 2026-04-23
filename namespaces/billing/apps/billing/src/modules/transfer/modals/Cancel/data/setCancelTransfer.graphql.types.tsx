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
export type SetCancelInvoiceTransferMutationVariables = Types.Exact<{
  input: Types.CancelTransferInput
}>

export type SetCancelInvoiceTransferMutation = {
  cancelInvoiceTransfer?: Types.Maybe<{
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

export const SetCancelInvoiceTransferDocument = gql`
  mutation SetCancelInvoiceTransfer($input: CancelTransferInput!) {
    cancelInvoiceTransfer(input: $input) {
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
export type SetCancelInvoiceTransferMutationFn = Apollo.MutationFunction<
  SetCancelInvoiceTransferMutation,
  SetCancelInvoiceTransferMutationVariables
>

/**
 * __useSetCancelInvoiceTransferMutation__
 *
 * To run a mutation, you first call `useSetCancelInvoiceTransferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCancelInvoiceTransferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCancelInvoiceTransferMutation, { data, loading, error }] = useSetCancelInvoiceTransferMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetCancelInvoiceTransferMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetCancelInvoiceTransferMutation,
    SetCancelInvoiceTransferMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetCancelInvoiceTransferMutation,
    SetCancelInvoiceTransferMutationVariables
  >(SetCancelInvoiceTransferDocument, options)
}
export type SetCancelInvoiceTransferMutationHookResult = ReturnType<
  typeof useSetCancelInvoiceTransferMutation
>
export type SetCancelInvoiceTransferMutationResult =
  Apollo.MutationResult<SetCancelInvoiceTransferMutation>
export type SetCancelInvoiceTransferMutationOptions =
  Apollo.BaseMutationOptions<
    SetCancelInvoiceTransferMutation,
    SetCancelInvoiceTransferMutationVariables
  >
