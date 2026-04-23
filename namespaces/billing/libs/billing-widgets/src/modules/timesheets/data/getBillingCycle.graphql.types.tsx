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
export type GetBillingCycleQueryVariables = Types.Exact<{
  billingCycleId: Types.Scalars['ID'];
}>;


export type GetBillingCycleQuery = { billingCycle: BillingCycleItemFragment };


export const GetBillingCycleDocument = gql`
    query GetBillingCycle($billingCycleId: ID!) {
  billingCycle(billingCycleId: $billingCycleId) {
    ...BillingCycleItemFragment
  }
}
    ${BillingCycleItemFragmentDoc}`;

/**
 * __useGetBillingCycleQuery__
 *
 * To run a query within a React component, call `useGetBillingCycleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBillingCycleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBillingCycleQuery({
 *   variables: {
 *      billingCycleId: // value for 'billingCycleId'
 *   },
 * });
 */
export function useGetBillingCycleQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetBillingCycleQuery, GetBillingCycleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBillingCycleQuery, GetBillingCycleQueryVariables>(GetBillingCycleDocument, options);
      }
export function useGetBillingCycleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBillingCycleQuery, GetBillingCycleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBillingCycleQuery, GetBillingCycleQueryVariables>(GetBillingCycleDocument, options);
        }
export type GetBillingCycleQueryHookResult = ReturnType<typeof useGetBillingCycleQuery>;
export type GetBillingCycleLazyQueryHookResult = ReturnType<typeof useGetBillingCycleLazyQuery>;
export type GetBillingCycleQueryResult = Apollo.QueryResult<GetBillingCycleQuery, GetBillingCycleQueryVariables>;