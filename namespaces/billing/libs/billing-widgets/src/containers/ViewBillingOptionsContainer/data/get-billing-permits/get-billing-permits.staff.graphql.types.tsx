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
export type GetBillingPermitsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetBillingPermitsQuery = { viewer: { permits: { canViewBillingOptions: boolean } } };


export const GetBillingPermitsDocument = gql`
    query GetBillingPermits {
  viewer {
    permits {
      canViewBillingOptions
    }
  }
}
    `;

/**
 * __useGetBillingPermitsQuery__
 *
 * To run a query within a React component, call `useGetBillingPermitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBillingPermitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBillingPermitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBillingPermitsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBillingPermitsQuery, GetBillingPermitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBillingPermitsQuery, GetBillingPermitsQueryVariables>(GetBillingPermitsDocument, options);
      }
export function useGetBillingPermitsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBillingPermitsQuery, GetBillingPermitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBillingPermitsQuery, GetBillingPermitsQueryVariables>(GetBillingPermitsDocument, options);
        }
export type GetBillingPermitsQueryHookResult = ReturnType<typeof useGetBillingPermitsQuery>;
export type GetBillingPermitsLazyQueryHookResult = ReturnType<typeof useGetBillingPermitsLazyQuery>;
export type GetBillingPermitsQueryResult = Apollo.QueryResult<GetBillingPermitsQuery, GetBillingPermitsQueryVariables>;