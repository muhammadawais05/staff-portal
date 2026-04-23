/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { BillingCycleItemFragment } from '../../__fragments__/billingCycleItemFragment.graphql.types';
import { gql } from '@apollo/client';
import { BillingCycleItemFragmentDoc } from '../../__fragments__/billingCycleItemFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetBillingCyclesWithTimesheetsQueryVariables = Types.Exact<{
  engagementId: Types.Scalars['ID'];
}>;


export type GetBillingCyclesWithTimesheetsQuery = { billingCyclesWithTimesheets: Array<BillingCycleItemFragment> };


export const GetBillingCyclesWithTimesheetsDocument = gql`
    query GetBillingCyclesWithTimesheets($engagementId: ID!) {
  billingCyclesWithTimesheets(engagementId: $engagementId) {
    ...BillingCycleItemFragment
  }
}
    ${BillingCycleItemFragmentDoc}`;

/**
 * __useGetBillingCyclesWithTimesheetsQuery__
 *
 * To run a query within a React component, call `useGetBillingCyclesWithTimesheetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBillingCyclesWithTimesheetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBillingCyclesWithTimesheetsQuery({
 *   variables: {
 *      engagementId: // value for 'engagementId'
 *   },
 * });
 */
export function useGetBillingCyclesWithTimesheetsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetBillingCyclesWithTimesheetsQuery, GetBillingCyclesWithTimesheetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBillingCyclesWithTimesheetsQuery, GetBillingCyclesWithTimesheetsQueryVariables>(GetBillingCyclesWithTimesheetsDocument, options);
      }
export function useGetBillingCyclesWithTimesheetsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBillingCyclesWithTimesheetsQuery, GetBillingCyclesWithTimesheetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBillingCyclesWithTimesheetsQuery, GetBillingCyclesWithTimesheetsQueryVariables>(GetBillingCyclesWithTimesheetsDocument, options);
        }
export type GetBillingCyclesWithTimesheetsQueryHookResult = ReturnType<typeof useGetBillingCyclesWithTimesheetsQuery>;
export type GetBillingCyclesWithTimesheetsLazyQueryHookResult = ReturnType<typeof useGetBillingCyclesWithTimesheetsLazyQuery>;
export type GetBillingCyclesWithTimesheetsQueryResult = Apollo.QueryResult<GetBillingCyclesWithTimesheetsQuery, GetBillingCyclesWithTimesheetsQueryVariables>;