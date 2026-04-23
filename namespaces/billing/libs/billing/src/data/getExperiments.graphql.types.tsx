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
export type GetExperimentsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetExperimentsQuery = { experiments: { poLines?: Types.Maybe<{ enabled: boolean }> } };


export const GetExperimentsDocument = gql`
    query GetExperiments {
  experiments {
    poLines {
      enabled
    }
  }
}
    `;

/**
 * __useGetExperimentsQuery__
 *
 * To run a query within a React component, call `useGetExperimentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExperimentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExperimentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExperimentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetExperimentsQuery, GetExperimentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetExperimentsQuery, GetExperimentsQueryVariables>(GetExperimentsDocument, options);
      }
export function useGetExperimentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetExperimentsQuery, GetExperimentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetExperimentsQuery, GetExperimentsQueryVariables>(GetExperimentsDocument, options);
        }
export type GetExperimentsQueryHookResult = ReturnType<typeof useGetExperimentsQuery>;
export type GetExperimentsLazyQueryHookResult = ReturnType<typeof useGetExperimentsLazyQuery>;
export type GetExperimentsQueryResult = Apollo.QueryResult<GetExperimentsQuery, GetExperimentsQueryVariables>;