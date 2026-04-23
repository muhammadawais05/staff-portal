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
export type SetUpdateClientNetTermsMutationVariables = Types.Exact<{
  input: Types.UpdateClientNetTermsInput;
}>;


export type SetUpdateClientNetTermsMutation = { updateClientNetTerms?: Types.Maybe<{ success: boolean, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_>, client?: Types.Maybe<{ id: string, netTerms: number }> }> };


export const SetUpdateClientNetTermsDocument = gql`
    mutation SetUpdateClientNetTerms($input: UpdateClientNetTermsInput!) {
  updateClientNetTerms(input: $input) {
    errors {
      ...UserErrorFragment
    }
    success
    client {
      id
      netTerms
    }
  }
}
    ${UserErrorFragmentDoc}`;
export type SetUpdateClientNetTermsMutationFn = Apollo.MutationFunction<SetUpdateClientNetTermsMutation, SetUpdateClientNetTermsMutationVariables>;

/**
 * __useSetUpdateClientNetTermsMutation__
 *
 * To run a mutation, you first call `useSetUpdateClientNetTermsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUpdateClientNetTermsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUpdateClientNetTermsMutation, { data, loading, error }] = useSetUpdateClientNetTermsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUpdateClientNetTermsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetUpdateClientNetTermsMutation, SetUpdateClientNetTermsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetUpdateClientNetTermsMutation, SetUpdateClientNetTermsMutationVariables>(SetUpdateClientNetTermsDocument, options);
      }
export type SetUpdateClientNetTermsMutationHookResult = ReturnType<typeof useSetUpdateClientNetTermsMutation>;
export type SetUpdateClientNetTermsMutationResult = Apollo.MutationResult<SetUpdateClientNetTermsMutation>;
export type SetUpdateClientNetTermsMutationOptions = Apollo.BaseMutationOptions<SetUpdateClientNetTermsMutation, SetUpdateClientNetTermsMutationVariables>;