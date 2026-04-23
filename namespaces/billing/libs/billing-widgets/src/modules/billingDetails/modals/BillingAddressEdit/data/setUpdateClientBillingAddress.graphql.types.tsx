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
export type SetUpdateClientBillingAddressMutationVariables = Types.Exact<{
  input: Types.UpdateClientBillingAddressInput;
}>;


export type SetUpdateClientBillingAddressMutation = { updateClientBillingAddress?: Types.Maybe<{ notice?: Types.Maybe<string>, success: boolean, errors: Array<{ key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string }> }> };


export const SetUpdateClientBillingAddressDocument = gql`
    mutation SetUpdateClientBillingAddress($input: UpdateClientBillingAddressInput!) {
  updateClientBillingAddress(input: $input) {
    notice
    success
    errors {
      key
      message
      code
    }
  }
}
    `;
export type SetUpdateClientBillingAddressMutationFn = Apollo.MutationFunction<SetUpdateClientBillingAddressMutation, SetUpdateClientBillingAddressMutationVariables>;

/**
 * __useSetUpdateClientBillingAddressMutation__
 *
 * To run a mutation, you first call `useSetUpdateClientBillingAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUpdateClientBillingAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUpdateClientBillingAddressMutation, { data, loading, error }] = useSetUpdateClientBillingAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUpdateClientBillingAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetUpdateClientBillingAddressMutation, SetUpdateClientBillingAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetUpdateClientBillingAddressMutation, SetUpdateClientBillingAddressMutationVariables>(SetUpdateClientBillingAddressDocument, options);
      }
export type SetUpdateClientBillingAddressMutationHookResult = ReturnType<typeof useSetUpdateClientBillingAddressMutation>;
export type SetUpdateClientBillingAddressMutationResult = Apollo.MutationResult<SetUpdateClientBillingAddressMutation>;
export type SetUpdateClientBillingAddressMutationOptions = Apollo.BaseMutationOptions<SetUpdateClientBillingAddressMutation, SetUpdateClientBillingAddressMutationVariables>;