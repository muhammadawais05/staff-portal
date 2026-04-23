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
export type CancelPaymentMutationVariables = Types.Exact<{
  input: Types.CancelPaymentInput
}>

export type CancelPaymentMutation = {
  cancelPayment?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    payment?: Types.Maybe<{
      id: string
      paymentKind: Types.PaymentKind
      status: Types.DocumentStatus
      operations: { cancelPayment: OperationItemFragment }
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

export const CancelPaymentDocument = gql`
  mutation CancelPayment($input: CancelPaymentInput!) {
    cancelPayment(input: $input) {
      payment {
        id
        paymentKind
        status
        operations {
          cancelPayment {
            ...OperationItem
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
  ${OperationItemFragmentDoc}
`
export type CancelPaymentMutationFn = Apollo.MutationFunction<
  CancelPaymentMutation,
  CancelPaymentMutationVariables
>

/**
 * __useCancelPaymentMutation__
 *
 * To run a mutation, you first call `useCancelPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelPaymentMutation, { data, loading, error }] = useCancelPaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelPaymentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CancelPaymentMutation,
    CancelPaymentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    CancelPaymentMutation,
    CancelPaymentMutationVariables
  >(CancelPaymentDocument, options)
}
export type CancelPaymentMutationHookResult = ReturnType<
  typeof useCancelPaymentMutation
>
export type CancelPaymentMutationResult =
  Apollo.MutationResult<CancelPaymentMutation>
export type CancelPaymentMutationOptions = Apollo.BaseMutationOptions<
  CancelPaymentMutation,
  CancelPaymentMutationVariables
>
