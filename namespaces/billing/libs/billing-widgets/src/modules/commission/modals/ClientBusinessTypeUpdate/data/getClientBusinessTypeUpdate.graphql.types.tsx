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
export type GetClientBusinessTypeUpdateQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID'];
}>;


export type GetClientBusinessTypeUpdateQuery = { node?: Types.Maybe<{ id: string, businessType?: Types.Maybe<string> }> };


export const GetClientBusinessTypeUpdateDocument = gql`
    query GetClientBusinessTypeUpdate($nodeId: ID!) {
  node(id: $nodeId) {
    ... on Client {
      id
      businessType
    }
  }
}
    `;

/**
 * __useGetClientBusinessTypeUpdateQuery__
 *
 * To run a query within a React component, call `useGetClientBusinessTypeUpdateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientBusinessTypeUpdateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientBusinessTypeUpdateQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetClientBusinessTypeUpdateQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetClientBusinessTypeUpdateQuery, GetClientBusinessTypeUpdateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetClientBusinessTypeUpdateQuery, GetClientBusinessTypeUpdateQueryVariables>(GetClientBusinessTypeUpdateDocument, options);
      }
export function useGetClientBusinessTypeUpdateLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientBusinessTypeUpdateQuery, GetClientBusinessTypeUpdateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetClientBusinessTypeUpdateQuery, GetClientBusinessTypeUpdateQueryVariables>(GetClientBusinessTypeUpdateDocument, options);
        }
export type GetClientBusinessTypeUpdateQueryHookResult = ReturnType<typeof useGetClientBusinessTypeUpdateQuery>;
export type GetClientBusinessTypeUpdateLazyQueryHookResult = ReturnType<typeof useGetClientBusinessTypeUpdateLazyQuery>;
export type GetClientBusinessTypeUpdateQueryResult = Apollo.QueryResult<GetClientBusinessTypeUpdateQuery, GetClientBusinessTypeUpdateQueryVariables>;