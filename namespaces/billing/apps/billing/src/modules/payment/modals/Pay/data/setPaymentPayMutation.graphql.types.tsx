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
export type SetPayPaymentMutationVariables = Types.Exact<{
  input: Types.PayPaymentInput
}>

export type SetPayPaymentMutation = {
  payPayment?: Types.Maybe<{
    success: boolean
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
    payment?: Types.Maybe<{
      id: string
      balanceDue: string
      documentNumber: number
      status: Types.DocumentStatus
      operations: {
        applyUnallocatedMemorandumsToCommercialDocument: OperationItemFragment
        payPayment: OperationItemFragment
      }
    }>
  }>
}

export const SetPayPaymentDocument = gql`
  mutation SetPayPayment($input: PayPaymentInput!) {
    payPayment(input: $input) {
      success
      errors {
        code
        key
        message
      }
      payment {
        id
        balanceDue
        documentNumber
        status
        operations {
          applyUnallocatedMemorandumsToCommercialDocument {
            ...OperationItem
          }
          payPayment {
            ...OperationItem
          }
        }
      }
    }
  }
  ${OperationItemFragmentDoc}
`
export type SetPayPaymentMutationFn = Apollo.MutationFunction<
  SetPayPaymentMutation,
  SetPayPaymentMutationVariables
>

/**
 * __useSetPayPaymentMutation__
 *
 * To run a mutation, you first call `useSetPayPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPayPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPayPaymentMutation, { data, loading, error }] = useSetPayPaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetPayPaymentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetPayPaymentMutation,
    SetPayPaymentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetPayPaymentMutation,
    SetPayPaymentMutationVariables
  >(SetPayPaymentDocument, options)
}
export type SetPayPaymentMutationHookResult = ReturnType<
  typeof useSetPayPaymentMutation
>
export type SetPayPaymentMutationResult =
  Apollo.MutationResult<SetPayPaymentMutation>
export type SetPayPaymentMutationOptions = Apollo.BaseMutationOptions<
  SetPayPaymentMutation,
  SetPayPaymentMutationVariables
>
