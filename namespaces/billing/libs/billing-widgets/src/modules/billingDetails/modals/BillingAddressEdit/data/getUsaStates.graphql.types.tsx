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
export type GetUsaStatesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUsaStatesQuery = { usaStates: Array<{ code: string, name: string }> };


export const GetUsaStatesDocument = gql`
    query GetUsaStates {
  usaStates {
    code
    name
  }
}
    `;

/**
 * __useGetUsaStatesQuery__
 *
 * To run a query within a React component, call `useGetUsaStatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsaStatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsaStatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsaStatesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUsaStatesQuery, GetUsaStatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUsaStatesQuery, GetUsaStatesQueryVariables>(GetUsaStatesDocument, options);
      }
export function useGetUsaStatesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsaStatesQuery, GetUsaStatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUsaStatesQuery, GetUsaStatesQueryVariables>(GetUsaStatesDocument, options);
        }
export type GetUsaStatesQueryHookResult = ReturnType<typeof useGetUsaStatesQuery>;
export type GetUsaStatesLazyQueryHookResult = ReturnType<typeof useGetUsaStatesLazyQuery>;
export type GetUsaStatesQueryResult = Apollo.QueryResult<GetUsaStatesQuery, GetUsaStatesQueryVariables>;