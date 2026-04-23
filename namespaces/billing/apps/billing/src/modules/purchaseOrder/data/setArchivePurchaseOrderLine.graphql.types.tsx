/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { PurchaseOrderLineFragment } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/purchaseOrderLineFragment.graphql.types'
import { gql } from '@apollo/client'
import { PurchaseOrderLineFragmentDoc } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/purchaseOrderLineFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type SetArchivePurchaseOrderLineMutationVariables = Types.Exact<{
  input: Types.ArchivePurchaseOrderLineInput
}>

export type SetArchivePurchaseOrderLineMutation = {
  archivePurchaseOrderLine?: Types.Maybe<{
    success: boolean
    purchaseOrderLine?: Types.Maybe<PurchaseOrderLineFragment>
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
  }>
}

export const SetArchivePurchaseOrderLineDocument = gql`
  mutation SetArchivePurchaseOrderLine($input: ArchivePurchaseOrderLineInput!) {
    archivePurchaseOrderLine(input: $input) {
      purchaseOrderLine {
        ...PurchaseOrderLineFragment
      }
      success
      errors {
        code
        key
        message
      }
    }
  }
  ${PurchaseOrderLineFragmentDoc}
`
export type SetArchivePurchaseOrderLineMutationFn = Apollo.MutationFunction<
  SetArchivePurchaseOrderLineMutation,
  SetArchivePurchaseOrderLineMutationVariables
>

/**
 * __useSetArchivePurchaseOrderLineMutation__
 *
 * To run a mutation, you first call `useSetArchivePurchaseOrderLineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetArchivePurchaseOrderLineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setArchivePurchaseOrderLineMutation, { data, loading, error }] = useSetArchivePurchaseOrderLineMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetArchivePurchaseOrderLineMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetArchivePurchaseOrderLineMutation,
    SetArchivePurchaseOrderLineMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetArchivePurchaseOrderLineMutation,
    SetArchivePurchaseOrderLineMutationVariables
  >(SetArchivePurchaseOrderLineDocument, options)
}
export type SetArchivePurchaseOrderLineMutationHookResult = ReturnType<
  typeof useSetArchivePurchaseOrderLineMutation
>
export type SetArchivePurchaseOrderLineMutationResult =
  Apollo.MutationResult<SetArchivePurchaseOrderLineMutation>
export type SetArchivePurchaseOrderLineMutationOptions =
  Apollo.BaseMutationOptions<
    SetArchivePurchaseOrderLineMutation,
    SetArchivePurchaseOrderLineMutationVariables
  >
