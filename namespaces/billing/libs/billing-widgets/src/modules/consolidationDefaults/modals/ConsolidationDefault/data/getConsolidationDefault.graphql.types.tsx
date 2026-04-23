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
export type GetConsolidationDefaultQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetConsolidationDefaultQuery = { node?: Types.Maybe<{ id: string, name: string, client: { fullName: string, id: string }, engagements: { nodes: Array<{ id: string, client?: Types.Maybe<{ id: string }> }> } }> };


export const GetConsolidationDefaultDocument = gql`
    query GetConsolidationDefault($id: ID!) {
  node(id: $id) {
    ... on ConsolidationDefault {
      id
      name
      client {
        fullName
        id
      }
      engagements {
        nodes {
          id
          client {
            id
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetConsolidationDefaultQuery__
 *
 * To run a query within a React component, call `useGetConsolidationDefaultQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConsolidationDefaultQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConsolidationDefaultQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetConsolidationDefaultQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetConsolidationDefaultQuery, GetConsolidationDefaultQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetConsolidationDefaultQuery, GetConsolidationDefaultQueryVariables>(GetConsolidationDefaultDocument, options);
      }
export function useGetConsolidationDefaultLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetConsolidationDefaultQuery, GetConsolidationDefaultQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetConsolidationDefaultQuery, GetConsolidationDefaultQueryVariables>(GetConsolidationDefaultDocument, options);
        }
export type GetConsolidationDefaultQueryHookResult = ReturnType<typeof useGetConsolidationDefaultQuery>;
export type GetConsolidationDefaultLazyQueryHookResult = ReturnType<typeof useGetConsolidationDefaultLazyQuery>;
export type GetConsolidationDefaultQueryResult = Apollo.QueryResult<GetConsolidationDefaultQuery, GetConsolidationDefaultQueryVariables>;