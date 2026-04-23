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
export type GetEngagementDetailsQueryVariables = Types.Exact<{
  jobId: Types.Scalars['ID'];
}>;


export type GetEngagementDetailsQuery = { node?: Types.Maybe<{ id: string, engagements?: Types.Maybe<{ nodes: Array<{ id: string, talent?: Types.Maybe<{ fullName: string }> }> }> }> };


export const GetEngagementDetailsDocument = gql`
    query GetEngagementDetails($jobId: ID!) {
  node(id: $jobId) {
    ... on Job {
      id
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
 * __useGetEngagementDetailsQuery__
 *
 * To run a query within a React component, call `useGetEngagementDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEngagementDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEngagementDetailsQuery({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useGetEngagementDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetEngagementDetailsQuery, GetEngagementDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetEngagementDetailsQuery, GetEngagementDetailsQueryVariables>(GetEngagementDetailsDocument, options);
      }
export function useGetEngagementDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEngagementDetailsQuery, GetEngagementDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetEngagementDetailsQuery, GetEngagementDetailsQueryVariables>(GetEngagementDetailsDocument, options);
        }
export type GetEngagementDetailsQueryHookResult = ReturnType<typeof useGetEngagementDetailsQuery>;
export type GetEngagementDetailsLazyQueryHookResult = ReturnType<typeof useGetEngagementDetailsLazyQuery>;
export type GetEngagementDetailsQueryResult = Apollo.QueryResult<GetEngagementDetailsQuery, GetEngagementDetailsQueryVariables>;