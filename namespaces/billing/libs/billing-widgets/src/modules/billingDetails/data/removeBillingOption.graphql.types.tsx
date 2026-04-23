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
export type RemoveBillingOptionMutationVariables = Types.Exact<{
  input: Types.RemoveBillingOptionInput;
}>;


export type RemoveBillingOptionMutation = { removeBillingOption?: Types.Maybe<{ success: boolean, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_>, billingOption?: Types.Maybe<{ id: string } | { id: string } | { id: string } | { id: string } | { id: string }> }> };


export const RemoveBillingOptionDocument = gql`
    mutation RemoveBillingOption($input: RemoveBillingOptionInput!) {
  removeBillingOption(input: $input) {
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
export type RemoveBillingOptionMutationFn = Apollo.MutationFunction<RemoveBillingOptionMutation, RemoveBillingOptionMutationVariables>;

/**
 * __useRemoveBillingOptionMutation__
 *
 * To run a mutation, you first call `useRemoveBillingOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBillingOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBillingOptionMutation, { data, loading, error }] = useRemoveBillingOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveBillingOptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveBillingOptionMutation, RemoveBillingOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveBillingOptionMutation, RemoveBillingOptionMutationVariables>(RemoveBillingOptionDocument, options);
      }
export type RemoveBillingOptionMutationHookResult = ReturnType<typeof useRemoveBillingOptionMutation>;
export type RemoveBillingOptionMutationResult = Apollo.MutationResult<RemoveBillingOptionMutation>;
export type RemoveBillingOptionMutationOptions = Apollo.BaseMutationOptions<RemoveBillingOptionMutation, RemoveBillingOptionMutationVariables>;