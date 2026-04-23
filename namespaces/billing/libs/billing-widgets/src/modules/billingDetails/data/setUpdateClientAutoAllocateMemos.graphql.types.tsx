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
export type SetUpdateClientAutoAllocateMemosMutationVariables = Types.Exact<{
  input: Types.UpdateClientAutoAllocateMemosInput;
}>;


export type SetUpdateClientAutoAllocateMemosMutation = { updateClientAutoAllocateMemos?: Types.Maybe<{ success: boolean, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_>, client?: Types.Maybe<{ id: string, autoAllocateMemos?: Types.Maybe<boolean> }> }> };


export const SetUpdateClientAutoAllocateMemosDocument = gql`
    mutation SetUpdateClientAutoAllocateMemos($input: UpdateClientAutoAllocateMemosInput!) {
  updateClientAutoAllocateMemos(input: $input) {
    errors {
      ...UserErrorFragment
    }
    success
    client {
      id
      autoAllocateMemos
    }
  }
}
    ${UserErrorFragmentDoc}`;
export type SetUpdateClientAutoAllocateMemosMutationFn = Apollo.MutationFunction<SetUpdateClientAutoAllocateMemosMutation, SetUpdateClientAutoAllocateMemosMutationVariables>;

/**
 * __useSetUpdateClientAutoAllocateMemosMutation__
 *
 * To run a mutation, you first call `useSetUpdateClientAutoAllocateMemosMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUpdateClientAutoAllocateMemosMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUpdateClientAutoAllocateMemosMutation, { data, loading, error }] = useSetUpdateClientAutoAllocateMemosMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUpdateClientAutoAllocateMemosMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetUpdateClientAutoAllocateMemosMutation, SetUpdateClientAutoAllocateMemosMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetUpdateClientAutoAllocateMemosMutation, SetUpdateClientAutoAllocateMemosMutationVariables>(SetUpdateClientAutoAllocateMemosDocument, options);
      }
export type SetUpdateClientAutoAllocateMemosMutationHookResult = ReturnType<typeof useSetUpdateClientAutoAllocateMemosMutation>;
export type SetUpdateClientAutoAllocateMemosMutationResult = Apollo.MutationResult<SetUpdateClientAutoAllocateMemosMutation>;
export type SetUpdateClientAutoAllocateMemosMutationOptions = Apollo.BaseMutationOptions<SetUpdateClientAutoAllocateMemosMutation, SetUpdateClientAutoAllocateMemosMutationVariables>;