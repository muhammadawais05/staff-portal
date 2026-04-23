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
export type UnsetPreferredBillingOptionMutationVariables = Types.Exact<{
  input: Types.UnsetPreferredBillingOptionInput;
}>;


export type UnsetPreferredBillingOptionMutation = { unsetPreferredBillingOption?: Types.Maybe<{ success: boolean, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_>, billingOption?: Types.Maybe<{ id: string } | { id: string } | { id: string } | { id: string } | { id: string }> }> };


export const UnsetPreferredBillingOptionDocument = gql`
    mutation UnsetPreferredBillingOption($input: UnsetPreferredBillingOptionInput!) {
  unsetPreferredBillingOption(input: $input) {
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
export type UnsetPreferredBillingOptionMutationFn = Apollo.MutationFunction<UnsetPreferredBillingOptionMutation, UnsetPreferredBillingOptionMutationVariables>;

/**
 * __useUnsetPreferredBillingOptionMutation__
 *
 * To run a mutation, you first call `useUnsetPreferredBillingOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsetPreferredBillingOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsetPreferredBillingOptionMutation, { data, loading, error }] = useUnsetPreferredBillingOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnsetPreferredBillingOptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnsetPreferredBillingOptionMutation, UnsetPreferredBillingOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UnsetPreferredBillingOptionMutation, UnsetPreferredBillingOptionMutationVariables>(UnsetPreferredBillingOptionDocument, options);
      }
export type UnsetPreferredBillingOptionMutationHookResult = ReturnType<typeof useUnsetPreferredBillingOptionMutation>;
export type UnsetPreferredBillingOptionMutationResult = Apollo.MutationResult<UnsetPreferredBillingOptionMutation>;
export type UnsetPreferredBillingOptionMutationOptions = Apollo.BaseMutationOptions<UnsetPreferredBillingOptionMutation, UnsetPreferredBillingOptionMutationVariables>;