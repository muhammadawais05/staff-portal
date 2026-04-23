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
export type SetUpdateClientCommitmentMutationVariables = Types.Exact<{
  input: Types.UpdateClientCommitmentInput;
}>;


export type SetUpdateClientCommitmentMutation = { updateClientCommitment?: Types.Maybe<{ success: boolean, errors: Array<{ key: string, code: string, message: string } | { key: string, code: string, message: string } | { key: string, code: string, message: string } | { key: string, code: string, message: string } | { key: string, code: string, message: string }>, client?: Types.Maybe<{ id: string, commitmentSettings?: Types.Maybe<{ minimumHours: number }> }> }> };


export const SetUpdateClientCommitmentDocument = gql`
    mutation SetUpdateClientCommitment($input: UpdateClientCommitmentInput!) {
  updateClientCommitment(input: $input) {
    success
    errors {
      key
      code
      message
    }
    client {
      id
      commitmentSettings {
        minimumHours
      }
    }
  }
}
    `;
export type SetUpdateClientCommitmentMutationFn = Apollo.MutationFunction<SetUpdateClientCommitmentMutation, SetUpdateClientCommitmentMutationVariables>;

/**
 * __useSetUpdateClientCommitmentMutation__
 *
 * To run a mutation, you first call `useSetUpdateClientCommitmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUpdateClientCommitmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUpdateClientCommitmentMutation, { data, loading, error }] = useSetUpdateClientCommitmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUpdateClientCommitmentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetUpdateClientCommitmentMutation, SetUpdateClientCommitmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetUpdateClientCommitmentMutation, SetUpdateClientCommitmentMutationVariables>(SetUpdateClientCommitmentDocument, options);
      }
export type SetUpdateClientCommitmentMutationHookResult = ReturnType<typeof useSetUpdateClientCommitmentMutation>;
export type SetUpdateClientCommitmentMutationResult = Apollo.MutationResult<SetUpdateClientCommitmentMutation>;
export type SetUpdateClientCommitmentMutationOptions = Apollo.BaseMutationOptions<SetUpdateClientCommitmentMutation, SetUpdateClientCommitmentMutationVariables>;