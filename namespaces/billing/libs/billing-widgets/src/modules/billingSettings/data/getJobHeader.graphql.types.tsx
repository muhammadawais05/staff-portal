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
export type GetJobHeaderQueryVariables = Types.Exact<{
  jobId: Types.Scalars['ID'];
}>;


export type GetJobHeaderQuery = { node?: Types.Maybe<{ id: string, title: string, webResource: { url?: Types.Maybe<string> }, engagements?: Types.Maybe<{ nodes: Array<{ id: string, talent?: Types.Maybe<{ fullName: string }> }> }> }> };


export const GetJobHeaderDocument = gql`
    query GetJobHeader($jobId: ID!) {
  node(id: $jobId) {
    ... on Job {
      id
      title
      webResource {
        url
      }
      engagements(filter: {state: CURRENT}) {
        nodes {
          id
          talent {
            fullName
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetJobHeaderQuery__
 *
 * To run a query within a React component, call `useGetJobHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobHeaderQuery({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useGetJobHeaderQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetJobHeaderQuery, GetJobHeaderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetJobHeaderQuery, GetJobHeaderQueryVariables>(GetJobHeaderDocument, options);
      }
export function useGetJobHeaderLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetJobHeaderQuery, GetJobHeaderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetJobHeaderQuery, GetJobHeaderQueryVariables>(GetJobHeaderDocument, options);
        }
export type GetJobHeaderQueryHookResult = ReturnType<typeof useGetJobHeaderQuery>;
export type GetJobHeaderLazyQueryHookResult = ReturnType<typeof useGetJobHeaderLazyQuery>;
export type GetJobHeaderQueryResult = Apollo.QueryResult<GetJobHeaderQuery, GetJobHeaderQueryVariables>;