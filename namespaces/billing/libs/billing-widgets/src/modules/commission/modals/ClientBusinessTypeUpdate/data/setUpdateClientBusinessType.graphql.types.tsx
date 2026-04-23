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
export type SetUpdateClientBusinessTypeMutationVariables = Types.Exact<{
  input: Types.UpdateClientBusinessTypeInput;
}>;


export type SetUpdateClientBusinessTypeMutation = { updateClientBusinessType?: Types.Maybe<{ success: boolean, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_> }> };


export const SetUpdateClientBusinessTypeDocument = gql`
    mutation SetUpdateClientBusinessType($input: UpdateClientBusinessTypeInput!) {
  updateClientBusinessType(input: $input) {
    success
    errors {
      ...UserErrorFragment
    }
  }
}
    ${UserErrorFragmentDoc}`;
export type SetUpdateClientBusinessTypeMutationFn = Apollo.MutationFunction<SetUpdateClientBusinessTypeMutation, SetUpdateClientBusinessTypeMutationVariables>;

/**
 * __useSetUpdateClientBusinessTypeMutation__
 *
 * To run a mutation, you first call `useSetUpdateClientBusinessTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUpdateClientBusinessTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUpdateClientBusinessTypeMutation, { data, loading, error }] = useSetUpdateClientBusinessTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUpdateClientBusinessTypeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetUpdateClientBusinessTypeMutation, SetUpdateClientBusinessTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetUpdateClientBusinessTypeMutation, SetUpdateClientBusinessTypeMutationVariables>(SetUpdateClientBusinessTypeDocument, options);
      }
export type SetUpdateClientBusinessTypeMutationHookResult = ReturnType<typeof useSetUpdateClientBusinessTypeMutation>;
export type SetUpdateClientBusinessTypeMutationResult = Apollo.MutationResult<SetUpdateClientBusinessTypeMutation>;
export type SetUpdateClientBusinessTypeMutationOptions = Apollo.BaseMutationOptions<SetUpdateClientBusinessTypeMutation, SetUpdateClientBusinessTypeMutationVariables>;