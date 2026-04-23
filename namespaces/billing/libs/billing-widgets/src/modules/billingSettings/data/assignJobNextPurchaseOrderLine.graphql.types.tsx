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
export type AssignJobNextPurchaseOrderLineMutationVariables = Types.Exact<{
  input: Types.AssignJobNextPurchaseOrderLineInput;
}>;


export type AssignJobNextPurchaseOrderLineMutation = { assignJobNextPurchaseOrderLine?: Types.Maybe<{ notice?: Types.Maybe<string>, success: boolean, job?: Types.Maybe<{ id: string, nextPurchaseOrderLine?: Types.Maybe<{ id: string, poLineNumber: string, webResource: WebResourceFragment }>, nextPurchaseOrder?: Types.Maybe<{ id: string, poNumber: string, webResource: WebResourceFragment }> }>, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_> }> };


export const AssignJobNextPurchaseOrderLineDocument = gql`
    mutation AssignJobNextPurchaseOrderLine($input: AssignJobNextPurchaseOrderLineInput!) {
  assignJobNextPurchaseOrderLine(input: $input) {
    job {
      id
      nextPurchaseOrderLine {
        id
        poLineNumber
        webResource {
          ...WebResourceFragment
        }
      }
      nextPurchaseOrder {
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
export type AssignJobNextPurchaseOrderLineMutationFn = Apollo.MutationFunction<AssignJobNextPurchaseOrderLineMutation, AssignJobNextPurchaseOrderLineMutationVariables>;

/**
 * __useAssignJobNextPurchaseOrderLineMutation__
 *
 * To run a mutation, you first call `useAssignJobNextPurchaseOrderLineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignJobNextPurchaseOrderLineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignJobNextPurchaseOrderLineMutation, { data, loading, error }] = useAssignJobNextPurchaseOrderLineMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignJobNextPurchaseOrderLineMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AssignJobNextPurchaseOrderLineMutation, AssignJobNextPurchaseOrderLineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AssignJobNextPurchaseOrderLineMutation, AssignJobNextPurchaseOrderLineMutationVariables>(AssignJobNextPurchaseOrderLineDocument, options);
      }
export type AssignJobNextPurchaseOrderLineMutationHookResult = ReturnType<typeof useAssignJobNextPurchaseOrderLineMutation>;
export type AssignJobNextPurchaseOrderLineMutationResult = Apollo.MutationResult<AssignJobNextPurchaseOrderLineMutation>;
export type AssignJobNextPurchaseOrderLineMutationOptions = Apollo.BaseMutationOptions<AssignJobNextPurchaseOrderLineMutation, AssignJobNextPurchaseOrderLineMutationVariables>;