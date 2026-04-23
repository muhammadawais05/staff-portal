/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { WebResourceFragment } from '../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { WebResourceFragmentDoc } from '../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type SetUpdatePurchaseOrderMutationVariables = Types.Exact<{
  input: Types.UpdatePurchaseOrderInput
}>

export type SetUpdatePurchaseOrderMutation = {
  updatePurchaseOrder?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    purchaseOrder?: Types.Maybe<{
      id: string
      purchaseOrderLines: {
        nodes: Array<{
          archived: boolean
          id: string
          poLineNumber: string
          totalAmount?: Types.Maybe<string>
          draftedAmount: string
          webResource: WebResourceFragment
        }>
      }
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

export const SetUpdatePurchaseOrderDocument = gql`
  mutation SetUpdatePurchaseOrder($input: UpdatePurchaseOrderInput!) {
    updatePurchaseOrder(input: $input) {
      purchaseOrder {
        id
        purchaseOrderLines {
          nodes {
            archived
            id
            poLineNumber
            totalAmount
            draftedAmount
            webResource {
              ...WebResourceFragment
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
  ${WebResourceFragmentDoc}
`
export type SetUpdatePurchaseOrderMutationFn = Apollo.MutationFunction<
  SetUpdatePurchaseOrderMutation,
  SetUpdatePurchaseOrderMutationVariables
>

/**
 * __useSetUpdatePurchaseOrderMutation__
 *
 * To run a mutation, you first call `useSetUpdatePurchaseOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUpdatePurchaseOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUpdatePurchaseOrderMutation, { data, loading, error }] = useSetUpdatePurchaseOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUpdatePurchaseOrderMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetUpdatePurchaseOrderMutation,
    SetUpdatePurchaseOrderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetUpdatePurchaseOrderMutation,
    SetUpdatePurchaseOrderMutationVariables
  >(SetUpdatePurchaseOrderDocument, options)
}
export type SetUpdatePurchaseOrderMutationHookResult = ReturnType<
  typeof useSetUpdatePurchaseOrderMutation
>
export type SetUpdatePurchaseOrderMutationResult =
  Apollo.MutationResult<SetUpdatePurchaseOrderMutation>
export type SetUpdatePurchaseOrderMutationOptions = Apollo.BaseMutationOptions<
  SetUpdatePurchaseOrderMutation,
  SetUpdatePurchaseOrderMutationVariables
>
