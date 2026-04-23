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
export type CancelPaymentGroupMutationVariables = Types.Exact<{
  input: Types.CancelPaymentGroupInput
}>

export type CancelPaymentGroupMutation = {
  cancelPaymentGroup?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    paymentGroup?: Types.Maybe<{
      id: string
      amount: string
      createdOn: `${`${number}-${number}-${number}`}` | ''
      number: number
      status: Types.PaymentGroupStatus
      operations: { cancelPaymentGroup: OperationItemFragment }
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

export const CancelPaymentGroupDocument = gql`
  mutation CancelPaymentGroup($input: CancelPaymentGroupInput!) {
    cancelPaymentGroup(input: $input) {
      paymentGroup {
        id
        amount
        createdOn
        number
        status
        operations {
          cancelPaymentGroup {
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
export type CancelPaymentGroupMutationFn = Apollo.MutationFunction<
  CancelPaymentGroupMutation,
  CancelPaymentGroupMutationVariables
>

/**
 * __useCancelPaymentGroupMutation__
 *
 * To run a mutation, you first call `useCancelPaymentGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelPaymentGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelPaymentGroupMutation, { data, loading, error }] = useCancelPaymentGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelPaymentGroupMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CancelPaymentGroupMutation,
    CancelPaymentGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    CancelPaymentGroupMutation,
    CancelPaymentGroupMutationVariables
  >(CancelPaymentGroupDocument, options)
}
export type CancelPaymentGroupMutationHookResult = ReturnType<
  typeof useCancelPaymentGroupMutation
>
export type CancelPaymentGroupMutationResult =
  Apollo.MutationResult<CancelPaymentGroupMutation>
export type CancelPaymentGroupMutationOptions = Apollo.BaseMutationOptions<
  CancelPaymentGroupMutation,
  CancelPaymentGroupMutationVariables
>
