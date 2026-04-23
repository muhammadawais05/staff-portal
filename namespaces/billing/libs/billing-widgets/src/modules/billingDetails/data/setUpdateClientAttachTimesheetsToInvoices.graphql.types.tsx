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
export type SetUpdateClientAttachTimesheetsToInvoicesMutationVariables = Types.Exact<{
  input: Types.UpdateClientAttachTimesheetsToInvoicesInput;
}>;


export type SetUpdateClientAttachTimesheetsToInvoicesMutation = { updateClientAttachTimesheetsToInvoices?: Types.Maybe<{ success: boolean, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_>, client?: Types.Maybe<{ id: string, attachTimesheetsToInvoices?: Types.Maybe<boolean> }> }> };


export const SetUpdateClientAttachTimesheetsToInvoicesDocument = gql`
    mutation SetUpdateClientAttachTimesheetsToInvoices($input: UpdateClientAttachTimesheetsToInvoicesInput!) {
  updateClientAttachTimesheetsToInvoices(input: $input) {
    errors {
      ...UserErrorFragment
    }
    success
    client {
      id
      attachTimesheetsToInvoices
    }
  }
}
    ${UserErrorFragmentDoc}`;
export type SetUpdateClientAttachTimesheetsToInvoicesMutationFn = Apollo.MutationFunction<SetUpdateClientAttachTimesheetsToInvoicesMutation, SetUpdateClientAttachTimesheetsToInvoicesMutationVariables>;

/**
 * __useSetUpdateClientAttachTimesheetsToInvoicesMutation__
 *
 * To run a mutation, you first call `useSetUpdateClientAttachTimesheetsToInvoicesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUpdateClientAttachTimesheetsToInvoicesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUpdateClientAttachTimesheetsToInvoicesMutation, { data, loading, error }] = useSetUpdateClientAttachTimesheetsToInvoicesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUpdateClientAttachTimesheetsToInvoicesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetUpdateClientAttachTimesheetsToInvoicesMutation, SetUpdateClientAttachTimesheetsToInvoicesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetUpdateClientAttachTimesheetsToInvoicesMutation, SetUpdateClientAttachTimesheetsToInvoicesMutationVariables>(SetUpdateClientAttachTimesheetsToInvoicesDocument, options);
      }
export type SetUpdateClientAttachTimesheetsToInvoicesMutationHookResult = ReturnType<typeof useSetUpdateClientAttachTimesheetsToInvoicesMutation>;
export type SetUpdateClientAttachTimesheetsToInvoicesMutationResult = Apollo.MutationResult<SetUpdateClientAttachTimesheetsToInvoicesMutation>;
export type SetUpdateClientAttachTimesheetsToInvoicesMutationOptions = Apollo.BaseMutationOptions<SetUpdateClientAttachTimesheetsToInvoicesMutation, SetUpdateClientAttachTimesheetsToInvoicesMutationVariables>;