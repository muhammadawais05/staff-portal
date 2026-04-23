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
export type ReverifyCreditCardBillingOptionMutationVariables = Types.Exact<{
  input: Types.ReverifyCreditCardBillingOptionInput;
}>;


export type ReverifyCreditCardBillingOptionMutation = { reverifyCreditCardBillingOption?: Types.Maybe<{ success: boolean, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_>, billingOption?: Types.Maybe<{ id: string } | { id: string } | { id: string } | { id: string } | { id: string }> }> };


export const ReverifyCreditCardBillingOptionDocument = gql`
    mutation ReverifyCreditCardBillingOption($input: ReverifyCreditCardBillingOptionInput!) {
  reverifyCreditCardBillingOption(input: $input) {
    errors {
      ...UserErrorFragment
    }
    success
    billingOption {
      id
    }
  }
}
    ${UserErrorFragmentDoc}`;
export type ReverifyCreditCardBillingOptionMutationFn = Apollo.MutationFunction<ReverifyCreditCardBillingOptionMutation, ReverifyCreditCardBillingOptionMutationVariables>;

/**
 * __useReverifyCreditCardBillingOptionMutation__
 *
 * To run a mutation, you first call `useReverifyCreditCardBillingOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReverifyCreditCardBillingOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reverifyCreditCardBillingOptionMutation, { data, loading, error }] = useReverifyCreditCardBillingOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReverifyCreditCardBillingOptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReverifyCreditCardBillingOptionMutation, ReverifyCreditCardBillingOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ReverifyCreditCardBillingOptionMutation, ReverifyCreditCardBillingOptionMutationVariables>(ReverifyCreditCardBillingOptionDocument, options);
      }
export type ReverifyCreditCardBillingOptionMutationHookResult = ReturnType<typeof useReverifyCreditCardBillingOptionMutation>;
export type ReverifyCreditCardBillingOptionMutationResult = Apollo.MutationResult<ReverifyCreditCardBillingOptionMutation>;
export type ReverifyCreditCardBillingOptionMutationOptions = Apollo.BaseMutationOptions<ReverifyCreditCardBillingOptionMutation, ReverifyCreditCardBillingOptionMutationVariables>;