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
export type UpdateConsolidationDefaultMutationVariables = Types.Exact<{
  input: Types.UpdateConsolidationDefaultInput;
}>;


export type UpdateConsolidationDefaultMutation = { updateConsolidationDefault?: Types.Maybe<{ success: boolean, consolidationDefault?: Types.Maybe<{ name: string, client: { id: string } }>, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_> }> };


export const UpdateConsolidationDefaultDocument = gql`
    mutation UpdateConsolidationDefault($input: UpdateConsolidationDefaultInput!) {
  updateConsolidationDefault(input: $input) {
    success
    consolidationDefault {
      name
      client {
        id
      }
    }
    errors {
      ...UserErrorFragment
    }
  }
}
    ${UserErrorFragmentDoc}`;
export type UpdateConsolidationDefaultMutationFn = Apollo.MutationFunction<UpdateConsolidationDefaultMutation, UpdateConsolidationDefaultMutationVariables>;

/**
 * __useUpdateConsolidationDefaultMutation__
 *
 * To run a mutation, you first call `useUpdateConsolidationDefaultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateConsolidationDefaultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateConsolidationDefaultMutation, { data, loading, error }] = useUpdateConsolidationDefaultMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateConsolidationDefaultMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateConsolidationDefaultMutation, UpdateConsolidationDefaultMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateConsolidationDefaultMutation, UpdateConsolidationDefaultMutationVariables>(UpdateConsolidationDefaultDocument, options);
      }
export type UpdateConsolidationDefaultMutationHookResult = ReturnType<typeof useUpdateConsolidationDefaultMutation>;
export type UpdateConsolidationDefaultMutationResult = Apollo.MutationResult<UpdateConsolidationDefaultMutation>;
export type UpdateConsolidationDefaultMutationOptions = Apollo.BaseMutationOptions<UpdateConsolidationDefaultMutation, UpdateConsolidationDefaultMutationVariables>;