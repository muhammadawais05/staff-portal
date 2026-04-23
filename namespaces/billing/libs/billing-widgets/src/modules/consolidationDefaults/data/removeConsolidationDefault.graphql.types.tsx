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
export type RemoveConsolidationDefaultMutationVariables = Types.Exact<{
  input: Types.RemoveConsolidationDefaultInput;
}>;


export type RemoveConsolidationDefaultMutation = { removeConsolidationDefault?: Types.Maybe<{ success: boolean, consolidationDefault?: Types.Maybe<{ id: string, name: string, deleted: boolean }>, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_> }> };


export const RemoveConsolidationDefaultDocument = gql`
    mutation RemoveConsolidationDefault($input: RemoveConsolidationDefaultInput!) {
  removeConsolidationDefault(input: $input) {
    success
    consolidationDefault {
      id
      name
      deleted
    }
    errors {
      ...UserErrorFragment
    }
  }
}
    ${UserErrorFragmentDoc}`;
export type RemoveConsolidationDefaultMutationFn = Apollo.MutationFunction<RemoveConsolidationDefaultMutation, RemoveConsolidationDefaultMutationVariables>;

/**
 * __useRemoveConsolidationDefaultMutation__
 *
 * To run a mutation, you first call `useRemoveConsolidationDefaultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveConsolidationDefaultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeConsolidationDefaultMutation, { data, loading, error }] = useRemoveConsolidationDefaultMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveConsolidationDefaultMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveConsolidationDefaultMutation, RemoveConsolidationDefaultMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveConsolidationDefaultMutation, RemoveConsolidationDefaultMutationVariables>(RemoveConsolidationDefaultDocument, options);
      }
export type RemoveConsolidationDefaultMutationHookResult = ReturnType<typeof useRemoveConsolidationDefaultMutation>;
export type RemoveConsolidationDefaultMutationResult = Apollo.MutationResult<RemoveConsolidationDefaultMutation>;
export type RemoveConsolidationDefaultMutationOptions = Apollo.BaseMutationOptions<RemoveConsolidationDefaultMutation, RemoveConsolidationDefaultMutationVariables>;