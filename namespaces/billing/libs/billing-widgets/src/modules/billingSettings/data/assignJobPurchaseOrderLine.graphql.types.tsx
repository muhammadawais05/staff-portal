/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { WebResourceFragment } from '../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { UserErrorFragment_AssignScreeningSpecialistsError_, UserErrorFragment_P2PStandardUserError_, UserErrorFragment_SpecialistAssignmentBulkActionError_, UserErrorFragment_StandardUserError_, UserErrorFragment_TopcallUserError_ } from '../../__fragments__/userErrorFragment.graphql.types';
import { gql } from '@apollo/client';
import { WebResourceFragmentDoc } from '../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { UserErrorFragmentDoc } from '../../__fragments__/userErrorFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type AssignJobPurchaseOrderLineMutationVariables = Types.Exact<{
  input: Types.AssignJobPurchaseOrderLineInput;
}>;


export type AssignJobPurchaseOrderLineMutation = { assignJobPurchaseOrderLine?: Types.Maybe<{ notice?: Types.Maybe<string>, success: boolean, job?: Types.Maybe<{ id: string, purchaseOrderLine?: Types.Maybe<{ id: string, poLineNumber: string, webResource: WebResourceFragment }>, purchaseOrder?: Types.Maybe<{ id: string, poNumber: string, webResource: WebResourceFragment }> }>, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_> }> };


export const AssignJobPurchaseOrderLineDocument = gql`
    mutation AssignJobPurchaseOrderLine($input: AssignJobPurchaseOrderLineInput!) {
  assignJobPurchaseOrderLine(input: $input) {
    job {
      id
      purchaseOrderLine {
        id
        poLineNumber
        webResource {
          ...WebResourceFragment
        }
      }
      purchaseOrder {
        id
        poNumber
        webResource {
          ...WebResourceFragment
        }
      }
    }
    errors {
      ...UserErrorFragment
    }
    notice
    success
  }
}
    ${WebResourceFragmentDoc}
${UserErrorFragmentDoc}`;
export type AssignJobPurchaseOrderLineMutationFn = Apollo.MutationFunction<AssignJobPurchaseOrderLineMutation, AssignJobPurchaseOrderLineMutationVariables>;

/**
 * __useAssignJobPurchaseOrderLineMutation__
 *
 * To run a mutation, you first call `useAssignJobPurchaseOrderLineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignJobPurchaseOrderLineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignJobPurchaseOrderLineMutation, { data, loading, error }] = useAssignJobPurchaseOrderLineMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignJobPurchaseOrderLineMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AssignJobPurchaseOrderLineMutation, AssignJobPurchaseOrderLineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AssignJobPurchaseOrderLineMutation, AssignJobPurchaseOrderLineMutationVariables>(AssignJobPurchaseOrderLineDocument, options);
      }
export type AssignJobPurchaseOrderLineMutationHookResult = ReturnType<typeof useAssignJobPurchaseOrderLineMutation>;
export type AssignJobPurchaseOrderLineMutationResult = Apollo.MutationResult<AssignJobPurchaseOrderLineMutation>;
export type AssignJobPurchaseOrderLineMutationOptions = Apollo.BaseMutationOptions<AssignJobPurchaseOrderLineMutation, AssignJobPurchaseOrderLineMutationVariables>;