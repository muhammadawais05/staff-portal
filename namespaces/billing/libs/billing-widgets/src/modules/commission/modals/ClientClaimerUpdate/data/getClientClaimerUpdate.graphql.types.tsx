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
export type GetClientClaimerUpdateQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetClientClaimerUpdateQuery = { roles: { nodes: Array<{ id: string, fullName: string, type: string }> } };


export const GetClientClaimerUpdateDocument = gql`
    query GetClientClaimerUpdate {
  roles(filter: {scope: COMPANY_CLAIMERS}) {
    ... on StaffConnection {
      nodes {
        id
        fullName
        type
      }
    }
  }
}
    `;

/**
 * __useGetClientClaimerUpdateQuery__
 *
 * To run a query within a React component, call `useGetClientClaimerUpdateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientClaimerUpdateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientClaimerUpdateQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetClientClaimerUpdateQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetClientClaimerUpdateQuery, GetClientClaimerUpdateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetClientClaimerUpdateQuery, GetClientClaimerUpdateQueryVariables>(GetClientClaimerUpdateDocument, options);
      }
export function useGetClientClaimerUpdateLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientClaimerUpdateQuery, GetClientClaimerUpdateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetClientClaimerUpdateQuery, GetClientClaimerUpdateQueryVariables>(GetClientClaimerUpdateDocument, options);
        }
export type GetClientClaimerUpdateQueryHookResult = ReturnType<typeof useGetClientClaimerUpdateQuery>;
export type GetClientClaimerUpdateLazyQueryHookResult = ReturnType<typeof useGetClientClaimerUpdateLazyQuery>;
export type GetClientClaimerUpdateQueryResult = Apollo.QueryResult<GetClientClaimerUpdateQuery, GetClientClaimerUpdateQueryVariables>;