/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { UserErrorFragment_AssignScreeningSpecialistsError_, UserErrorFragment_P2PStandardUserError_, UserErrorFragment_SpecialistAssignmentBulkActionError_, UserErrorFragment_StandardUserError_, UserErrorFragment_TopcallUserError_ } from '../../../__fragments__/userErrorFragment.graphql.types';
import { gql } from '@apollo/client';
import { UserErrorFragmentDoc } from '../../../__fragments__/userErrorFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type RecordUnappliedCashMutationVariables = Types.Exact<{
  input: Types.RecordUnappliedCashInput;
}>;


export type RecordUnappliedCashMutation = { recordUnappliedCash?: Types.Maybe<{ clientMutationId?: Types.Maybe<string>, success: boolean, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_> }> };


export const RecordUnappliedCashDocument = gql`
    mutation RecordUnappliedCash($input: RecordUnappliedCashInput!) {
  recordUnappliedCash(input: $input) {
    clientMutationId
    success
    errors {
      ...UserErrorFragment
    }
  }
}
    ${UserErrorFragmentDoc}`;
export type RecordUnappliedCashMutationFn = Apollo.MutationFunction<RecordUnappliedCashMutation, RecordUnappliedCashMutationVariables>;

/**
 * __useRecordUnappliedCashMutation__
 *
 * To run a mutation, you first call `useRecordUnappliedCashMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecordUnappliedCashMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recordUnappliedCashMutation, { data, loading, error }] = useRecordUnappliedCashMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRecordUnappliedCashMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RecordUnappliedCashMutation, RecordUnappliedCashMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RecordUnappliedCashMutation, RecordUnappliedCashMutationVariables>(RecordUnappliedCashDocument, options);
      }
export type RecordUnappliedCashMutationHookResult = ReturnType<typeof useRecordUnappliedCashMutation>;
export type RecordUnappliedCashMutationResult = Apollo.MutationResult<RecordUnappliedCashMutation>;
export type RecordUnappliedCashMutationOptions = Apollo.BaseMutationOptions<RecordUnappliedCashMutation, RecordUnappliedCashMutationVariables>;