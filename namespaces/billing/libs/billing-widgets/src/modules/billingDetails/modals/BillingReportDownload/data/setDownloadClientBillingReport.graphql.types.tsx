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
export type SetDownloadClientBillingReportMutationVariables = Types.Exact<{
  input: Types.DownloadClientBillingReportInput;
}>;


export type SetDownloadClientBillingReportMutation = { downloadClientBillingReport?: Types.Maybe<{ success: boolean, downloadUrl?: Types.Maybe<string>, errors: Array<{ key: string, code: string, message: string } | { key: string, code: string, message: string } | { key: string, code: string, message: string } | { key: string, code: string, message: string } | { key: string, code: string, message: string }> }> };


export const SetDownloadClientBillingReportDocument = gql`
    mutation SetDownloadClientBillingReport($input: DownloadClientBillingReportInput!) {
  downloadClientBillingReport(input: $input) {
    success
    errors {
      key
      code
      message
    }
    downloadUrl
  }
}
    `;
export type SetDownloadClientBillingReportMutationFn = Apollo.MutationFunction<SetDownloadClientBillingReportMutation, SetDownloadClientBillingReportMutationVariables>;

/**
 * __useSetDownloadClientBillingReportMutation__
 *
 * To run a mutation, you first call `useSetDownloadClientBillingReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDownloadClientBillingReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDownloadClientBillingReportMutation, { data, loading, error }] = useSetDownloadClientBillingReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetDownloadClientBillingReportMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetDownloadClientBillingReportMutation, SetDownloadClientBillingReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetDownloadClientBillingReportMutation, SetDownloadClientBillingReportMutationVariables>(SetDownloadClientBillingReportDocument, options);
      }
export type SetDownloadClientBillingReportMutationHookResult = ReturnType<typeof useSetDownloadClientBillingReportMutation>;
export type SetDownloadClientBillingReportMutationResult = Apollo.MutationResult<SetDownloadClientBillingReportMutation>;
export type SetDownloadClientBillingReportMutationOptions = Apollo.BaseMutationOptions<SetDownloadClientBillingReportMutation, SetDownloadClientBillingReportMutationVariables>;