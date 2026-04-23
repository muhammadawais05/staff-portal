/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { UserErrorFragment_AssignScreeningSpecialistsError_, UserErrorFragment_P2PStandardUserError_, UserErrorFragment_SpecialistAssignmentBulkActionError_, UserErrorFragment_StandardUserError_, UserErrorFragment_TopcallUserError_ } from '../../../../__fragments__/userErrorFragment.graphql.types';
import { JobTemplateFragment } from '../../../../__fragments__/jobTemplateFragment.graphql.types';
import { gql } from '@apollo/client';
import { UserErrorFragmentDoc } from '../../../../__fragments__/userErrorFragment.graphql.types';
import { JobTemplateFragmentDoc } from '../../../../__fragments__/jobTemplateFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type CreateJobTemplateMutationVariables = Types.Exact<{
  input: Types.CreateJobTemplateInput;
}>;


export type CreateJobTemplateMutation = { createJobTemplate?: Types.Maybe<{ clientMutationId?: Types.Maybe<string>, success: boolean, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_>, client?: Types.Maybe<{ jobTemplate?: Types.Maybe<JobTemplateFragment> }> }> };


export const CreateJobTemplateDocument = gql`
    mutation CreateJobTemplate($input: CreateJobTemplateInput!) {
  createJobTemplate(input: $input) {
    clientMutationId
    success
    errors {
      ...UserErrorFragment
    }
    client {
      jobTemplate {
        ...JobTemplateFragment
      }
    }
  }
}
    ${UserErrorFragmentDoc}
${JobTemplateFragmentDoc}`;
export type CreateJobTemplateMutationFn = Apollo.MutationFunction<CreateJobTemplateMutation, CreateJobTemplateMutationVariables>;

/**
 * __useCreateJobTemplateMutation__
 *
 * To run a mutation, you first call `useCreateJobTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJobTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJobTemplateMutation, { data, loading, error }] = useCreateJobTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateJobTemplateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateJobTemplateMutation, CreateJobTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateJobTemplateMutation, CreateJobTemplateMutationVariables>(CreateJobTemplateDocument, options);
      }
export type CreateJobTemplateMutationHookResult = ReturnType<typeof useCreateJobTemplateMutation>;
export type CreateJobTemplateMutationResult = Apollo.MutationResult<CreateJobTemplateMutation>;
export type CreateJobTemplateMutationOptions = Apollo.BaseMutationOptions<CreateJobTemplateMutation, CreateJobTemplateMutationVariables>;