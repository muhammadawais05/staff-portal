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
export type SetUpdateClientCollectionSpeedMutationVariables = Types.Exact<{
  input: Types.UpdateClientCollectionSpeedInput;
}>;


export type SetUpdateClientCollectionSpeedMutation = { updateClientCollectionSpeed?: Types.Maybe<{ success: boolean, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_>, client?: Types.Maybe<{ id: string, collectionSpeed?: Types.Maybe<Types.ClientCollectionSpeed> }> }> };


export const SetUpdateClientCollectionSpeedDocument = gql`
    mutation SetUpdateClientCollectionSpeed($input: UpdateClientCollectionSpeedInput!) {
  updateClientCollectionSpeed(input: $input) {
    errors {
      ...UserErrorFragment
    }
    success
    client {
      id
      collectionSpeed
    }
  }
}
    ${UserErrorFragmentDoc}`;
export type SetUpdateClientCollectionSpeedMutationFn = Apollo.MutationFunction<SetUpdateClientCollectionSpeedMutation, SetUpdateClientCollectionSpeedMutationVariables>;

/**
 * __useSetUpdateClientCollectionSpeedMutation__
 *
 * To run a mutation, you first call `useSetUpdateClientCollectionSpeedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUpdateClientCollectionSpeedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUpdateClientCollectionSpeedMutation, { data, loading, error }] = useSetUpdateClientCollectionSpeedMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUpdateClientCollectionSpeedMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetUpdateClientCollectionSpeedMutation, SetUpdateClientCollectionSpeedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetUpdateClientCollectionSpeedMutation, SetUpdateClientCollectionSpeedMutationVariables>(SetUpdateClientCollectionSpeedDocument, options);
      }
export type SetUpdateClientCollectionSpeedMutationHookResult = ReturnType<typeof useSetUpdateClientCollectionSpeedMutation>;
export type SetUpdateClientCollectionSpeedMutationResult = Apollo.MutationResult<SetUpdateClientCollectionSpeedMutation>;
export type SetUpdateClientCollectionSpeedMutationOptions = Apollo.BaseMutationOptions<SetUpdateClientCollectionSpeedMutation, SetUpdateClientCollectionSpeedMutationVariables>;