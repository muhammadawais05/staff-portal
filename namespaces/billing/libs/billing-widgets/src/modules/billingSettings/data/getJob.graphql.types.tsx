/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { BillingSettingsJobFragment } from '../../__fragments__/billingSettingsJobFragment.graphql.types';
import { gql } from '@apollo/client';
import { BillingSettingsJobFragmentDoc } from '../../__fragments__/billingSettingsJobFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetJobQueryVariables = Types.Exact<{
  jobId: Types.Scalars['ID'];
}>;


export type GetJobQuery = { node?: Types.Maybe<BillingSettingsJobFragment> };


export const GetJobDocument = gql`
    query GetJob($jobId: ID!) {
  node(id: $jobId) {
    ... on Job {
      ...BillingSettingsJobFragment
    }
  }
}
    ${BillingSettingsJobFragmentDoc}`;

/**
 * __useGetJobQuery__
 *
 * To run a query within a React component, call `useGetJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobQuery({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useGetJobQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetJobQuery, GetJobQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetJobQuery, GetJobQueryVariables>(GetJobDocument, options);
      }
export function useGetJobLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetJobQuery, GetJobQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetJobQuery, GetJobQueryVariables>(GetJobDocument, options);
        }
export type GetJobQueryHookResult = ReturnType<typeof useGetJobQuery>;
export type GetJobLazyQueryHookResult = ReturnType<typeof useGetJobLazyQuery>;
export type GetJobQueryResult = Apollo.QueryResult<GetJobQuery, GetJobQueryVariables>;