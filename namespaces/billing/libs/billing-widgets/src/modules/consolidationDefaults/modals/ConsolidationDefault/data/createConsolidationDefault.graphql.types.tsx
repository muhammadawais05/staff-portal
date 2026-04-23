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
export type CreateConsolidationDefaultMutationVariables = Types.Exact<{
  input: Types.CreateConsolidationDefaultInput;
}>;


export type CreateConsolidationDefaultMutation = { createConsolidationDefault?: Types.Maybe<{ success: boolean, consolidationDefault?: Types.Maybe<{ id: string, name: string, client: { id: string } }>, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_> }> };


export const CreateConsolidationDefaultDocument = gql`
    mutation CreateConsolidationDefault($input: CreateConsolidationDefaultInput!) {
  createConsolidationDefault(input: $input) {
    success
    consolidationDefault {
      id
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
export type CreateConsolidationDefaultMutationFn = Apollo.MutationFunction<CreateConsolidationDefaultMutation, CreateConsolidationDefaultMutationVariables>;

/**
 * __useCreateConsolidationDefaultMutation__
 *
 * To run a mutation, you first call `useCreateConsolidationDefaultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConsolidationDefaultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConsolidationDefaultMutation, { data, loading, error }] = useCreateConsolidationDefaultMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateConsolidationDefaultMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateConsolidationDefaultMutation, CreateConsolidationDefaultMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateConsolidationDefaultMutation, CreateConsolidationDefaultMutationVariables>(CreateConsolidationDefaultDocument, options);
      }
export type CreateConsolidationDefaultMutationHookResult = ReturnType<typeof useCreateConsolidationDefaultMutation>;
export type CreateConsolidationDefaultMutationResult = Apollo.MutationResult<CreateConsolidationDefaultMutation>;
export type CreateConsolidationDefaultMutationOptions = Apollo.BaseMutationOptions<CreateConsolidationDefaultMutation, CreateConsolidationDefaultMutationVariables>;