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
export type SetUnverifyWireBillingOptionMutationVariables = Types.Exact<{
  input: Types.UnverifyWireBillingOptionInput;
}>;


export type SetUnverifyWireBillingOptionMutation = { unverifyWireBillingOption?: Types.Maybe<{ success: boolean, errors: Array<{ key: string, code: string, message: string } | { key: string, code: string, message: string } | { key: string, code: string, message: string } | { key: string, code: string, message: string } | { key: string, code: string, message: string }> }> };


export const SetUnverifyWireBillingOptionDocument = gql`
    mutation SetUnverifyWireBillingOption($input: UnverifyWireBillingOptionInput!) {
  unverifyWireBillingOption(input: $input) {
    success
    errors {
      key
      code
      message
    }
  }
}
    `;
export type SetUnverifyWireBillingOptionMutationFn = Apollo.MutationFunction<SetUnverifyWireBillingOptionMutation, SetUnverifyWireBillingOptionMutationVariables>;

/**
 * __useSetUnverifyWireBillingOptionMutation__
 *
 * To run a mutation, you first call `useSetUnverifyWireBillingOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUnverifyWireBillingOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUnverifyWireBillingOptionMutation, { data, loading, error }] = useSetUnverifyWireBillingOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUnverifyWireBillingOptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetUnverifyWireBillingOptionMutation, SetUnverifyWireBillingOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetUnverifyWireBillingOptionMutation, SetUnverifyWireBillingOptionMutationVariables>(SetUnverifyWireBillingOptionDocument, options);
      }
export type SetUnverifyWireBillingOptionMutationHookResult = ReturnType<typeof useSetUnverifyWireBillingOptionMutation>;
export type SetUnverifyWireBillingOptionMutationResult = Apollo.MutationResult<SetUnverifyWireBillingOptionMutation>;
export type SetUnverifyWireBillingOptionMutationOptions = Apollo.BaseMutationOptions<SetUnverifyWireBillingOptionMutation, SetUnverifyWireBillingOptionMutationVariables>;