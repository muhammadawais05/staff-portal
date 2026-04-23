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
export type RemoveEnterpriseBillingOptionMutationVariables = Types.Exact<{
  input: Types.RemoveEnterpriseBillingOptionInput;
}>;


export type RemoveEnterpriseBillingOptionMutation = { removeEnterpriseBillingOption?: Types.Maybe<{ success: boolean, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_>, billingOption?: Types.Maybe<{ id: string } | { id: string } | { id: string } | { id: string } | { id: string }> }> };


export const RemoveEnterpriseBillingOptionDocument = gql`
    mutation RemoveEnterpriseBillingOption($input: RemoveEnterpriseBillingOptionInput!) {
  removeEnterpriseBillingOption(input: $input) {
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
export type RemoveEnterpriseBillingOptionMutationFn = Apollo.MutationFunction<RemoveEnterpriseBillingOptionMutation, RemoveEnterpriseBillingOptionMutationVariables>;

/**
 * __useRemoveEnterpriseBillingOptionMutation__
 *
 * To run a mutation, you first call `useRemoveEnterpriseBillingOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveEnterpriseBillingOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeEnterpriseBillingOptionMutation, { data, loading, error }] = useRemoveEnterpriseBillingOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveEnterpriseBillingOptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveEnterpriseBillingOptionMutation, RemoveEnterpriseBillingOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveEnterpriseBillingOptionMutation, RemoveEnterpriseBillingOptionMutationVariables>(RemoveEnterpriseBillingOptionDocument, options);
      }
export type RemoveEnterpriseBillingOptionMutationHookResult = ReturnType<typeof useRemoveEnterpriseBillingOptionMutation>;
export type RemoveEnterpriseBillingOptionMutationResult = Apollo.MutationResult<RemoveEnterpriseBillingOptionMutation>;
export type RemoveEnterpriseBillingOptionMutationOptions = Apollo.BaseMutationOptions<RemoveEnterpriseBillingOptionMutation, RemoveEnterpriseBillingOptionMutationVariables>;