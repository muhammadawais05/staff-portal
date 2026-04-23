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
export type SetClaimTransferRefundMutationVariables = Types.Exact<{
  input: Types.ClaimTransferRefundInput
}>

export type SetClaimTransferRefundMutation = {
  claimTransferRefund?: Types.Maybe<{
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

export const SetClaimTransferRefundDocument = gql`
  mutation SetClaimTransferRefund($input: ClaimTransferRefundInput!) {
    claimTransferRefund(input: $input) {
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
export type SetClaimTransferRefundMutationFn = Apollo.MutationFunction<
  SetClaimTransferRefundMutation,
  SetClaimTransferRefundMutationVariables
>

/**
 * __useSetClaimTransferRefundMutation__
 *
 * To run a mutation, you first call `useSetClaimTransferRefundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetClaimTransferRefundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setClaimTransferRefundMutation, { data, loading, error }] = useSetClaimTransferRefundMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetClaimTransferRefundMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetClaimTransferRefundMutation,
    SetClaimTransferRefundMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetClaimTransferRefundMutation,
    SetClaimTransferRefundMutationVariables
  >(SetClaimTransferRefundDocument, options)
}
export type SetClaimTransferRefundMutationHookResult = ReturnType<
  typeof useSetClaimTransferRefundMutation
>
export type SetClaimTransferRefundMutationResult =
  Apollo.MutationResult<SetClaimTransferRefundMutation>
export type SetClaimTransferRefundMutationOptions = Apollo.BaseMutationOptions<
  SetClaimTransferRefundMutation,
  SetClaimTransferRefundMutationVariables
>
