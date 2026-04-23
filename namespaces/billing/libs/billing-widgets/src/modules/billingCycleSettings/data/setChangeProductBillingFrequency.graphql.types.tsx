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
export type SetChangeProductBillingFrequencyMutationVariables = Types.Exact<{
  input: Types.ChangeProductBillingFrequencyInput;
}>;


export type SetChangeProductBillingFrequencyMutation = { changeProductBillingFrequency?: Types.Maybe<{ success: boolean, engagement: { id: string, billDay?: Types.Maybe<Types.WeekDay>, billCycle?: Types.Maybe<Types.BillCycle> }, errors: Array<{ code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string }> }> };


export const SetChangeProductBillingFrequencyDocument = gql`
    mutation SetChangeProductBillingFrequency($input: ChangeProductBillingFrequencyInput!) {
  changeProductBillingFrequency(input: $input) {
    engagement {
      id
      billDay
      billCycle
    }
    success
    errors {
      code
      key
      message
    }
  }
}
    `;
export type SetChangeProductBillingFrequencyMutationFn = Apollo.MutationFunction<SetChangeProductBillingFrequencyMutation, SetChangeProductBillingFrequencyMutationVariables>;

/**
 * __useSetChangeProductBillingFrequencyMutation__
 *
 * To run a mutation, you first call `useSetChangeProductBillingFrequencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetChangeProductBillingFrequencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setChangeProductBillingFrequencyMutation, { data, loading, error }] = useSetChangeProductBillingFrequencyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetChangeProductBillingFrequencyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetChangeProductBillingFrequencyMutation, SetChangeProductBillingFrequencyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetChangeProductBillingFrequencyMutation, SetChangeProductBillingFrequencyMutationVariables>(SetChangeProductBillingFrequencyDocument, options);
      }
export type SetChangeProductBillingFrequencyMutationHookResult = ReturnType<typeof useSetChangeProductBillingFrequencyMutation>;
export type SetChangeProductBillingFrequencyMutationResult = Apollo.MutationResult<SetChangeProductBillingFrequencyMutation>;
export type SetChangeProductBillingFrequencyMutationOptions = Apollo.BaseMutationOptions<SetChangeProductBillingFrequencyMutation, SetChangeProductBillingFrequencyMutationVariables>;