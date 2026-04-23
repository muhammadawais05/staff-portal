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
export type GetInvoiceListReconciliationOperationQueryVariables = Types.Exact<{
  filter: Types.InvoicesFilter;
  pagination: Types.OffsetPagination;
}>;


export type GetInvoiceListReconciliationOperationQuery = { invoicesNullable?: Types.Maybe<{ operations: { reconcileInvoices: { callable: Types.OperationCallableTypes, messages: Array<string> } } }> };


export const GetInvoiceListReconciliationOperationDocument = gql`
    query GetInvoiceListReconciliationOperation($filter: InvoicesFilter!, $pagination: OffsetPagination!) {
  invoicesNullable(filter: $filter, pagination: $pagination) {
    operations {
      reconcileInvoices {
        callable
        messages
      }
    }
  }
}
    `;

/**
 * __useGetInvoiceListReconciliationOperationQuery__
 *
 * To run a query within a React component, call `useGetInvoiceListReconciliationOperationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceListReconciliationOperationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceListReconciliationOperationQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetInvoiceListReconciliationOperationQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetInvoiceListReconciliationOperationQuery, GetInvoiceListReconciliationOperationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetInvoiceListReconciliationOperationQuery, GetInvoiceListReconciliationOperationQueryVariables>(GetInvoiceListReconciliationOperationDocument, options);
      }
export function useGetInvoiceListReconciliationOperationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetInvoiceListReconciliationOperationQuery, GetInvoiceListReconciliationOperationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetInvoiceListReconciliationOperationQuery, GetInvoiceListReconciliationOperationQueryVariables>(GetInvoiceListReconciliationOperationDocument, options);
        }
export type GetInvoiceListReconciliationOperationQueryHookResult = ReturnType<typeof useGetInvoiceListReconciliationOperationQuery>;
export type GetInvoiceListReconciliationOperationLazyQueryHookResult = ReturnType<typeof useGetInvoiceListReconciliationOperationLazyQuery>;
export type GetInvoiceListReconciliationOperationQueryResult = Apollo.QueryResult<GetInvoiceListReconciliationOperationQuery, GetInvoiceListReconciliationOperationQueryVariables>;