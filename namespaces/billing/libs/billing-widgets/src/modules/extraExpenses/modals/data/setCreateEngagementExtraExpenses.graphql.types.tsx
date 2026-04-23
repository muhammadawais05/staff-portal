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
export type SetCreateEngagementExtraExpensesMutationVariables = Types.Exact<{
  input: Types.CreateEngagementExtraExpensesInput;
}>;


export type SetCreateEngagementExtraExpensesMutation = { createEngagementExtraExpenses?: Types.Maybe<{ success: boolean, extraExpense?: Types.Maybe<{ commissions: { nodes: Array<{ gid: string, id: string, amount: string, paidAmount: string } | { gid: string, id: string, amount: string, paidAmount: string }> }, invoice: { gid: string, id: string, paidAmount: string, amount: string } | { gid: string, id: string, paidAmount: string, amount: string }, payments: { nodes: Array<{ gid: string, id: string, amount: string, paidAmount: string } | { gid: string, id: string, amount: string, paidAmount: string }> } }>, errors: Array<{ code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string } | { code: string, key: string, message: string }> }> };


export const SetCreateEngagementExtraExpensesDocument = gql`
    mutation SetCreateEngagementExtraExpenses($input: CreateEngagementExtraExpensesInput!) {
  createEngagementExtraExpenses(input: $input) {
    extraExpense {
      commissions {
        nodes {
          gid
          id
          amount
          paidAmount
        }
      }
      invoice {
        gid
        id
        paidAmount
        amount
      }
      payments {
        nodes {
          gid
          id
          amount
          paidAmount
        }
      }
    }
    success
    errors {
      code
      key
      message
    }
  }
}
    `;
export type SetCreateEngagementExtraExpensesMutationFn = Apollo.MutationFunction<SetCreateEngagementExtraExpensesMutation, SetCreateEngagementExtraExpensesMutationVariables>;

/**
 * __useSetCreateEngagementExtraExpensesMutation__
 *
 * To run a mutation, you first call `useSetCreateEngagementExtraExpensesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCreateEngagementExtraExpensesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCreateEngagementExtraExpensesMutation, { data, loading, error }] = useSetCreateEngagementExtraExpensesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetCreateEngagementExtraExpensesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetCreateEngagementExtraExpensesMutation, SetCreateEngagementExtraExpensesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetCreateEngagementExtraExpensesMutation, SetCreateEngagementExtraExpensesMutationVariables>(SetCreateEngagementExtraExpensesDocument, options);
      }
export type SetCreateEngagementExtraExpensesMutationHookResult = ReturnType<typeof useSetCreateEngagementExtraExpensesMutation>;
export type SetCreateEngagementExtraExpensesMutationResult = Apollo.MutationResult<SetCreateEngagementExtraExpensesMutation>;
export type SetCreateEngagementExtraExpensesMutationOptions = Apollo.BaseMutationOptions<SetCreateEngagementExtraExpensesMutation, SetCreateEngagementExtraExpensesMutationVariables>;