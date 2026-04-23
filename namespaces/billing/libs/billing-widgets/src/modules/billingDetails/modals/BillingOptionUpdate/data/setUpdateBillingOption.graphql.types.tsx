/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { UserErrorFragment_AssignScreeningSpecialistsError_, UserErrorFragment_P2PStandardUserError_, UserErrorFragment_SpecialistAssignmentBulkActionError_, UserErrorFragment_StandardUserError_, UserErrorFragment_TopcallUserError_ } from '../../../../__fragments__/userErrorFragment.graphql.types';
import { gql } from '@apollo/client';
import { UserErrorFragmentDoc } from '../../../../__fragments__/userErrorFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type SetUpdateBillingOptionMutationVariables = Types.Exact<{
  input: Types.UpdateBillingOptionInput;
}>;


export type SetUpdateBillingOptionMutation = { updateBillingOption?: Types.Maybe<{ success: boolean, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_> }> };


export const SetUpdateBillingOptionDocument = gql`
    mutation SetUpdateBillingOption($input: UpdateBillingOptionInput!) {
  updateBillingOption(input: $input) {
    success
    errors {
      ...UserErrorFragment
    }
  }
}
    ${UserErrorFragmentDoc}`;
export type SetUpdateBillingOptionMutationFn = Apollo.MutationFunction<SetUpdateBillingOptionMutation, SetUpdateBillingOptionMutationVariables>;

/**
 * __useSetUpdateBillingOptionMutation__
 *
 * To run a mutation, you first call `useSetUpdateBillingOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUpdateBillingOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUpdateBillingOptionMutation, { data, loading, error }] = useSetUpdateBillingOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUpdateBillingOptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetUpdateBillingOptionMutation, SetUpdateBillingOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetUpdateBillingOptionMutation, SetUpdateBillingOptionMutationVariables>(SetUpdateBillingOptionDocument, options);
      }
export type SetUpdateBillingOptionMutationHookResult = ReturnType<typeof useSetUpdateBillingOptionMutation>;
export type SetUpdateBillingOptionMutationResult = Apollo.MutationResult<SetUpdateBillingOptionMutation>;
export type SetUpdateBillingOptionMutationOptions = Apollo.BaseMutationOptions<SetUpdateBillingOptionMutation, SetUpdateBillingOptionMutationVariables>;