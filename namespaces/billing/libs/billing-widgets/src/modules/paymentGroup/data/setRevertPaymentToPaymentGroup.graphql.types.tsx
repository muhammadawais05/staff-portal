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
export type SetRestorePaymentToPaymentGroupMutationVariables = Types.Exact<{
  input: Types.AddPaymentToPaymentGroupInput;
}>;


export type SetRestorePaymentToPaymentGroupMutation = { addPaymentToPaymentGroup?: Types.Maybe<{ notice?: Types.Maybe<string>, success: boolean, payment?: Types.Maybe<PaymentMutationFragment>, errors: Array<{ key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string }> }> };


export const SetRestorePaymentToPaymentGroupDocument = gql`
    mutation SetRestorePaymentToPaymentGroup($input: AddPaymentToPaymentGroupInput!) {
  addPaymentToPaymentGroup(input: $input) {
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
export type SetRestorePaymentToPaymentGroupMutationFn = Apollo.MutationFunction<SetRestorePaymentToPaymentGroupMutation, SetRestorePaymentToPaymentGroupMutationVariables>;

/**
 * __useSetRestorePaymentToPaymentGroupMutation__
 *
 * To run a mutation, you first call `useSetRestorePaymentToPaymentGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetRestorePaymentToPaymentGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setRestorePaymentToPaymentGroupMutation, { data, loading, error }] = useSetRestorePaymentToPaymentGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetRestorePaymentToPaymentGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetRestorePaymentToPaymentGroupMutation, SetRestorePaymentToPaymentGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetRestorePaymentToPaymentGroupMutation, SetRestorePaymentToPaymentGroupMutationVariables>(SetRestorePaymentToPaymentGroupDocument, options);
      }
export type SetRestorePaymentToPaymentGroupMutationHookResult = ReturnType<typeof useSetRestorePaymentToPaymentGroupMutation>;
export type SetRestorePaymentToPaymentGroupMutationResult = Apollo.MutationResult<SetRestorePaymentToPaymentGroupMutation>;
export type SetRestorePaymentToPaymentGroupMutationOptions = Apollo.BaseMutationOptions<SetRestorePaymentToPaymentGroupMutation, SetRestorePaymentToPaymentGroupMutationVariables>;