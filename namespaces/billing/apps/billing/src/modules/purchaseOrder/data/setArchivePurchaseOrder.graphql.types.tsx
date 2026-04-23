/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { PurchaseOrderFragment } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/purchaseOrderFragment.graphql.types'
import { gql } from '@apollo/client'
import { PurchaseOrderFragmentDoc } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/purchaseOrderFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type SetArchivePurchaseOrderMutationVariables = Types.Exact<{
  input: Types.ArchivePurchaseOrderInput
}>

export type SetArchivePurchaseOrderMutation = {
  archivePurchaseOrder?: Types.Maybe<{
    success: boolean
    purchaseOrder?: Types.Maybe<PurchaseOrderFragment>
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
  }>
}

export const SetArchivePurchaseOrderDocument = gql`
  mutation SetArchivePurchaseOrder($input: ArchivePurchaseOrderInput!) {
    archivePurchaseOrder(input: $input) {
      purchaseOrder {
        ...PurchaseOrderFragment
      }
      success
      errors {
        code
        key
        message
      }
    }
  }
  ${PurchaseOrderFragmentDoc}
`
export type SetArchivePurchaseOrderMutationFn = Apollo.MutationFunction<
  SetArchivePurchaseOrderMutation,
  SetArchivePurchaseOrderMutationVariables
>

/**
 * __useSetArchivePurchaseOrderMutation__
 *
 * To run a mutation, you first call `useSetArchivePurchaseOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetArchivePurchaseOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setArchivePurchaseOrderMutation, { data, loading, error }] = useSetArchivePurchaseOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetArchivePurchaseOrderMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetArchivePurchaseOrderMutation,
    SetArchivePurchaseOrderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetArchivePurchaseOrderMutation,
    SetArchivePurchaseOrderMutationVariables
  >(SetArchivePurchaseOrderDocument, options)
}
export type SetArchivePurchaseOrderMutationHookResult = ReturnType<
  typeof useSetArchivePurchaseOrderMutation
>
export type SetArchivePurchaseOrderMutationResult =
  Apollo.MutationResult<SetArchivePurchaseOrderMutation>
export type SetArchivePurchaseOrderMutationOptions = Apollo.BaseMutationOptions<
  SetArchivePurchaseOrderMutation,
  SetArchivePurchaseOrderMutationVariables
>
