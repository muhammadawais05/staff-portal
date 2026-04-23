/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type SetRefundClientCreditBalanceMutationVariables = Types.Exact<{
  input: Types.RefundClientCreditBalanceInput;
}>;


export type SetRefundClientCreditBalanceMutation = { refundClientCreditBalance?: Types.Maybe<{ notice?: Types.Maybe<string>, success: boolean, errors: Array<{ code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string }> }> };


export const SetRefundClientCreditBalanceDocument = gql`
    mutation SetRefundClientCreditBalance($input: RefundClientCreditBalanceInput!) {
  refundClientCreditBalance(input: $input) {
    notice
    success
    errors {
      code
      key
      message
    }
  }
}
    `;
export type SetRefundClientCreditBalanceMutationFn = Apollo.MutationFunction<SetRefundClientCreditBalanceMutation, SetRefundClientCreditBalanceMutationVariables>;

/**
 * __useSetRefundClientCreditBalanceMutation__
 *
 * To run a mutation, you first call `useSetRefundClientCreditBalanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetRefundClientCreditBalanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setRefundClientCreditBalanceMutation, { data, loading, error }] = useSetRefundClientCreditBalanceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetRefundClientCreditBalanceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetRefundClientCreditBalanceMutation, SetRefundClientCreditBalanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetRefundClientCreditBalanceMutation, SetRefundClientCreditBalanceMutationVariables>(SetRefundClientCreditBalanceDocument, options);
      }
export type SetRefundClientCreditBalanceMutationHookResult = ReturnType<typeof useSetRefundClientCreditBalanceMutation>;
export type SetRefundClientCreditBalanceMutationResult = Apollo.MutationResult<SetRefundClientCreditBalanceMutation>;
export type SetRefundClientCreditBalanceMutationOptions = Apollo.BaseMutationOptions<SetRefundClientCreditBalanceMutation, SetRefundClientCreditBalanceMutationVariables>;