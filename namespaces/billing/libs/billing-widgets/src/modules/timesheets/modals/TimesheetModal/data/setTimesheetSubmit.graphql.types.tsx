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
export type SetTimesheetSubmitMutationVariables = Types.Exact<{
  billingCycleId: Types.Scalars['ID'];
}>;


export type SetTimesheetSubmitMutation = { submitTimesheet?: Types.Maybe<{ success: boolean, billingCycle?: Types.Maybe<{ gid: string, id: string, timesheetSubmitted: boolean, timesheetOverdue: boolean, operations: { timesheetApprove: OperationItemFragment, timesheetReject: OperationItemFragment, timesheetSubmit: OperationItemFragment, timesheetUnsubmit: OperationItemFragment, timesheetUpdate: OperationItemFragment } }>, errors: Array<{ code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string }> }> };


export const SetTimesheetSubmitDocument = gql`
    mutation SetTimesheetSubmit($billingCycleId: ID!) {
  submitTimesheet(billingCycleId: $billingCycleId) {
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
      timesheetSubmitted
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
export type SetTimesheetSubmitMutationFn = Apollo.MutationFunction<SetTimesheetSubmitMutation, SetTimesheetSubmitMutationVariables>;

/**
 * __useSetTimesheetSubmitMutation__
 *
 * To run a mutation, you first call `useSetTimesheetSubmitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTimesheetSubmitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTimesheetSubmitMutation, { data, loading, error }] = useSetTimesheetSubmitMutation({
 *   variables: {
 *      billingCycleId: // value for 'billingCycleId'
 *   },
 * });
 */
export function useSetTimesheetSubmitMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTimesheetSubmitMutation, SetTimesheetSubmitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetTimesheetSubmitMutation, SetTimesheetSubmitMutationVariables>(SetTimesheetSubmitDocument, options);
      }
export type SetTimesheetSubmitMutationHookResult = ReturnType<typeof useSetTimesheetSubmitMutation>;
export type SetTimesheetSubmitMutationResult = Apollo.MutationResult<SetTimesheetSubmitMutation>;
export type SetTimesheetSubmitMutationOptions = Apollo.BaseMutationOptions<SetTimesheetSubmitMutation, SetTimesheetSubmitMutationVariables>;