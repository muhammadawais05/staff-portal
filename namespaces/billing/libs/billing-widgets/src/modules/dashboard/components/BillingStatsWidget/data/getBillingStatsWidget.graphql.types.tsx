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
export type GetBillingStatsWidgetQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetBillingStatsWidgetQuery = { widgets: { billingStats?: Types.Maybe<{ invoicesTotals: Array<{ amount: string, category: Types.InvoicesTotalsCategory }>, paymentsTotals: Array<{ amount: string, category: Types.PaymentsTotalsCategory }>, billingMethods: Array<{ count: number, billingMethod: Types.BillingMethodName }> }> } };


export const GetBillingStatsWidgetDocument = gql`
    query GetBillingStatsWidget {
  widgets {
    billingStats {
      invoicesTotals {
        amount
        category
      }
      paymentsTotals {
        amount
        category
      }
      billingMethods {
        count
        billingMethod
      }
    }
  }
}
    `;

/**
 * __useGetBillingStatsWidgetQuery__
 *
 * To run a query within a React component, call `useGetBillingStatsWidgetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBillingStatsWidgetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBillingStatsWidgetQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBillingStatsWidgetQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBillingStatsWidgetQuery, GetBillingStatsWidgetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBillingStatsWidgetQuery, GetBillingStatsWidgetQueryVariables>(GetBillingStatsWidgetDocument, options);
      }
export function useGetBillingStatsWidgetLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBillingStatsWidgetQuery, GetBillingStatsWidgetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBillingStatsWidgetQuery, GetBillingStatsWidgetQueryVariables>(GetBillingStatsWidgetDocument, options);
        }
export type GetBillingStatsWidgetQueryHookResult = ReturnType<typeof useGetBillingStatsWidgetQuery>;
export type GetBillingStatsWidgetLazyQueryHookResult = ReturnType<typeof useGetBillingStatsWidgetLazyQuery>;
export type GetBillingStatsWidgetQueryResult = Apollo.QueryResult<GetBillingStatsWidgetQuery, GetBillingStatsWidgetQueryVariables>;