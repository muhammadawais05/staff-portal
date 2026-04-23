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
export type SetLogClientBillingInformationMutationVariables = Types.Exact<{
  input: Types.LogClientBillingInformationInput;
}>;


export type SetLogClientBillingInformationMutation = { logClientBillingInformation?: Types.Maybe<{ notice?: Types.Maybe<string>, success: boolean, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_> }> };


export const SetLogClientBillingInformationDocument = gql`
    mutation SetLogClientBillingInformation($input: LogClientBillingInformationInput!) {
  logClientBillingInformation(input: $input) {
    notice
    success
    errors {
      ...UserErrorFragment
    }
  }
}
    ${UserErrorFragmentDoc}`;
export type SetLogClientBillingInformationMutationFn = Apollo.MutationFunction<SetLogClientBillingInformationMutation, SetLogClientBillingInformationMutationVariables>;

/**
 * __useSetLogClientBillingInformationMutation__
 *
 * To run a mutation, you first call `useSetLogClientBillingInformationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetLogClientBillingInformationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setLogClientBillingInformationMutation, { data, loading, error }] = useSetLogClientBillingInformationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetLogClientBillingInformationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetLogClientBillingInformationMutation, SetLogClientBillingInformationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetLogClientBillingInformationMutation, SetLogClientBillingInformationMutationVariables>(SetLogClientBillingInformationDocument, options);
      }
export type SetLogClientBillingInformationMutationHookResult = ReturnType<typeof useSetLogClientBillingInformationMutation>;
export type SetLogClientBillingInformationMutationResult = Apollo.MutationResult<SetLogClientBillingInformationMutation>;
export type SetLogClientBillingInformationMutationOptions = Apollo.BaseMutationOptions<SetLogClientBillingInformationMutation, SetLogClientBillingInformationMutationVariables>;