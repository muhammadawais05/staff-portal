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
export type EditJobInvoiceNoteMutationVariables = Types.Exact<{
  input: Types.EditJobInvoiceNoteInput;
}>;


export type EditJobInvoiceNoteMutation = { editJobInvoiceNote?: Types.Maybe<{ notice?: Types.Maybe<string>, success: boolean, job?: Types.Maybe<{ id: string, invoiceNote?: Types.Maybe<string> }>, errors: Array<{ code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string }> }> };


export const EditJobInvoiceNoteDocument = gql`
    mutation EditJobInvoiceNote($input: EditJobInvoiceNoteInput!) {
  editJobInvoiceNote(input: $input) {
    job {
      id
      invoiceNote
    }
    errors {
      code
      key
      message
    }
    notice
    success
  }
}
    `;
export type EditJobInvoiceNoteMutationFn = Apollo.MutationFunction<EditJobInvoiceNoteMutation, EditJobInvoiceNoteMutationVariables>;

/**
 * __useEditJobInvoiceNoteMutation__
 *
 * To run a mutation, you first call `useEditJobInvoiceNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditJobInvoiceNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editJobInvoiceNoteMutation, { data, loading, error }] = useEditJobInvoiceNoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditJobInvoiceNoteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditJobInvoiceNoteMutation, EditJobInvoiceNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditJobInvoiceNoteMutation, EditJobInvoiceNoteMutationVariables>(EditJobInvoiceNoteDocument, options);
      }
export type EditJobInvoiceNoteMutationHookResult = ReturnType<typeof useEditJobInvoiceNoteMutation>;
export type EditJobInvoiceNoteMutationResult = Apollo.MutationResult<EditJobInvoiceNoteMutation>;
export type EditJobInvoiceNoteMutationOptions = Apollo.BaseMutationOptions<EditJobInvoiceNoteMutation, EditJobInvoiceNoteMutationVariables>;