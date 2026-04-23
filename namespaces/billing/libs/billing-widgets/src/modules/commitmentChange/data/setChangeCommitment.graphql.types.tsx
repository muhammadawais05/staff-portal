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
export type SetChangeCommitmentMutationVariables = Types.Exact<{
  input: Types.ChangeEngagementCommitmentInput;
}>;


export type SetChangeCommitmentMutation = { changeEngagementCommitment?: Types.Maybe<{ success: boolean, engagement?: Types.Maybe<{ id: string }>, errors: Array<{ code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string }> }> };


export const SetChangeCommitmentDocument = gql`
    mutation SetChangeCommitment($input: ChangeEngagementCommitmentInput!) {
  changeEngagementCommitment(input: $input) {
    engagement {
      id
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
export type SetChangeCommitmentMutationFn = Apollo.MutationFunction<SetChangeCommitmentMutation, SetChangeCommitmentMutationVariables>;

/**
 * __useSetChangeCommitmentMutation__
 *
 * To run a mutation, you first call `useSetChangeCommitmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetChangeCommitmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setChangeCommitmentMutation, { data, loading, error }] = useSetChangeCommitmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetChangeCommitmentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetChangeCommitmentMutation, SetChangeCommitmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetChangeCommitmentMutation, SetChangeCommitmentMutationVariables>(SetChangeCommitmentDocument, options);
      }
export type SetChangeCommitmentMutationHookResult = ReturnType<typeof useSetChangeCommitmentMutation>;
export type SetChangeCommitmentMutationResult = Apollo.MutationResult<SetChangeCommitmentMutation>;
export type SetChangeCommitmentMutationOptions = Apollo.BaseMutationOptions<SetChangeCommitmentMutation, SetChangeCommitmentMutationVariables>;