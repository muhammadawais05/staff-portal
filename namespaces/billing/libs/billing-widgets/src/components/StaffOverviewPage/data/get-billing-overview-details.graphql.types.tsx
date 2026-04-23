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
export type GetBillingOverviewDetailsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetBillingOverviewDetailsQuery = { viewer: { me: { id: string, manageesHaveSupervisedCompanies?: Types.Maybe<boolean> } } };


export const GetBillingOverviewDetailsDocument = gql`
    query GetBillingOverviewDetails {
  viewer {
    me {
      id
      manageesHaveSupervisedCompanies
    }
  }
}
    `;

/**
 * __useGetBillingOverviewDetailsQuery__
 *
 * To run a query within a React component, call `useGetBillingOverviewDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBillingOverviewDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBillingOverviewDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBillingOverviewDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBillingOverviewDetailsQuery, GetBillingOverviewDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBillingOverviewDetailsQuery, GetBillingOverviewDetailsQueryVariables>(GetBillingOverviewDetailsDocument, options);
      }
export function useGetBillingOverviewDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBillingOverviewDetailsQuery, GetBillingOverviewDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBillingOverviewDetailsQuery, GetBillingOverviewDetailsQueryVariables>(GetBillingOverviewDetailsDocument, options);
        }
export type GetBillingOverviewDetailsQueryHookResult = ReturnType<typeof useGetBillingOverviewDetailsQuery>;
export type GetBillingOverviewDetailsLazyQueryHookResult = ReturnType<typeof useGetBillingOverviewDetailsLazyQuery>;
export type GetBillingOverviewDetailsQueryResult = Apollo.QueryResult<GetBillingOverviewDetailsQuery, GetBillingOverviewDetailsQueryVariables>;