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
export type SetDeleteJobTemplateMutationVariables = Types.Exact<{
  input: Types.DeleteJobTemplateInput;
}>;


export type SetDeleteJobTemplateMutation = { deleteJobTemplate?: Types.Maybe<{ clientMutationId?: Types.Maybe<string>, success: boolean, errors: Array<{ message: string, code: string, key: string } | { message: string, code: string, key: string } | { message: string, code: string, key: string } | { message: string, code: string, key: string } | { message: string, code: string, key: string }> }> };


export const SetDeleteJobTemplateDocument = gql`
    mutation SetDeleteJobTemplate($input: DeleteJobTemplateInput!) {
  deleteJobTemplate(input: $input) {
    clientMutationId
    success
    errors {
      message
      code
      key
    }
  }
}
    `;
export type SetDeleteJobTemplateMutationFn = Apollo.MutationFunction<SetDeleteJobTemplateMutation, SetDeleteJobTemplateMutationVariables>;

/**
 * __useSetDeleteJobTemplateMutation__
 *
 * To run a mutation, you first call `useSetDeleteJobTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDeleteJobTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDeleteJobTemplateMutation, { data, loading, error }] = useSetDeleteJobTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetDeleteJobTemplateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetDeleteJobTemplateMutation, SetDeleteJobTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetDeleteJobTemplateMutation, SetDeleteJobTemplateMutationVariables>(SetDeleteJobTemplateDocument, options);
      }
export type SetDeleteJobTemplateMutationHookResult = ReturnType<typeof useSetDeleteJobTemplateMutation>;
export type SetDeleteJobTemplateMutationResult = Apollo.MutationResult<SetDeleteJobTemplateMutation>;
export type SetDeleteJobTemplateMutationOptions = Apollo.BaseMutationOptions<SetDeleteJobTemplateMutation, SetDeleteJobTemplateMutationVariables>;