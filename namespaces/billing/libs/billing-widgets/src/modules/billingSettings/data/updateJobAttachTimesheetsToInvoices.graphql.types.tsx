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
export type UpdateJobAttachTimesheetsToInvoicesMutationVariables = Types.Exact<{
  input: Types.UpdateJobAttachTimesheetsToInvoicesInput;
}>;


export type UpdateJobAttachTimesheetsToInvoicesMutation = { updateJobAttachTimesheetsToInvoices?: Types.Maybe<{ notice?: Types.Maybe<string>, success: boolean, job?: Types.Maybe<{ id: string, attachTimesheetsToInvoices?: Types.Maybe<boolean> }>, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_> }> };


export const UpdateJobAttachTimesheetsToInvoicesDocument = gql`
    mutation UpdateJobAttachTimesheetsToInvoices($input: UpdateJobAttachTimesheetsToInvoicesInput!) {
  updateJobAttachTimesheetsToInvoices(input: $input) {
    job {
      id
      attachTimesheetsToInvoices
    }
    errors {
      ...UserErrorFragment
    }
    notice
    success
  }
}
    ${UserErrorFragmentDoc}`;
export type UpdateJobAttachTimesheetsToInvoicesMutationFn = Apollo.MutationFunction<UpdateJobAttachTimesheetsToInvoicesMutation, UpdateJobAttachTimesheetsToInvoicesMutationVariables>;

/**
 * __useUpdateJobAttachTimesheetsToInvoicesMutation__
 *
 * To run a mutation, you first call `useUpdateJobAttachTimesheetsToInvoicesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateJobAttachTimesheetsToInvoicesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateJobAttachTimesheetsToInvoicesMutation, { data, loading, error }] = useUpdateJobAttachTimesheetsToInvoicesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateJobAttachTimesheetsToInvoicesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateJobAttachTimesheetsToInvoicesMutation, UpdateJobAttachTimesheetsToInvoicesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateJobAttachTimesheetsToInvoicesMutation, UpdateJobAttachTimesheetsToInvoicesMutationVariables>(UpdateJobAttachTimesheetsToInvoicesDocument, options);
      }
export type UpdateJobAttachTimesheetsToInvoicesMutationHookResult = ReturnType<typeof useUpdateJobAttachTimesheetsToInvoicesMutation>;
export type UpdateJobAttachTimesheetsToInvoicesMutationResult = Apollo.MutationResult<UpdateJobAttachTimesheetsToInvoicesMutation>;
export type UpdateJobAttachTimesheetsToInvoicesMutationOptions = Apollo.BaseMutationOptions<UpdateJobAttachTimesheetsToInvoicesMutation, UpdateJobAttachTimesheetsToInvoicesMutationVariables>;