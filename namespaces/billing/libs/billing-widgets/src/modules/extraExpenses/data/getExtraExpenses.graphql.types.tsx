/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { OperationItemFragment } from '../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { TotalsFragment } from '../../__fragments__/totalsFragment.graphql.types';
import { ExtraExpensePlacementFeeItemInvoiceFragment, ExtraExpensePlacementFeeItemPaymentFragment, ExtraExpensePlacementFeeItemCommissionFragment_Invoice_, ExtraExpensePlacementFeeItemCommissionFragment_Payment_ } from '../../__fragments__/extraExpensePlacementFeeFragment.graphql.types';
import { gql } from '@apollo/client';
import { OperationItemFragmentDoc } from '../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { TotalsFragmentDoc } from '../../__fragments__/totalsFragment.graphql.types';
import { ExtraExpensePlacementFeeItemInvoiceFragmentDoc, ExtraExpensePlacementFeeItemPaymentFragmentDoc, ExtraExpensePlacementFeeItemCommissionFragmentDoc } from '../../__fragments__/extraExpensePlacementFeeFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetExtraExpensesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetExtraExpensesQuery = { node?: Types.Maybe<{ id: string, extraExpenses?: Types.Maybe<ExtraExpenseConnectionFragment> }> };

export type ExtraExpenseConnectionFragment = { operations: { createExtraExpenses: OperationItemFragment }, nodes: Array<ExtraExpenseItemFragment>, extraExpenseTotals: TotalsFragment };

export type ExtraExpenseItemFragment = { invoice: ExtraExpensePlacementFeeItemInvoiceFragment, commissions: { nodes: Array<ExtraExpensePlacementFeeItemCommissionFragment_Invoice_ | ExtraExpensePlacementFeeItemCommissionFragment_Payment_> }, payments: { nodes: Array<ExtraExpensePlacementFeeItemPaymentFragment> } };

export const ExtraExpenseItemFragmentDoc = gql`
    fragment ExtraExpenseItem on ExtraExpense {
  invoice {
    ...ExtraExpensePlacementFeeItemInvoiceFragment
  }
  commissions {
    nodes {
      ...ExtraExpensePlacementFeeItemCommissionFragment
    }
  }
  payments {
    nodes {
      ...ExtraExpensePlacementFeeItemPaymentFragment
    }
  }
}
    ${ExtraExpensePlacementFeeItemInvoiceFragmentDoc}
${ExtraExpensePlacementFeeItemCommissionFragmentDoc}
${ExtraExpensePlacementFeeItemPaymentFragmentDoc}`;
export const ExtraExpenseConnectionFragmentDoc = gql`
    fragment ExtraExpenseConnection on ExtraExpenseConnection {
  operations {
    createExtraExpenses {
      ...OperationItem
    }
  }
  nodes {
    ...ExtraExpenseItem
  }
  extraExpenseTotals {
    ...TotalsFragment
  }
}
    ${OperationItemFragmentDoc}
${ExtraExpenseItemFragmentDoc}
${TotalsFragmentDoc}`;
export const GetExtraExpensesDocument = gql`
    query GetExtraExpenses($id: ID!) {
  node(id: $id) {
    ... on Engagement {
      id
      extraExpenses: extraExpensesNullable {
        ...ExtraExpenseConnection
      }
    }
  }
}
    ${ExtraExpenseConnectionFragmentDoc}`;

/**
 * __useGetExtraExpensesQuery__
 *
 * To run a query within a React component, call `useGetExtraExpensesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExtraExpensesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExtraExpensesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetExtraExpensesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetExtraExpensesQuery, GetExtraExpensesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetExtraExpensesQuery, GetExtraExpensesQueryVariables>(GetExtraExpensesDocument, options);
      }
export function useGetExtraExpensesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetExtraExpensesQuery, GetExtraExpensesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetExtraExpensesQuery, GetExtraExpensesQueryVariables>(GetExtraExpensesDocument, options);
        }
export type GetExtraExpensesQueryHookResult = ReturnType<typeof useGetExtraExpensesQuery>;
export type GetExtraExpensesLazyQueryHookResult = ReturnType<typeof useGetExtraExpensesLazyQuery>;
export type GetExtraExpensesQueryResult = Apollo.QueryResult<GetExtraExpensesQuery, GetExtraExpensesQueryVariables>;