/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { PaymentMutationFragment } from '../../__fragments__/paymentMutationFragment.graphql.types';
import { gql } from '@apollo/client';
import { PaymentMutationFragmentDoc } from '../../__fragments__/paymentMutationFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type SetRemovePaymentFromPaymentGroupMutationVariables = Types.Exact<{
  input: Types.RemovePaymentFromPaymentGroupInput;
}>;


export type SetRemovePaymentFromPaymentGroupMutation = { removePaymentFromPaymentGroup?: Types.Maybe<{ notice?: Types.Maybe<string>, success: boolean, payment?: Types.Maybe<PaymentMutationFragment>, errors: Array<{ key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string }> }> };


export const SetRemovePaymentFromPaymentGroupDocument = gql`
    mutation SetRemovePaymentFromPaymentGroup($input: RemovePaymentFromPaymentGroupInput!) {
  removePaymentFromPaymentGroup(input: $input) {
    payment {
      ...PaymentMutationFragment
    }
    notice
    success
    errors {
      key
      message
      code
    }
  }
}
    ${PaymentMutationFragmentDoc}`;
export type SetRemovePaymentFromPaymentGroupMutationFn = Apollo.MutationFunction<SetRemovePaymentFromPaymentGroupMutation, SetRemovePaymentFromPaymentGroupMutationVariables>;

/**
 * __useSetRemovePaymentFromPaymentGroupMutation__
 *
 * To run a mutation, you first call `useSetRemovePaymentFromPaymentGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetRemovePaymentFromPaymentGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setRemovePaymentFromPaymentGroupMutation, { data, loading, error }] = useSetRemovePaymentFromPaymentGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetRemovePaymentFromPaymentGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetRemovePaymentFromPaymentGroupMutation, SetRemovePaymentFromPaymentGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetRemovePaymentFromPaymentGroupMutation, SetRemovePaymentFromPaymentGroupMutationVariables>(SetRemovePaymentFromPaymentGroupDocument, options);
      }
export type SetRemovePaymentFromPaymentGroupMutationHookResult = ReturnType<typeof useSetRemovePaymentFromPaymentGroupMutation>;
export type SetRemovePaymentFromPaymentGroupMutationResult = Apollo.MutationResult<SetRemovePaymentFromPaymentGroupMutation>;
export type SetRemovePaymentFromPaymentGroupMutationOptions = Apollo.BaseMutationOptions<SetRemovePaymentFromPaymentGroupMutation, SetRemovePaymentFromPaymentGroupMutationVariables>;