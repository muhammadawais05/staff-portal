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
export type SetTimesheetUpdateMutationVariables = Types.Exact<{
  billingCycleId: Types.Scalars['ID'];
  comment?: Types.Maybe<Types.Scalars['String']>;
  timesheetRecords: Array<Types.TimesheetRecordsInput> | Types.TimesheetRecordsInput;
}>;


export type SetTimesheetUpdateMutation = { updateTimesheet?: Types.Maybe<{ success: boolean, billingCycle?: Types.Maybe<{ gid: string, id: string, timesheetComment?: Types.Maybe<string>, timesheetOverdue: boolean, operations: { timesheetApprove: OperationItemFragment, timesheetReject: OperationItemFragment, timesheetSubmit: OperationItemFragment, timesheetUnsubmit: OperationItemFragment, timesheetUpdate: OperationItemFragment }, timesheetRecords: Array<{ date: `${`${number}-${number}-${number}`}` | '', duration?: Types.Maybe<string>, note?: Types.Maybe<string> }> }>, errors: Array<{ code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string }> }> };


export const SetTimesheetUpdateDocument = gql`
    mutation SetTimesheetUpdate($billingCycleId: ID!, $comment: String, $timesheetRecords: [TimesheetRecordsInput!]!) {
  updateTimesheet(
    billingCycleId: $billingCycleId
    timesheetRecords: $timesheetRecords
    comment: $comment
  ) {
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
      timesheetComment
      timesheetRecords {
        date
        duration
        note
      }
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
export type SetTimesheetUpdateMutationFn = Apollo.MutationFunction<SetTimesheetUpdateMutation, SetTimesheetUpdateMutationVariables>;

/**
 * __useSetTimesheetUpdateMutation__
 *
 * To run a mutation, you first call `useSetTimesheetUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTimesheetUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTimesheetUpdateMutation, { data, loading, error }] = useSetTimesheetUpdateMutation({
 *   variables: {
 *      billingCycleId: // value for 'billingCycleId'
 *      comment: // value for 'comment'
 *      timesheetRecords: // value for 'timesheetRecords'
 *   },
 * });
 */
export function useSetTimesheetUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTimesheetUpdateMutation, SetTimesheetUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetTimesheetUpdateMutation, SetTimesheetUpdateMutationVariables>(SetTimesheetUpdateDocument, options);
      }
export type SetTimesheetUpdateMutationHookResult = ReturnType<typeof useSetTimesheetUpdateMutation>;
export type SetTimesheetUpdateMutationResult = Apollo.MutationResult<SetTimesheetUpdateMutation>;
export type SetTimesheetUpdateMutationOptions = Apollo.BaseMutationOptions<SetTimesheetUpdateMutation, SetTimesheetUpdateMutationVariables>;