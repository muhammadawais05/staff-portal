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
export type SetVerifyWireBillingOptionMutationVariables = Types.Exact<{
  input: Types.VerifyWireBillingOptionInput;
}>;


export type SetVerifyWireBillingOptionMutation = { verifyWireBillingOption?: Types.Maybe<{ success: boolean, errors: Array<{ key: string, code: string, message: string } | { key: string, code: string, message: string } | { key: string, code: string, message: string } | { key: string, code: string, message: string } | { key: string, code: string, message: string }> }> };


export const SetVerifyWireBillingOptionDocument = gql`
    mutation SetVerifyWireBillingOption($input: VerifyWireBillingOptionInput!) {
  verifyWireBillingOption(input: $input) {
    success
    errors {
      key
      code
      message
    }
  }
}
    `;
export type SetVerifyWireBillingOptionMutationFn = Apollo.MutationFunction<SetVerifyWireBillingOptionMutation, SetVerifyWireBillingOptionMutationVariables>;

/**
 * __useSetVerifyWireBillingOptionMutation__
 *
 * To run a mutation, you first call `useSetVerifyWireBillingOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetVerifyWireBillingOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setVerifyWireBillingOptionMutation, { data, loading, error }] = useSetVerifyWireBillingOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetVerifyWireBillingOptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetVerifyWireBillingOptionMutation, SetVerifyWireBillingOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetVerifyWireBillingOptionMutation, SetVerifyWireBillingOptionMutationVariables>(SetVerifyWireBillingOptionDocument, options);
      }
export type SetVerifyWireBillingOptionMutationHookResult = ReturnType<typeof useSetVerifyWireBillingOptionMutation>;
export type SetVerifyWireBillingOptionMutationResult = Apollo.MutationResult<SetVerifyWireBillingOptionMutation>;
export type SetVerifyWireBillingOptionMutationOptions = Apollo.BaseMutationOptions<SetVerifyWireBillingOptionMutation, SetVerifyWireBillingOptionMutationVariables>;