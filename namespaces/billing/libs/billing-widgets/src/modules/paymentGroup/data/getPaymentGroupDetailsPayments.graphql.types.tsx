/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { PaymentListItemFragment } from '../../__fragments__/paymentListItemFragment.graphql.types';
import { OperationItemFragment } from '../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { gql } from '@apollo/client';
import { PaymentListItemFragmentDoc } from '../../__fragments__/paymentListItemFragment.graphql.types';
import { OperationItemFragmentDoc } from '../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetPaymentGroupDetailsPaymentsQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID'];
  pagination?: Types.Maybe<Types.OffsetPagination>;
}>;


export type GetPaymentGroupDetailsPaymentsQuery = { node?: Types.Maybe<{ id: string, payments: { totalCount?: Types.Maybe<number>, alreadyDownloadedCount?: Types.Maybe<number>, groups?: Types.Maybe<Array<{ month: number, year: number, totals: { debited: string, disputed: string, due: string, onHold: string, outstanding: string, overdue: string, paid: string }, payments: Array<(
          { operations: PaymentGroupDetailsPaymentsOperationsFragment }
          & PaymentListItemFragment
        )> }>> } }> };

export type PaymentGroupDetailsPaymentsOperationsFragment = { removePaymentFromPaymentGroup: OperationItemFragment };

export const PaymentGroupDetailsPaymentsOperationsFragmentDoc = gql`
    fragment PaymentGroupDetailsPaymentsOperations on PaymentOperations {
  removePaymentFromPaymentGroup {
    ...OperationItem
  }
}
    ${OperationItemFragmentDoc}`;
export const GetPaymentGroupDetailsPaymentsDocument = gql`
    query GetPaymentGroupDetailsPayments($nodeId: ID!, $pagination: OffsetPagination) {
  node(id: $nodeId) {
    ... on PaymentGroup {
      id
      payments(pagination: $pagination) {
        totalCount
        alreadyDownloadedCount
        groups {
          month
          year
          totals {
            debited
            disputed
            due
            onHold
            outstanding
            overdue
            paid
          }
          payments {
            ...PaymentListItemFragment
            operations {
              ...PaymentGroupDetailsPaymentsOperations
            }
          }
        }
      }
    }
  }
}
    ${PaymentListItemFragmentDoc}
${PaymentGroupDetailsPaymentsOperationsFragmentDoc}`;

/**
 * __useGetPaymentGroupDetailsPaymentsQuery__
 *
 * To run a query within a React component, call `useGetPaymentGroupDetailsPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentGroupDetailsPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentGroupDetailsPaymentsQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetPaymentGroupDetailsPaymentsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPaymentGroupDetailsPaymentsQuery, GetPaymentGroupDetailsPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPaymentGroupDetailsPaymentsQuery, GetPaymentGroupDetailsPaymentsQueryVariables>(GetPaymentGroupDetailsPaymentsDocument, options);
      }
export function useGetPaymentGroupDetailsPaymentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPaymentGroupDetailsPaymentsQuery, GetPaymentGroupDetailsPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPaymentGroupDetailsPaymentsQuery, GetPaymentGroupDetailsPaymentsQueryVariables>(GetPaymentGroupDetailsPaymentsDocument, options);
        }
export type GetPaymentGroupDetailsPaymentsQueryHookResult = ReturnType<typeof useGetPaymentGroupDetailsPaymentsQuery>;
export type GetPaymentGroupDetailsPaymentsLazyQueryHookResult = ReturnType<typeof useGetPaymentGroupDetailsPaymentsLazyQuery>;
export type GetPaymentGroupDetailsPaymentsQueryResult = Apollo.QueryResult<GetPaymentGroupDetailsPaymentsQuery, GetPaymentGroupDetailsPaymentsQueryVariables>;