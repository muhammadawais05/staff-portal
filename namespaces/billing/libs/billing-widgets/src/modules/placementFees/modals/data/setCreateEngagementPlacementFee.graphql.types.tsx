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
export type SetCreateEngagementPlacementFeeMutationVariables = Types.Exact<{
  input: Types.CreateEngagementPlacementFeeInput;
}>;


export type SetCreateEngagementPlacementFeeMutation = { createEngagementPlacementFee?: Types.Maybe<{ success: boolean, placementFees?: Types.Maybe<{ nodes: Array<{ invoice: { description?: Types.Maybe<string>, amount: string, id: string } | { description?: Types.Maybe<string>, amount: string, id: string } }> }>, errors: Array<{ code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string }> }> };


export const SetCreateEngagementPlacementFeeDocument = gql`
    mutation SetCreateEngagementPlacementFee($input: CreateEngagementPlacementFeeInput!) {
  createEngagementPlacementFee(input: $input) {
    placementFees {
      nodes {
        invoice {
          description
          amount
          id
        }
      }
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
export type SetCreateEngagementPlacementFeeMutationFn = Apollo.MutationFunction<SetCreateEngagementPlacementFeeMutation, SetCreateEngagementPlacementFeeMutationVariables>;

/**
 * __useSetCreateEngagementPlacementFeeMutation__
 *
 * To run a mutation, you first call `useSetCreateEngagementPlacementFeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCreateEngagementPlacementFeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCreateEngagementPlacementFeeMutation, { data, loading, error }] = useSetCreateEngagementPlacementFeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetCreateEngagementPlacementFeeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetCreateEngagementPlacementFeeMutation, SetCreateEngagementPlacementFeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetCreateEngagementPlacementFeeMutation, SetCreateEngagementPlacementFeeMutationVariables>(SetCreateEngagementPlacementFeeDocument, options);
      }
export type SetCreateEngagementPlacementFeeMutationHookResult = ReturnType<typeof useSetCreateEngagementPlacementFeeMutation>;
export type SetCreateEngagementPlacementFeeMutationResult = Apollo.MutationResult<SetCreateEngagementPlacementFeeMutation>;
export type SetCreateEngagementPlacementFeeMutationOptions = Apollo.BaseMutationOptions<SetCreateEngagementPlacementFeeMutation, SetCreateEngagementPlacementFeeMutationVariables>;