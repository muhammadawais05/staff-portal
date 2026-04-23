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
export type SetTimesheetUnsubmitMutationVariables = Types.Exact<{
  billingCycleId: Types.Scalars['ID'];
  comment: Types.Scalars['String'];
}>;


export type SetTimesheetUnsubmitMutation = { unsubmitTimesheet?: Types.Maybe<{ success: boolean, billingCycle?: Types.Maybe<{ gid: string, id: string, timesheetSubmitted: boolean, timesheetOverdue: boolean, operations: { timesheetApprove: OperationItemFragment, timesheetReject: OperationItemFragment, timesheetSubmit: OperationItemFragment, timesheetUnsubmit: OperationItemFragment, timesheetUpdate: OperationItemFragment } }>, errors: Array<{ key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string }> }> };


export const SetTimesheetUnsubmitDocument = gql`
    mutation SetTimesheetUnsubmit($billingCycleId: ID!, $comment: String!) {
  unsubmitTimesheet(billingCycleId: $billingCycleId, comment: $comment) {
    billingCycle {
      gid
      id
      timesheetSubmitted
      timesheetOverdue
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
    }
    success
    errors {
      key
      message
      code
    }
  }
}
    ${OperationItemFragmentDoc}`;
export type SetTimesheetUnsubmitMutationFn = Apollo.MutationFunction<SetTimesheetUnsubmitMutation, SetTimesheetUnsubmitMutationVariables>;

/**
 * __useSetTimesheetUnsubmitMutation__
 *
 * To run a mutation, you first call `useSetTimesheetUnsubmitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTimesheetUnsubmitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTimesheetUnsubmitMutation, { data, loading, error }] = useSetTimesheetUnsubmitMutation({
 *   variables: {
 *      billingCycleId: // value for 'billingCycleId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useSetTimesheetUnsubmitMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTimesheetUnsubmitMutation, SetTimesheetUnsubmitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetTimesheetUnsubmitMutation, SetTimesheetUnsubmitMutationVariables>(SetTimesheetUnsubmitDocument, options);
      }
export type SetTimesheetUnsubmitMutationHookResult = ReturnType<typeof useSetTimesheetUnsubmitMutation>;
export type SetTimesheetUnsubmitMutationResult = Apollo.MutationResult<SetTimesheetUnsubmitMutation>;
export type SetTimesheetUnsubmitMutationOptions = Apollo.BaseMutationOptions<SetTimesheetUnsubmitMutation, SetTimesheetUnsubmitMutationVariables>;