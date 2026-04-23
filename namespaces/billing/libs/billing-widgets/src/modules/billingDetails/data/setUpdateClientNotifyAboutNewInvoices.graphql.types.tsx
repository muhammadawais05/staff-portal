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
export type SetUpdateClientNotifyAboutNewInvoicesMutationVariables = Types.Exact<{
  input: Types.UpdateClientNotifyAboutNewInvoicesInput;
}>;


export type SetUpdateClientNotifyAboutNewInvoicesMutation = { updateClientNotifyAboutNewInvoices?: Types.Maybe<{ success: boolean, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_>, client?: Types.Maybe<{ id: string, notifyAboutNewInvoices?: Types.Maybe<boolean> }> }> };


export const SetUpdateClientNotifyAboutNewInvoicesDocument = gql`
    mutation SetUpdateClientNotifyAboutNewInvoices($input: UpdateClientNotifyAboutNewInvoicesInput!) {
  updateClientNotifyAboutNewInvoices(input: $input) {
    errors {
      ...UserErrorFragment
    }
    success
    client {
      id
      notifyAboutNewInvoices
    }
  }
}
    ${UserErrorFragmentDoc}`;
export type SetUpdateClientNotifyAboutNewInvoicesMutationFn = Apollo.MutationFunction<SetUpdateClientNotifyAboutNewInvoicesMutation, SetUpdateClientNotifyAboutNewInvoicesMutationVariables>;

/**
 * __useSetUpdateClientNotifyAboutNewInvoicesMutation__
 *
 * To run a mutation, you first call `useSetUpdateClientNotifyAboutNewInvoicesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUpdateClientNotifyAboutNewInvoicesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUpdateClientNotifyAboutNewInvoicesMutation, { data, loading, error }] = useSetUpdateClientNotifyAboutNewInvoicesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUpdateClientNotifyAboutNewInvoicesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetUpdateClientNotifyAboutNewInvoicesMutation, SetUpdateClientNotifyAboutNewInvoicesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetUpdateClientNotifyAboutNewInvoicesMutation, SetUpdateClientNotifyAboutNewInvoicesMutationVariables>(SetUpdateClientNotifyAboutNewInvoicesDocument, options);
      }
export type SetUpdateClientNotifyAboutNewInvoicesMutationHookResult = ReturnType<typeof useSetUpdateClientNotifyAboutNewInvoicesMutation>;
export type SetUpdateClientNotifyAboutNewInvoicesMutationResult = Apollo.MutationResult<SetUpdateClientNotifyAboutNewInvoicesMutation>;
export type SetUpdateClientNotifyAboutNewInvoicesMutationOptions = Apollo.BaseMutationOptions<SetUpdateClientNotifyAboutNewInvoicesMutation, SetUpdateClientNotifyAboutNewInvoicesMutationVariables>;