/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { UserErrorFragment_AssignScreeningSpecialistsError_, UserErrorFragment_P2PStandardUserError_, UserErrorFragment_SpecialistAssignmentBulkActionError_, UserErrorFragment_StandardUserError_, UserErrorFragment_TopcallUserError_ } from '../../__fragments__/userErrorFragment.graphql.types';
import { gql } from '@apollo/client';
import { UserErrorFragmentDoc } from '../../__fragments__/userErrorFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type PreferEnterpriseBillingOptionMutationVariables = Types.Exact<{
  input: Types.PreferEnterpriseBillingOptionInput;
}>;


export type PreferEnterpriseBillingOptionMutation = { preferEnterpriseBillingOption?: Types.Maybe<{ success: boolean, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_>, billingOption?: Types.Maybe<{ id: string } | { id: string } | { id: string } | { id: string } | { id: string }> }> };


export const PreferEnterpriseBillingOptionDocument = gql`
    mutation PreferEnterpriseBillingOption($input: PreferEnterpriseBillingOptionInput!) {
  preferEnterpriseBillingOption(input: $input) {
    errors {
      ...UserErrorFragment
    }
    success
    billingOption {
      id
    }
  }
}
    ${UserErrorFragmentDoc}`;
export type PreferEnterpriseBillingOptionMutationFn = Apollo.MutationFunction<PreferEnterpriseBillingOptionMutation, PreferEnterpriseBillingOptionMutationVariables>;

/**
 * __usePreferEnterpriseBillingOptionMutation__
 *
 * To run a mutation, you first call `usePreferEnterpriseBillingOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePreferEnterpriseBillingOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [preferEnterpriseBillingOptionMutation, { data, loading, error }] = usePreferEnterpriseBillingOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePreferEnterpriseBillingOptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PreferEnterpriseBillingOptionMutation, PreferEnterpriseBillingOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<PreferEnterpriseBillingOptionMutation, PreferEnterpriseBillingOptionMutationVariables>(PreferEnterpriseBillingOptionDocument, options);
      }
export type PreferEnterpriseBillingOptionMutationHookResult = ReturnType<typeof usePreferEnterpriseBillingOptionMutation>;
export type PreferEnterpriseBillingOptionMutationResult = Apollo.MutationResult<PreferEnterpriseBillingOptionMutation>;
export type PreferEnterpriseBillingOptionMutationOptions = Apollo.BaseMutationOptions<PreferEnterpriseBillingOptionMutation, PreferEnterpriseBillingOptionMutationVariables>;