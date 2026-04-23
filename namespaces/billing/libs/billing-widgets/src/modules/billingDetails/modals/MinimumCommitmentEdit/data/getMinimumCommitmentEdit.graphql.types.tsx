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
export type GetMinimumCommitmentEditQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID'];
}>;


export type GetMinimumCommitmentEditQuery = { node?: Types.Maybe<{ id: string, fullName: string, commitmentSettings?: Types.Maybe<{ minimumHours: number }> }> };


export const GetMinimumCommitmentEditDocument = gql`
    query GetMinimumCommitmentEdit($nodeId: ID!) {
  node(id: $nodeId) {
    ... on Client {
      id
      fullName
      commitmentSettings {
        minimumHours
      }
    }
  }
}
    `;

/**
 * __useGetMinimumCommitmentEditQuery__
 *
 * To run a query within a React component, call `useGetMinimumCommitmentEditQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMinimumCommitmentEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMinimumCommitmentEditQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetMinimumCommitmentEditQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetMinimumCommitmentEditQuery, GetMinimumCommitmentEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMinimumCommitmentEditQuery, GetMinimumCommitmentEditQueryVariables>(GetMinimumCommitmentEditDocument, options);
      }
export function useGetMinimumCommitmentEditLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMinimumCommitmentEditQuery, GetMinimumCommitmentEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMinimumCommitmentEditQuery, GetMinimumCommitmentEditQueryVariables>(GetMinimumCommitmentEditDocument, options);
        }
export type GetMinimumCommitmentEditQueryHookResult = ReturnType<typeof useGetMinimumCommitmentEditQuery>;
export type GetMinimumCommitmentEditLazyQueryHookResult = ReturnType<typeof useGetMinimumCommitmentEditLazyQuery>;
export type GetMinimumCommitmentEditQueryResult = Apollo.QueryResult<GetMinimumCommitmentEditQuery, GetMinimumCommitmentEditQueryVariables>;