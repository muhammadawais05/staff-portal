/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { OperationItemFragment } from '../../../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { gql } from '@apollo/client';
import { OperationItemFragmentDoc } from '../../../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type SetTimesheetRejectMutationVariables = Types.Exact<{
  billingCycleId: Types.Scalars['ID'];
  comment: Types.Scalars['String'];
}>;


export type SetTimesheetRejectMutation = { rejectTimesheet?: Types.Maybe<{ success: boolean, billingCycle?: Types.Maybe<{ gid: string, id: string, timesheetRejected: boolean, timesheetRejectionComment?: Types.Maybe<string>, timesheetOverdue: boolean, operations: { timesheetApprove: OperationItemFragment, timesheetReject: OperationItemFragment, timesheetSubmit: OperationItemFragment, timesheetUnsubmit: OperationItemFragment, timesheetUpdate: OperationItemFragment } }>, errors: Array<{ code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string }> }> };


export const SetTimesheetRejectDocument = gql`
    mutation SetTimesheetReject($billingCycleId: ID!, $comment: String!) {
  rejectTimesheet(billingCycleId: $billingCycleId, comment: $comment) {
    billingCycle {
      operations {
        timesheetApprove {
          ...OperationItem
        }
        timesheetReject {
          ...OperationItem
        }
        timesheetSubmit {
          ...OperationItem
        }
        timesheetUnsubmit {
          ...OperationItem
        }
        timesheetUpdate {
          ...OperationItem
        }
      }
      gid
      id
      timesheetRejected
      timesheetRejectionComment
      timesheetOverdue
    }
    success
    errors {
      code
      key
      message
    }
  }
}
    ${OperationItemFragmentDoc}`;
export type SetTimesheetRejectMutationFn = Apollo.MutationFunction<SetTimesheetRejectMutation, SetTimesheetRejectMutationVariables>;

/**
 * __useSetTimesheetRejectMutation__
 *
 * To run a mutation, you first call `useSetTimesheetRejectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTimesheetRejectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTimesheetRejectMutation, { data, loading, error }] = useSetTimesheetRejectMutation({
 *   variables: {
 *      billingCycleId: // value for 'billingCycleId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useSetTimesheetRejectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTimesheetRejectMutation, SetTimesheetRejectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetTimesheetRejectMutation, SetTimesheetRejectMutationVariables>(SetTimesheetRejectDocument, options);
      }
export type SetTimesheetRejectMutationHookResult = ReturnType<typeof useSetTimesheetRejectMutation>;
export type SetTimesheetRejectMutationResult = Apollo.MutationResult<SetTimesheetRejectMutation>;
export type SetTimesheetRejectMutationOptions = Apollo.BaseMutationOptions<SetTimesheetRejectMutation, SetTimesheetRejectMutationVariables>;