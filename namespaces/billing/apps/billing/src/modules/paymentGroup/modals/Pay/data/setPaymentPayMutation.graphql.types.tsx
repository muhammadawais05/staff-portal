/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import {
  PaymentPaySubject_Client_Fragment,
  PaymentPaySubject_CompanyRepresentative_Fragment,
  PaymentPaySubject_Leader_Fragment,
  PaymentPaySubject_ReferralPartner_Fragment,
  PaymentPaySubject_Staff_Fragment,
  PaymentPaySubject_Talent_Fragment,
  PaymentPaySubject_TalentPartner_Fragment
} from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentPaySubject.graphql.types'
import { gql } from '@apollo/client'
import { PaymentPaySubjectFragmentDoc } from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentPaySubject.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type SetPayPaymentGroupMutationVariables = Types.Exact<{
  input: Types.PayPaymentGroupInput
}>

export type SetPayPaymentGroupMutation = {
  payPaymentGroup?: Types.Maybe<{
    success: boolean
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
    paymentGroup?: Types.Maybe<{
      id: string
      number: number
      amount: string
      status: Types.PaymentGroupStatus
      subject:
        | PaymentPaySubject_Client_Fragment
        | PaymentPaySubject_CompanyRepresentative_Fragment
        | PaymentPaySubject_Leader_Fragment
        | PaymentPaySubject_ReferralPartner_Fragment
        | PaymentPaySubject_Staff_Fragment
        | PaymentPaySubject_Talent_Fragment
        | PaymentPaySubject_TalentPartner_Fragment
    }>
  }>
}

export const SetPayPaymentGroupDocument = gql`
  mutation SetPayPaymentGroup($input: PayPaymentGroupInput!) {
    payPaymentGroup(input: $input) {
      success
      errors {
        code
        key
        message
      }
      paymentGroup {
        id
        number
        amount
        status
        subject {
          ...PaymentPaySubject
        }
      }
    }
  }
  ${PaymentPaySubjectFragmentDoc}
`
export type SetPayPaymentGroupMutationFn = Apollo.MutationFunction<
  SetPayPaymentGroupMutation,
  SetPayPaymentGroupMutationVariables
>

/**
 * __useSetPayPaymentGroupMutation__
 *
 * To run a mutation, you first call `useSetPayPaymentGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPayPaymentGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPayPaymentGroupMutation, { data, loading, error }] = useSetPayPaymentGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetPayPaymentGroupMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetPayPaymentGroupMutation,
    SetPayPaymentGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetPayPaymentGroupMutation,
    SetPayPaymentGroupMutationVariables
  >(SetPayPaymentGroupDocument, options)
}
export type SetPayPaymentGroupMutationHookResult = ReturnType<
  typeof useSetPayPaymentGroupMutation
>
export type SetPayPaymentGroupMutationResult =
  Apollo.MutationResult<SetPayPaymentGroupMutation>
export type SetPayPaymentGroupMutationOptions = Apollo.BaseMutationOptions<
  SetPayPaymentGroupMutation,
  SetPayPaymentGroupMutationVariables
>
